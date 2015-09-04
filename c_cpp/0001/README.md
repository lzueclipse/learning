##由STL map调用clear后，内存不返还给操作系统的问题出发(甚至map析构了也不返还)，探讨ptmalloc2(glibc malloc) malloc/free行为

###1. 问题
我们的程序有几十个线程，每个线程拥有一个std::map，每个线程都要向自己的std::map中插入大量的数据，但每个数据只有几十字节；当使用完std::map，调用map.clear()，删除map里的所有元素，发现std::map所占内存没有返还给操作系统；甚至std::map析构后，
内存仍然没有返还给操作系统。

本文所有实验基于**Red Hat Enterprise 7.0，glibc版本2.17。**

####1.1 实验--1


编译:
```
[root@mydev-rosvile-redhat 0001]# ./mytest map
Complile mytest success
```

运行:
```
[root@mydev-rosvile-redhat 0001]# ./mytest map
----------------------------------------------------------------------------------------------
test_map() 1

At the beginning, map.size=0
Output of 'top':
 2919 root      20   0   22900   1532   1172 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
test_map() 2

Insert all FPs into std::map, map.size=500000, cost time = 0 seconds
Output of 'top':
  2919 root      20   0   54052  32720   1272 S   0.0  0.4   0:00.72 mytest
-------------------------------------------------------------------------------------------------
test_map() 3

Lookup all FPs from std::map, map.size=500000, cost time = 0 seconds
-----------------------------------------------------------------------------------------------
test_map() 4

Delete all FPs from std::map, map.size=0, cost time = 0 seconds
Sleep 15 seconds, Output of 'top':
  2919 root      20   0   54052  32924   1312 S   0.0  0.4   0:01.54 mytest
----------------------------------------------------------------------------------------------
test_map() 5

Now the process wil exit and die:
Output of 'top':
  2919 root      20   0   54052  32924   1312 S   0.0  0.4   0:01.54 mytest
-----------------------------------------------------------------------------------------------

```

小提示：'top'输出的**第6列表示某程序使用的物理内存大小。**

在实验--1里:

1)我们向std::map插入500,000个数据
[(插入数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L107)
来模拟我们的业务场景(一个md5值作为key，对应一个uint64_t值作为value)。

2)可以发现map.clear()删除数据后
[(删除数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L135)，
**没有返还内存给操作系统(占用32924 KB)。**

3)甚至map析构后
[(map析构后)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L275)，
**仍然没有返还内存给操作系统(占用32924 KB)。**


思考：

是std::map自身造成的？还是new/delete造成的？或者是malloc/free造成的？实验--2将为我们揭晓答案。

####1.2 实验--2

运行：
```
root@mydev-rosvile-redhat 0001]# ./mytest malloc-free
----------------------------------------------------------------------------------------------
test_malloc_free 1

At the beginning:
Output of 'top':
 3417 root      20   0   26692   1532   1168 S   0.0  0.0   0:00.00 mytest
----------------------------------------------------------------------------------------------
test_malloc_free 2

Malloc: number = 500000
Output of 'top':
  3417 root      20   0  534496 513128   1220 S   0.0  6.4   0:00.43 mytest
----------------------------------------------------------------------------------------------
test_malloc_free 3

Free: number = 500000
Sleep 15 seconds, Output of 'top':
  3417 root      20   0   26692   5620   1224 S   0.0  0.1   0:00.55 mytest
----------------------------------------------------------------------------------------------
Now the process wil exit and die:
Output of 'top':
  3417 root      20   0   26692   5620   1224 S   0.0  0.1   0:00.55 mytest
-----------------------------------------------------------------------------------------------
```

在实验--2里，我们用malloc分配一些内存空间，存入数据(全0)；用free释放空间
[(对应的代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L5)
。
可以发现free后，**没有返还内存给操作系统(仍然占用314084 KB)。看来一切的根源在glibc malloc/free上。**

在第2节和第3节，我们将讲述内存分配基础和glibc malloc/free(ptmalloc2)。

####1.3 约定
因为用std::map做实验不够直观，所以后续实现都直接基于malloc/free。

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
在实验--3里，我们仅仅malloc()一块内存，却没有向这块内存区间写入任何数据[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L56)，观察'top'输出的第5列和第6列，能发现仅仅分配了**虚拟内存(285048 KB)**，没有分配物理内存(**仅仅1580 KB**)。


###3. ptmalloc2
Linux 中 malloc 的早期版本是由 Doug Lea 实现的，它有一个重要问题就是在并行处理时 多个线程共享进程的内存空间，各线程可能并发请求内存，
在这种情况下应该如何保证分配和回收的正确和高效。

Wolfram Gloger 在 Doug Lea 的基础上改进使得 Glibc 的 malloc 可以支持多线程——ptmalloc2，在glibc-2.3.x.中已经集成了 ptmalloc2，这就是我们平时使用的 malloc/free。

我们仅仅针对ptmalloc2展开讨论，不涉及业界流行的**jemalloc，tcmalloc**等其他内存分配器。

本章节大部分节选自[参考文献 1，淘宝工程师力作](http://pan.baidu.com/s/1G1pIe)

我**仅仅列出我所关注的部分，比较粗浅**，详细请阅读参考文献 1。

####3.1 main_arena 与 non_main_arena
在 Doug Lea 实现的内存分配器中只有一个主分配区（ main arena），每次分配内存都必须对主分配区加锁，分配完成后释放锁，在 SMP 多线程环境下，对主分配区的锁的争用很激烈，
严重影响了 malloc 的分配效率。

于是 Wolfram Gloger 在 Doug Lea 的基础上改进使得Glibc 的 malloc 可以支持多线程，增加了非主分配区（ non main arena）支持， 主分配区与非主分配区用环形链表进行管理。 
每一个分配区利用互斥锁（ mutex）使线程对于该分配区的访问互斥。

每个进程只有一个主分配区，但可能存在多个非主分配区， ptmalloc2 根据系统对分配区的争用情况动态增加非主分配区的数量，分配区的数量一旦增加，就不会再减少了。

主分配区可以访问进程的 heap 区域和 mmap 映射区域，也就是说主分配区可以使用 brk/sbrk 和 mmap向操作系统申请虚拟内存。

而非主分配区只能访问进程的 mmap 映射区域， 非主分配区每次使用 mmap()向操作系统"批发" HEAP_MAX_SIZE（ 64 位系统默认为 64MB, 
[相关代码](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/arena.c#L30)）大小的虚拟内存，当用户向非主分配区请求分配内存时再切割成小块“零售”出去。

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

**在x86_64位机器上，chunk是16B对齐**。[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L354)

一个使用中（没有被free）的chunk，在内存中是这个样子：

![图2](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0001/2.png "图2")

图中"chunk"指针指向一个chunk的开始，"mem"指针是真正返回给用户的内存指针，这两个指针在64位机器上相差16 Bytes。

chunk的第一个域表示相邻的前一个chunk的size(prev_size)，程序可以使用这个值来找到前一个 chunk 的开始地址[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1327)。

第二个域表示本chunk的"size"，其最低3位被借用来表示特殊含义:

"P"--P为0，表示相邻前一个chunk是free的，**此时prev_size才有效**；P为1，表示相邻前一个chunk正被使用，此时**prev_size无效**

"M"--M为0，表示该chunk从heap(brk/sbrk)分配；M为1，表示该chunk从mmap映射区分配

"A"--A为0，表示该chunk属于none main arena；A为1，表示该chunk属于main arena


一个被free后的chunk，在内存中是这个样子:

![图3](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0001/3.png "图3")

当chunk空闲时, M状态不存在，只有A和P(P为1)状态。

原本是用户数据的地方存储了4个指针，指针 fd 指向后一个空闲的 chunk，而 bk 指向前一个空闲的 chunk， ptmalloc2通过这两个指针将大小相近的 chunk 连成一个双向链表（就是3.3节讲的各种bins，用来缓存已经被free的chunk）。

对于 large bin 中的空闲 chunk，还有两个指针，fd_nextsize 和 bk_nextsize，这两个指针用于加快在large bin 中查找最匹配的空闲chunk（smallest first, best fit)。 

####3.3 空闲chunk容器

#####3.3.1 bins
用户 free 掉的内存并不是都会马上归还给系统， ptmalloc 会统一管理 heap 和 mmap 映 射区域中的空闲的 chunk，当用户进行下一次分配请求时， ptmalloc 会首先试图在空闲的chunk 中挑选一块给用户，这样就避免了频繁的系统调用，降低了内存分配的开销。 

ptmalloc将相似大小的 chunk 用双向链表链接起来，这样的一个链表被称为一个 bin。 

Ptmalloc 一共维护了 128 个 bins[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1481)，并使用一个数组来存储这些 bins。

![图4](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0001/4.png "图4")

1) 数组中的第1个为unsorted bin。

2) 数组中的第2--第63为small bins，同一个 small bin中的 chunk具有相同的大小。

两个相邻的small bin中的chunk大小相差16 Byte [(相关代码)] (https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1490)。

**可以用Excel计算出，每一个small bin的大小, 请查看 [malloc_bins.xlsx](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/malloc_bins.xlsx?raw=true)**

**每一个small bin是一个FIFO队列。**

3)数组中第64--第126个为large bins， large bins 一共包括 63 个 bin，每个 bin 中的 chunk 大小不是一个固定公差的等差数列， 而是分成 6 组 bin，每组 bin 是一个固定公差的等差数列
[(相关代码)] (https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1513)。

第64--第95(32个)，公差为64B:

第96--第111(16个)，公差为512B；

第112--第119(8个)，公差为4096B；

第120--第123(4个)，公差为32768B；

第124--第125(2个)，公差为262144B；

第126(1个)， 其他

**根据large bins的公式，可以用Excel计算出，每一个large bin包含的字节范围, 请查看 [malloc_bins.xlsx](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/malloc_bins.xlsx?raw=true)**

**注意：此Excel给出的large bins数据中，"结束(字节)没有考虑16字节对齐，仅供理解原理用**

large bins 中的每一个 bin 分别包含了一个给定范围内的 chunk，**其中的 chunk 按大小序排列。相同大小的 chunk 同样按照最近使用顺序排列**。

ptmalloc2 使用**"smallest-first， best-fit"原则**在空闲 large bin 中查找合适的 chunk。

4)当空闲的 chunk 被链接到 bin 中的时候， ptmalloc2 会把表示该 chunk 是否处于使用中的标志 P 设为 0（注意，这个标志实际上处在下一个chunk中）， 同时 ptmalloc2 还会检查它前后的 chunk 是否也是空闲的，如果是的话，ptmalloc2 会首先把它们合并为一个大的 chunk，然后将合并后的 chunk 放到 unstored bin 中。 

要注意的是， 并不是所有的 chunk 被释放后就立即被放到 bin 中。 ptmalloc 为了提高分配的速度， 会把一些小的的 chunk 先放到一个叫做fast bins的容器内。

#####3.3.2 Fast Bins
一般的情况是， 程序在运行时会经常需要申请和释放一些较小的内存空间。

当合并了相邻的几个小的 chunk 之后， 也许马上就会有另一个小块内存的请求， 这样分配器又需要从大的空闲内存中切分出一块，这样无疑是比较低效的。

故而，ptmalloc2 中在分配过程中引入了 fast bins，不大于max_fast(默认128 Bytes)[(相关代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L798)）的 chunk 被释放后，首先会被放到 fast bins中， fast bins 中的 chunk 并不改变它的使用标志 P。 这样也就无法将它们合并。

当需要给用户分配的 chunk 小于或等于max_fast(默认128 Bytes) 时， ptmalloc2 首先会在 fast bins 中查找相应的空闲块，然后才会去查找 bins中的空闲 chunk。

在某个特定的时候，ptmalloc2会遍历 fast bins中的 chunk，将相邻的空闲 chunk 进行合并，并将合并后的 chunk 加入 unsorted bin 中，然后再将 usorted bin 里的 chunk 加入 bins 中。

**Fast bins 可以看做是一部分Small bins(大小小于或等于max_fast)的cache**

#####3.3.3 Unsorted Bin
unsorted bin 的队列使用 bins 数组的第一个， 如果被用户释放的 chunk 大于 max_fast(默认128 Bytes)，或者 fast bins 中的空闲 chunk 合并后，这些 chunk 首先会被放到 unsorted bin 队列中，
在进行 malloc 操作的时候，如果在 fast bins 中没有找到合适的 chunk，则 ptmalloc2 会先在 unsorted bin 中查找合适的空闲 chunk， 然后才查找 bins。

如果 unsorted bin 不能满足分配要求。 malloc便会将 unsorted bin 中的 chunk 加入 bins 中。 然后再从 bins 中继续进行查找和分配过程。

**Unsorted Bins可以看做是一部分Small bins(大于max_fast的chunk）和Large bins的cache**

#####3.3.4 Top chunk

当 fast bins 和 bins 都不能满足分配需要的时候，ptmalloc2 会设法在 top chunk 中分出一块内存给用户。

Top chunk 对于主分配区和非主分配区是不一样的。

1)对于非主分配区:

会预先从 mmap 区域分配一块较大的(HEAP_MAX_SIZE，64 位系统默认为 64MB, [相关代码](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/arena.c#L30) )
空闲内存模拟 sub-heap， 通过管理sub-heap 来响应用户的需求，这就是非主分配区的top chunk。 

如果 top chunk 本身不够大，分配程序会重新分配一个 sub-heap，并将 top chunk 迁移到新的 sub-heap 上，新的 sub-heap
与已有的 sub-heap 用单向链表连接起来，然后在新的 top chunk 上分配所需的内存以满足分配的需要 。

如果回收的 chunk 恰好与 top chunk 相邻，那么这两个 chunk 就会合并成新的 top chunk，从而使 top chunk 变大。

如果在 free 时回收的内存大于某个阈值， 并且 top chunk 的大小也超过了收缩阈值， ptmalloc2
会收缩 sub-heap，如果 top-chunk 包含了整个 sub-heap， ptmalloc2会调用 munmap 把整个sub-heap 的内存返回给操作系统。

2)主分配区:

它可以通过 sbrk()来增大或是收缩进程 heap 的大小， 主分配区的 top chunk 在第一次调用 malloc 时会分配一块空间作为初始的 heap，
用户从 top chunk 分配内存时，可以直接取出一块内存给用户。

在回收内存时， 回收的内存恰好与 top chunk 相邻则合并成新的 top chunk，当该次回收的空闲内存大小达到某个阈值， 并且 top chunk 的大小也超过了收缩阈值， 
会执行内存收缩，减小 top chunk 的大小， 但至少要保留一个页大小的空闲内存， 从而把内存归还给操作系统。 

如果向主分配区的 top chunk 申请内存， 而 top chunk 中没有空闲内存， ptmalloc2会调用 sbrk()将的进程 heap 的边界 brk 上移，然后修改 top chunk 的大小。


#####3.3.5 mmaped chunk
当需要分配的 chunk 足够大(mmap threshold，x86_64上，是大于128 KB, 小于32 MB的一个动态值, [相关代码，DEFAULT_MMAP_THRESHOLD_MIN，DEFAULT_MMAP_THRESHOLD_MAX](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L907))， fast bins 和 bins 都不能满足要求，甚至 top chunk 本身也不能满足分配需求时， ptmalloc2 会使用 mmap 来直接使用内存映射来将页映射到进程空间。

这样分配的 chunk 在被 free 时将直接解除映射，于是就将内存归还给了操作系统；同时会把 mmap 分配阈值调整为当前回收的 chunk 的大小，并将收缩阈值（ trim threshold）设置为 mmap 分配阈值的 2 倍。这就是 ptmalloc 的对 mmap分配阈值的动态调整机制，该机制是默认开启的，当然也可以用 mallopt()关闭该机制（3.6节会介绍)


#####3.3.6 Last remainder
Last remainder 是另外一种特殊的 chunk，就像 top chunk 和 mmaped chunk 一样，不会在任何 bins 中找到这种 chunk。

当需要分配一个 small chunk，但在 small bins 中找不到合适的 chunk，如果 last remainder chunk 的大小大于所需的 small chunk 大小，last remainder chunk被分裂成两个 chunk，其中一个 chunk 返回给用户，另一个 chunk 变成新的 last remainder chuk。

####3.4 malloc
ptmalloc 的响应用户内存分配要求的具体步骤为:

1) 找到合适的分配区(3.1节)

2) 将用户的请求大小转换为实际需要分配的 chunk 空间大小。

3) 判断所需分配 chunk的大小是否满足 chunk_size <= max_fast (max_fast 默认为 128 Bytes)，如果是的话， 则转下一步，否则跳到第 5 步。

4) 首先尝试在 fast bins 中取一个所需大小的 chunk 分配给用户。 如果可以找到，则分配结束。否则转到下一步。

5) 判断所需大小是否处在 small bins 中， 即判断 chunk_size < 1024 Byte 是否成立。 如果chunk 大小处在 small bins 中， 则转下一步， 否则转到第 6 步。

6) 根据所需分配的 chunk 的大小， 找到具体所在的某个 small bin， 从该 bin 的尾部摘取一个恰好满足大小的 chunk。 若成功， 则分配结束， 否则， 转到下一步。

7) 到了这一步， 说明需要分配的是一块大的内存， 或者 small bins 中找不到合适的chunk。于是，ptmalloc2 首先会遍历 fast bins 中的 chunk， 将相邻的 chunk 进行合并，并链接到 unsorted bin 中， 
然后遍历 unsorted bin 中的 chunk，如果 unsorted bin 只有一个 chunk，并且这个 chunk 在上次分配时被使用过，并且所需分配的 chunk 大小属于 small bins，并且 chunk 的大小大于等于需要分配的大小，
这种情况下就直接将该 chunk 进行切割，分配结束，否则将根据 chunk 的空间大小将其放入 small bins 或是 large bins 中，遍历完成后，转入下一步。

8) 到了这一步，说明需要分配的是一块大的内存，或者 small bins 和 unsorted bin 中都找不到合适的 chunk，并且 fast bins 和 unsorted bin 中所有的 chunk 都清除干净
了。 从 large bins 中按照"smallest-first， best-fit"原则， 找一个合适的 chunk， 从中划分一块所需大小的 chunk， 并将剩下的部分链接回到 bins 中。 若操作成功， 则
分配结束， 否则转到下一步。

9) 如果搜索 fast bins 和 bins 都没有找到合适的 chunk， 那么就需要操作 top chunk 来进行分配了。 判断 top chunk 大小是否满足所需 chunk 的大小， 如果是， 则从 top
chunk 中分出一块来。 否则转到下一步。

10) 到了这一步， 说明 top chunk 也不能满足分配要求， 所以， 于是就有了3个选择: 如果是主分配区， 调用 sbrk()， 增加 top chunk 大小； 如果是非主分配区，调用 mmap
来分配一个新的 sub-heap，增加 top chunk 大小； 或者使用 mmap()来直接分配。 在这里， 需要依靠 chunk 的大小来决定到底使用哪种方法。 判断所需分配的 chunk大小是否大于等于 mmap 分配阈值， 
如果是的话， 则转下一步， 调用 mmap 分配，否则跳到第 12 步， 增加 top chunk 的大小。

11) 使用 mmap 系统调用为程序的内存空间映射一块 chunk_size align 4kB 大小的空间(**mmap系统调用以4KB对齐**)。然后将内存指针返回给用户。

12)简言之，就是从top chunk 中找到一个一块合适大小的内存块，如果top chunk不够用，就需要增加top chunk，对此主分配区和非主分配区处理是不同的(3.3.4节)。

####3.5 free
free() 函数接受一个指向分配区域的指针作为参数，释放该指针所指向的 chunk。

而具体的释放方法则看该 chunk 所处的位置和该 chunk 的大小。 free()函数的工作步骤如下：

1) 判断传入的指针是否为 0，如果为 0，则什么都不做，直接 return。否则转下一步。

2) 判断所需释放的 chunk 是否为 mmaped chunk，如果是，则调用 munmap()释放mmaped chunk，解除内存空间映射，该该空间不再有效。如果开启了 mmap 分配
阈值的动态调整机制，并且当前回收的 chunk 大小大于 mmap 分配阈值，将 mmap分配阈值设置为该 chunk 的大小，将收缩阈值设定为 mmap 分配阈值的 2倍，释放完成，否则跳到下一步。

3) 找到释放的chunk所在的分配区。

4) 判断 chunk 的大小和所处的位置，若 chunk_size <= max_fast， 并且 chunk不与 top chunk 相邻，则转到下一步，否则跳到第 6 步。
（ 因为与 top chunk 相邻的小 chunk 也和 top chunk 进行合并，所以这里不仅需要判断大小，还需要判断相邻情况）

5) 将 chunk 放到 fast bins 中， chunk 放入到 fast bins 中时， 并不修改该 chunk 使用状态位 P。也不与相邻的 chunk 进行合并。只是放进去， 如此而已。 这一步做完之后
释放便结束了， 程序从 free()函数中返回。

6) 判断前一个 chunk 是否处在使用中， 如果前一个块也是空闲块， 则合并。 并转下一步。

7) 判断当前释放 chunk 的下一个块是否为 top chunk， 如果是， 则转第 9 步， 否则转下一步。

8) 判断下一个 chunk 是否处在使用中， 如果下一个 chunk 也是空闲的， 则合并， 并将合并后的 chunk 放到 unsorted bin 中。 注意， 这里在合并的过程中， 要更新 chunk
的大小， 以反映合并后的 chunk 的大小。 并转到第 10 步。

9) 如果执行到这一步， 说明释放了一个与 top chunk 相邻的 chunk。则无论它有多大，都将它与 top chunk 合并， 并更新 top chunk 的大小等信息。 转下一步。

10) 判断合并后的 chunk 的大小是否大于 FASTBIN_CONSOLIDATION_THRESHOLD（默认64KB,[相关代码](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1632)）， 如果是的话， 则会触发进行 fast bins 的合并操作， fast bins 中的 chunk 将被遍历，并与相邻的空闲 chunk 进行合并，合并后的 chunk 会被放到 unsorted bin 中。
fast bins 将变为空， 操作完成之后转下一步。

11) 判断 top chunk 的大小是否大于收缩阈值， 如果是的话， 对于主分配区， 则会通过sbrk()试图归还 top chunk 中的一部分给操作系统。 
如果为非主分配区，会进行 sub-heap 收缩，将 top chunk 的一部分返回给操作系统，如果 top chunk 为整个 sub-heap，会把整个 sub-heap 还回给操作系统。

####3.6 配置选项
Ptmalloc 主要提供以下几个配置选项用于调优，这些选项可以通过 mallopt()进行设置：

1) M_MXFAST

M_MXFAST 用于设置 fast bins 中保存的 chunk 的最大大小，默认值为 128 Byte。

Fast bins 中保存的 chunk 在一段时间内不会被合并， 分配小对象时可以首先查找 fast bins，大大提高小对象的分配速度，但这个值设
置得过大，会导致 ptmalloc 缓存了大量空闲内存，去不能归还给操作系统，导致内存暴增。

M_MXFAST 的最大值为 160 Bytes([相关代码](https://github.com/lzueclipse/learning/blob/master/c_cpp/glibc-2.17/malloc/malloc.c#L1617))。

如果设置该选项为 0，就会不使用 fast bins。

2) M_TRIM_THRESHOLD
M_TRIM_THRESHOLD 用于设置收缩阈值。

自动收缩只会在 free时才发生，如果当前 free 的 chunk 大小加上前后能合并 chunk 的大小大于 FASTBIN_CONSOLIDATION_THRESHOLD(默认64KB)，并且 top
chunk 的大小达到收缩阈值， 对于主分配区，最终会调用 sbrk()返回一部分内存给操作系统，对于非主分配区，最终munmap返回一部分内存给操作系统。

这个选项一般与 M_MMAP_THRESHOLD 选项一起使用， M_MMAP_THRESHOLD 用于设置mmap 分配阈值，对于长时间运行的程序，需要对这两个选项进行调优。

M_TRIM_THRESHOLD 的值设置为4KB对齐，设置为-1会关闭内存收缩设置。

3) M_MMAP_THRESHOLD

M_MMAP_THRESHOLD 用于设置 mmap 分配阈值，是大于128KB小于32MB的一个动态调整值。

ptmalloc2 默认开启动态调整 mmap 分配阈值和 收缩阈值。

当用户需要分配的内存大于 mmap分配阈值，ptmalloc2的 malloc()函数其实相当于 mmap()的简单封装， free 函数相当于 munmap()的简单封装。相当于直接通过系统调用分配内存，
回收的内存就直接返回给操作系统了。

因为这些大块内存不能被 ptmalloc 缓存管理，不能重用，所以 ptmalloc 也只有在万不得已的情况下才使用该方式分配内存。

使用 mmap 分配有如下的好处：

a) Mmap 的空间不会被 ptmalloc2 缓存，不会导致 ptmalloc2 内存暴增的问题。

使用 mmap 分配内存的缺点：

a) 会导致更多的内存浪费，因为 mmap 需要4KB对齐。

b)操作系统调用 mmap()分配内存是串行的， 在发生缺页异常时加载新的物理页，需要对新的物理页做清 0 操作，影响效率。

所以用 mmap 来分配长生命周期的大内存块就是最好的选择，其他情况下都不太高效。

4) M_MMAP_MAX

M_MMAP_MAX 用于设置进程中用 mmap chunk个数最大限制，默认值为64K([DEFAULT_MMAP_MAX] (http://10.200.29.172/source-glibc-2.17/xref/glibc-2.17/malloc/malloc.c#1034))。
如果将 M_MMAP_MAX 设置为 0， ptmalloc2 将不会使用 mmap 分配大块内存。


5) ptmalloc2 没有提供关闭 mmap 分配阈值动态调整机制的选项， mmap 分配阈值动态 调整默认是开启的，如果要关闭 mmap分配阈值动态调整机制，可以设置
M_TRIM_THRESHOLD， M_MMAP_THRESHOLD， M_MMAP_MAX 中的任意一个。

但是强烈建议不要关闭该机制，该机制保证了 ptmalloc2 尽量重用缓存中的空闲内存，不用每次对相对大一些的内存使用系统调用 mmap 去分配内存

####3.8 使用ptmalloc2需要注意的

1)因为 ptmalloc2 的内存收缩是从 top chunk 开始，如果与 top chunk 相邻的那个 chunk没有释放， 

top chunk 以下的空闲内存都无法返回给系统，即使这些空闲内存有几十个 G 也不行。

2)当进程的线程数很多，在高压力高并发环境下， 频繁分配和释放内存，导致malloc()的内存在不同的分配区，1）中的情况非常容易出现





###4. 自己实现内存管理，解决第1节中我们遇到的问题


###5. 参考文献:

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
