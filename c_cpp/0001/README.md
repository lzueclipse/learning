##由STL map调用clear()后，内存不返还给操作系统的问题出发，探讨ptmalloc2(glibc malloc) malloc/free行为

###1. 问题
我们的程序要向std::map中插入大量的数据，但每个数据只有几十字节；当使用完该std::map，调用map.clear()，删除map里的所有元素，sleep 15秒后，发现std::map所占内存没有返还给操作系统。

####1.1 实验--1

本文所有实验基于**Red Hat Enterprise 7.0，glibc版本2.17**

编译:
```
[root@node1 0001]# sh build.sh
Complile mytest success
```

运行:
```

[root@node1 0001]# ./mytest map-none-opt
----------------------------------------------------------------------------------------------
At the beginning, map.size=0
Output of 'top':
7399 root      20   0   22900   1532   1172 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
Insert all FPs into std::map, map.size=5000000, cost time = 11 seconds
Output of 'top':
7399 root      20   0  335344 314140   1280 S   0.0  3.9   0:10.20 mytest
-------------------------------------------------------------------------------------------------
Lookup all FPs from std::map, map.size=5000000, cost time = 9 seconds
-----------------------------------------------------------------------------------------------
Delete all FPs from std::map, map.size=0, cost time = 1 seconds
Sleep 15 seconds, Output of 'top':
7399 root      20   0  335344 314188   1324 S   0.0  3.9   0:20.91 mytest
-----------------------------------------------------------------------------------------------
```

小提示：'top'输出的**第6列表示某程序使用的物理内存大小。**

在实验--1里，我们向std::map插入5,000,000个数据
[(插入数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L99)
来模拟我们的业务场景(一个md5值作为key，对应一个uint64_t值作为value)。
可以发现map.clear()删除数据后
[(删除数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L127)，
**没有返还内存给操作系统(仍然占用314188 KB)。**

是std::map自身造成的？还是new/delete造成的？或者是malloc/free造成的？实验--2将为我们揭晓答案。

####1.2 实验--2

运行：
```

[root@node1 0001]# ./mytest malloc-free
----------------------------------------------------------------------------------------------
At the beginning:
Output of 'top':
7461 root      20   0   22900   1532   1172 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
Malloc:
Output of 'top':
7461 root      20   0  374408 353048   1220 S   0.0  4.4   0:00.27 mytest
----------------------------------------------------------------------------------------------
Free:
Sleep 15 seconds, Output of 'top':
7461 root      20   0  335344 314084   1220 S   0.0  3.9   0:00.44 mytest
----------------------------------------------------------------------------------------------

```
在实验--2里，我们用malloc分配一些内存空间，存入数据后(全0)，用free释放空间
[(对应的代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L5)
。
可以发现free后，**没有返还内存给操作系统(仍然占用314084 KB)。看来一切的根源在glibc malloc/free上。**

**在第2节和第3节，我们将讲述内存分配基础和glibc malloc/free(ptmalloc2)。**




###2. 内存分配基础知识

本章节大部分节选自[参考文献 1，淘宝工程师力作](http://pan.baidu.com/s/1G1pIe)

####2.1 x86_64位下内存布局

![图1](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0001/1.png "图1")
上图是 X86_64 下 Linux 进程的默认内存布局形式，这只是一个示意图， 当前内核默认 配置下，进程的stack和 mmap映射区域并不是从一个固定地址开始，并且每次启动时的值都 不一样，
这是程序在启动时随机改变这些值的设置，使得使用缓冲区溢出进行攻击更加困难。可以用如下命令禁止该特性：sudo sysctl -w kernel.randomize_va_space=0

####2.2 内存分配/释放的相关系统调用和函数

从2.1中我们知道，heap和mmap region都是提供给用户程序的虚拟内存空间，那么如何获得该区域的内存呢？

对heap的操作，Linux提供了brk()系统调用，另外glibc对brk()进行了封装，提供了sbrk()函数； 对mmap region，Linux提供了mmap()和munmap()系统调用。


####2.3 内存的延迟分配
只有在真正访问一个地址的时候才建立这个地址的物理映射，这是 Linux 内存管理的基本思想之一。 

Linux 内核在用户申请内存的时候，只是给它分配了一个线性区（也就是虚拟内存），并没有分配实际物理内存；
只有当用户使用这块内存的时候，内核才会分配具体的物理页面给用户，这时候才占用宝贵的物理内存。

内核释放物理页面是通过释放线性区，找到其所对应的物理页面，将其全部释放的过程。

**这也是我们为什么仅仅关注'top’命令输出的第6列的原因**

#####2.3.1 实验--3
```
[root@node1 0001]# ./mytest lazy-allocation
----------------------------------------------------------------------------------------------
At the beginning:
Output of 'top':
8247 root      20   0   22900   1532   1172 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
Malloc:
8247 root      20   0  285048   1580   1216 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
Free:
8247 root      20   0   22900   1584   1220 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
```
在实验--3里，我们仅仅malloc()一块内存，却没有向这块内存区间写入任何数据，观察'top'输出的第5列和第6列，能发现仅仅分配了**虚拟内存(285048 KB)**，没有分配物理内存(**1580 KB**)。

###3. ptmalloc2
Linux 中 malloc 的早期版本是由 Doug Lea 实现的，它有一个重要问题就是在并行处理时 多个线程共享进程的内存空间，各线程可能并发请求内存，
在这种情况下应该如何保证分配和回收的正确和高效。

Wolfram Gloger 在 Doug Lea 的基础上改进使得 Glibc 的 malloc 可以支持多线程——ptmalloc2，在glibc-2.3.x.中已经集成了 ptmalloc2，这就是我们平时使用的 malloc/free。

我们仅仅针对ptmalloc2展开讨论，不涉及业界流行的**jemalloc，tcmalloc**等其他内存分配器。

本章节大部分节选自[参考文献 1，淘宝工程师力作](http://pan.baidu.com/s/1G1pIe)

我**仅仅列出我所关注的部分，比较粗浅**，详细请阅读参考文献 1。

####3.1 main_arena 与 non_main_arena
在 Doug Lea 实现的内存分配器中只有一个主分配区（ main arena），每次分配内存都必 须对主分配区加锁，分配完成后释放锁，在 SMP 多线程环境下，对主分配区的锁的争用很激烈，
严重影响了 malloc 的分配效率。

于是 Wolfram Gloger 在 Doug Lea 的基础上改进使得Glibc 的 malloc 可以支持多线程，增加了非主分配区（ non main arena）支持， 主分配区与非主分配区用环形链表进行管理。 
每一个分配区利用互斥锁（ mutex）使线程对于该分配区的访问互斥。

每个进程只有一个主分配区，但可能存在多个非主分配区， ptmalloc2 根据系统对分配区的争用情况动态增加非主分配区的数量，分配区的数量一旦增加，就不会再减少了。 主分配
区可以访问进程的 heap 区域和 mmap 映射区域，也就是说主分配区可以使用 brk/sbrk 和 mmap向操作系统申请虚拟内存。而非主分配区只能访问进程的 mmap 映射区域， 非主分配区每
次使用 mmap()向操作系统"批发" HEAP_MAX_SIZE（ 64 位系统默认为 64MB） 大小的虚拟内存，当用户向非主分配区请求分配内存时再切割成小块“零售”出去。

当某一线程需要调用 malloc()分配内存空间时， 该线程先查看线程私有变量中是否已经存在一个分配区，如果存在， 尝试对该分配区加锁，如果加锁成功，使用该分配区分配内存，
如果失败， 该线程搜索循环链表试图获得一个没有加锁的分配区。如果所有的分配区都已经加锁，那么 malloc()会开辟一个新的分配区，把该分配区加入到全局分配区循环链表并加锁，
然后使用该分配区进行分配内存操作。在释放操作中，线程同样试图获得待释放内存块所在分配区的锁，如果该分配区正在被别的线程使用，则需要等待直到其他线程释放该分配区的
互斥锁之后才可以进行释放操作。

** Max Number of arena = 8 * number of cores ** [(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/arena.c#L848)

####3.2 chunk 的组织
用户请求分配的空间在 ptmalloc2 中都使用一个 chunk 来表示。

用户调用 free()函数释放掉的内存也并不是立即就归还给操作系统，ptmalloc2 使用特定的数据结构来管理这些空闲的 chunk。

chunk的定义如下[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1125)：

```
struct malloc_chunk {

  INTERNAL_SIZE_T      prev_size;  /* Size of previous chunk (if free).  */

  INTERNAL_SIZE_T      size;       /* Size in bytes, including overhead. */

  struct malloc_chunk* fd;         /* double links -- used only if free. */

  struct malloc_chunk* bk;

  /* Only used for large blocks: pointer to next larger size.  */
  
  struct malloc_chunk* fd_nextsize; /* double links -- used only if free. */
  
  struct malloc_chunk* bk_nextsize;

};
```


####3.3
####3.4
####3.5


###4. 重现STL map不返还内存问题，并根据malloc debug信息分析


###5. 自己实现的内存管理来解决问题


###6. 参考文献:

>\[1] glibc内存管理ptmalloc源代码分析4--淘宝工程师力作, <http://pan.baidu.com/s/1G1pIe>

>\[2] glibc下的内存管理, <http://www.cnblogs.com/lookof/archive/2013/03/26/2981768.html>

>\[3] ptmalloc, <http://blog.csdn.net/phenics/article/details/777053#node_sec_1>

>\[4] glibc（ptmalloc）内存暴增问题解决 <http://www.blog.chinaunix.net/uid-18770639-id-3385860.html>

>\[5] Linux Allocator Does Not Release Small Chunks of Memory, <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[6] Malloc parameters, <http://www.gnu.org/software/libc/manual/html_node/Malloc-Tunable-Parameters.html>

>\[7] malloc_text.c <https://github.com/metroxinjing/side_projects/blob/master/memory_management/malloc_test.c>

>\[8] mallinfo, <http://sdutlinux.org/t/1295> 

>\[9]man mallinfo

>\[10]malloc.c, <http://osxr.org/glibc/source/malloc/malloc.c?v=glibc-2.17>

>\[11]malloc.c, <http://code.metager.de/source/xref/gnu/glibc/malloc/malloc.c>

>\[12] 频繁分配释放内存导致的性能问题的分析(关于edata的描述，不正确), <http://bbs.csdn.net/topics/330179712>

>\[13] GLIBC内存分配机制引发的“内存泄露”(关于edata的描述，不正确), <http://www.nosqlnotes.net/archives/105>

>\[14] Understanding glibc malloc (自备梯子） <https://sploitfun.wordpress.com/2015/02/10/understanding-glibc-malloc/>

>\[15] ptmalloc2 source code <http://www.malloc.de/en/>
