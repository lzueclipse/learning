##由STL map调用clear()后，内存不返还给操作系统的问题出发，探讨ptmalloc2(glibc malloc) malloc/free行为

###1. 问题
我们的程序要向std::map中插入大量的数据，但每个数据只有几十字节；当使用完该std::map，调用map.clear()，删除map里的所有元素，sleep 15秒后，发现std::map所占内存没有返还给操作系统。

本文所有实验基于**Red Hat Enterprise 7.0，glibc版本2.17**

####1.1 实验--1


编译:
```
[root@node1 0001]# sh build.sh
Complile mytest success
```

运行:
```

[root@node1 0001]# ./mytest map
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
[(插入数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L107)
来模拟我们的业务场景(一个md5值作为key，对应一个uint64_t值作为value)。
可以发现map.clear()删除数据后
[(删除数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L133)，
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

这样分配的 chunk 在被 free 时将直接解除映射，于是就将内存归还给了操作系统；同时会把 mmap 分配阈值调整为当前回收的 chunk 的大小，并将 mmap 收缩阈值（ mmap trim threshold）设置为 mmap 分配阈值的 2 倍。这就是 ptmalloc 的对 mmap分配阈值的动态调整机制，该机制是默认开启的，当然也可以用 mallopt()关闭该机制（3.6节会介绍)


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
阈值的动态调整机制，并且当前回收的 chunk 大小大于 mmap 分配阈值，将 mmap分配阈值设置为该 chunk 的大小，将 mmap 收缩阈值设定为 mmap 分配阈值的 2倍，释放完成，否则跳到下一步。

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

11) 判断 top chunk 的大小是否大于 mmap 收缩阈值(一个动态值)， 如果是的话， 对于主分配区， 则会通过sbrk()试图归还 top chunk 中的一部分给操作系统。 
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
M_TRIM_THRESHOLD 用于设置 mmap 收缩阈值，默认值为 128KB。自动收缩只会在 free
时才发生，如果当前 free 的 chunk 大小加上前后能合并 chunk 的大小大于 64KB，并且 top
chunk 的大小达到 mmap 收缩阈值， 对于主分配区，调用 malloc_trim()返回一部分内存给操
作系统，对于非主分配区，调用 heap_trim()返回一部分内存给操作系统，在发生内存收缩
时，还是从新设置 mmap 分配阈值和 mmap 收缩阈值。
这个选项一般与 M_MMAP_THRESHOLD 选项一起使用， M_MMAP_THRESHOLD 用于设置
mmap 分配阈值，对于长时间运行的程序，需要对这两个选项进行调优， 尽量保证在 ptmalloc
中缓存的空闲 chunk 能够得到重用，尽量少用 mmap 分配临时用的内存。 不停地使用系统
调用 mmap 分配内存，然后很快又 free 掉该内存，这样是很浪费系统资源的，并且这样分
配的内存的速度比从 ptmalloc 的空闲 chunk 中分配内存慢得多，由于需要页对齐导致空间利
用率降低， 并且操作系统调用 mmap()分配内存是串行的， 在发生缺页异常时加载新的物理
页，需要对新的物理页做清 0 操作，大大影响效率。
23
M_TRIM_THRESHOLD 的值必须设置为页大小对齐，设置为-1 会关闭内存收缩设置。
注意：试图在程序开始运行时分配一块大内存，并马上释放掉，以期望来触发内存收缩，
这是不可能的，因为该内存马上就返回给操作系统了。
3． M_MMAP_THRESHOLD
M_MMAP_THRESHOLD 用于设置 mmap 分配阈值，默认值为 128KB， ptmalloc 默认开启
动态调整 mmap 分配阈值和 mmap 收缩阈值。
当用户需要分配的内存大于 mmap分配阈值，ptmalloc的 malloc()函数其实相当于 mmap()
的简单封装， free 函数相当于 munmap()的简单封装。相当于直接通过系统调用分配内存，
回收的内存就直接返回给操作系统了。因为这些大块内存不能被 ptmalloc 缓存管理，不能重
用，所以 ptmalloc 也只有在万不得已的情况下才使用该方式分配内存。
但使用 mmap 分配有如下的好处：
 Mmap 的空间可以独立从系统中分配和释放的系统，对于长时间运行的程序，申请
长生命周期的大内存块就很适合有这种方式。
 Mmap 的空间不会被 ptmalloc 锁在缓存的 chunk 中，不会导致 ptmalloc 内存暴增的
问题。
 对有些系统的虚拟地址空间存在洞，只能用 mmap()进行分配内存， sbrk()不能运行。
使用 mmap 分配内存的缺点：
 该内存不能被 ptmalloc 回收再利用。
 会导致更多的内存浪费，因为 mmap 需要按页对齐。
 它的分配效率跟操作系统提供的 mmap()函数的效率密切相关， Linux 系统强制把匿
名 mmap 的内存物理页清 0 是很低效的。
所以用 mmap 来分配长生命周期的大内存块就是最好的选择，其他情况下都不太高效。
4． M_MMAP_MAX
M_MMAP_MAX 用于设置进程中用 mmap 分配的内存块的最大限制，默认值为 64K，因
为有些系统用 mmap 分配的内存块太多会导致系统的性能下降。
如果将 M_MMAP_MAX 设置为 0， ptmalloc 将不会使用 mmap 分配大块内存。
Ptmalloc 为优化锁的竞争开销，做了 PER_THREAD 的优化，也提供了两个选项，
M_ARENA_TEST 和 M_ARENA_MAX，由于 PER_THREAD 的优化默认没有开启，这里暂不对这
两个选项做介绍。
另外， ptmalloc 没有提供关闭 mmap 分配阈值动态调整机制的选项， mmap 分配阈值动
态 调 整 时 默 认 开 启 的 ， 如 果 要 关 闭 mmap 分 配 阈 值 动 态 调 整 机 制 ， 可 以 设 置
M_TRIM_THRESHOLD， M_MMAP_THRESHOLD， M_TOP_PAD 和 M_MMAP_MAX 中的任意一个。
但是强烈建议不要关闭该机制，该机制保证了 ptmalloc 尽量重用缓存中的空闲内存，不用每
次对相对大一些的内存使用系统调用 mmap 去分配内存

####3.7 使用注意事项
为了避免 Glibc 内存暴增，使用时需要注意以下几点：
1． 后分配的内存先释放，因为 ptmalloc 收缩内存是从 top chunk 开始，如果与 top chunk 相
邻的 chunk 不能释放， top chunk 以下的 chunk 都无法释放。
2． Ptmalloc 不适合用于管理长生命周期的内存，特别是持续不定期分配和释放长生命周期
的内存，这将导致 ptmalloc 内存暴增。如果要用 ptmalloc 分配长周期内存，在 32 位系
24
统上，分配的内存块最好大于 1MB， 64 位系统上，分配的内存块大小大于 32MB。这是
由于 ptmalloc 默认开启 mmap 分配阈值动态调整功能， 1MB 是 32 位系统 mmap 分配阈
值的最大值， 32MB 是 64 位系统 mmap 分配阈值的最大值，这样可以保证 ptmalloc 分配
的内存一定是从 mmap 映射区域分配的，当 free 时， ptmalloc 会直接把该内存返回给操
作系统，避免了被 ptmalloc 缓存。
3． 不要关闭 ptmalloc 的 mmap 分配阈值动态调整机制，因为这种机制保证了短生命周期的
内存分配尽量从 ptmalloc 缓存的内存 chunk 中分配，更高效，浪费更少的内存。如果关
闭了该机制，对大于 128KB 的内存分配就会使用系统调用 mmap 向操作系统分配内存，
使用系统调用分配内存一般会比从 ptmalloc 缓存的 chunk 中分配内存慢，特别是在多线
程同时分配大内存块时， 操作系统会串行调用 mmap()，并为发生缺页异常的页加载新
物理页时，默认强制清 0。频繁使用 mmap 向操作系统分配内存是相当低效的。使用
mmap 分配的内存只适合长生命周期的大内存块。
4． 多线程分阶段执行的程序不适合用 ptmalloc，这种程序的内存更适合用内存池管理，就
像 Appach 那样，每个连接请求处理分为多个阶段，每个阶段都有自己的内存池， 每个
阶段完成后，将相关的内存就返回给相关的内存池。 Google 的许多应用也是分阶段执行
的，他们在使用 ptmalloc 也遇到了内存暴增的相关问题，于是他们实现了 TCMalloc 来代
替 ptmalloc， TCMalloc 具有内存池的优点，又有垃圾回收的机制，并最大限度优化了锁
的争用，并且空间利用率也高于 ptmalloc。 Ptmalloc 假设了线程 A 释放的内存块能在线
程 B 中得到重用，但 B 不一定会分配和 A 线程同样大小的内存块，于是就需要不断地做
切割和合并，可能导致内存碎片。
5． 尽量减少程序的线程数量和避免频繁分配/释放内存， Ptmalloc 在多线程竞争激烈的情况
下，首先查看线程私有变量是否存在分配区，如果存在则尝试加锁，如果加锁不成功会
尝试其它分配区，如果所有的分配区的锁都被占用着，就会增加一个非主分配区供当前
线程使用。由于在多个线程的私有变量中可能会保存同一个分配区，所以当线程较多时，
加锁的代价就会上升， ptmalloc 分配和回收内存都要对分配区加锁，从而导致了多线程
竞争环境下 ptmalloc 的效率降低。
6． 防止内存泄露， ptmalloc 对内存泄露是相当敏感的，根据它的内存收缩机制，如果与 top
chunk 相邻的那个 chunk 没有回收，将导致 top chunk 一下很多的空闲内存都无法返回给
操作系统。
7． 防止程序分配过多内存，或是由于 Glibc 内存暴增，导致系统内存耗尽，程序因 OOM 被
系 统 杀 掉 。 预 估 程 序 可 以 使 用 的 最 大 物 理 内 存 大 小 ， 配 置 系 统 的
/proc/sys/vm/overcommit_memory， /proc/sys/vm/overcommit_ratio，以及使用 ulimt –v
限制程序能使用虚拟内存空间大小，防止程序因 OOM 被杀掉。

####3.8 问题分析与解决
通过前面几节对 ptmalloc 实现的粗略分析，尝试去分析和解决我们遇到的问题，我们系
统遇到的问题是 glibc 内存暴增，现象是程序已经把内存返回给了 Glibc 库，但 Glibc 库却没
有把内存归还给操作系统，最终导致系统内存耗尽，程序因为 OOM 被系统杀掉。
请参考 3.2.2 节对 ptmalloc 的设计假设与 3.2.7 节对 ptmalloc 的使用注意事项，原因有如
下几点：
1. 在 64 位系统上使用默认的系统配置，也就是说 ptmalloc 的 mmap 分配阈值动态调整机
制是开启的。我们的 NoSql 系统经常分配内存为 2MB，并且这 2MB 的内存很快会被释
25
放， 在 ptmalloc 回收 2MB 内存时， ptmalloc 的动态调整机制会认为 2MB 对我们的系统
来说是一个临时的内存分配，每次都用系统调用 mmap()向操作系统分配内存， ptmalloc
认为这太低效了，于是把 mmap 的阈值设置成了 2MB+4K，当下次再分配 2MB 的内存时，
尽量从 ptmalloc 缓存的 chunk 中分配，缓存的 chunk 不能满足要求，才考虑调用 mmap()
进行分配，提高分配的效率。
2. 系统中分配 2M 内存的地方主要有两处，一处是全局的内存 cache，另一处是网络模块，
网络模块每次分配 2MB 内存用于处理网络的请求，处理完成后就释放该内存。这可以
看成是一个短生命周期的内存。内存 cache 每次分配 2MB，但不确定什么时候释放，也
不确定下次会什么时候会再分配 2MB 内存，但有一点可以确定，每次分配的 2MB 内存，
要经过比较长的一段时间才会释放，所以可以看成是长生命周期的内存块，对于这些
cache 中的多个 2M 内存块没有使用 free list 管理，每次都是先从 cache 中 free 调用一个
2M 内存块，再从 Glibc 中分配一块新的 2M 内存块。 Ptmalloc 不擅长管理长生命周期的
内存块， ptmalloc 设计的假设中就明确假设缓存的内存块都用于短生命周期的内存分配，
因为 ptmalloc 的内存收缩是从 top chunk 开始，如果与 top chunk 相邻的那个 chunk 在我
们 NoSql 的内存池中没有释放， top chunk 以下的空闲内存都无法返回给系统，即使这些
空闲内存有几十个 G 也不行。
3. Glibc 内存暴增的问题我们定位为全局内存池中的内存块长时间没有释放，其中还有一个
原因就是全局内存池会不定期的分配内存，可能下次分配的内存是在 top chunk分配的，
分配以后又短时间不释放， 导致 top chunk 升到了一个更高的虚拟地址空间，从而使
ptmalloc 中缓存的内存块更多，但无法返回给操作系统。
4. 另一个原因就是进程的线程数越多，在高压力高并发环境下， 频繁分配和释放内存，由
于分配内存时锁争用更激烈， ptmalloc 会为进程创建更多的分配区，由于我们的全局内
存池的长时间不释放内存的缘故，会导致 ptmalloc 缓存的 chunk 数量增长得更快，从而
更容易重现 Glibc 内存暴增的问题。在我们的 ms 上这个问题最为突出，就是这个原因。
5. 内存池管理内存的方式导致 Glibc 大量的内存碎片。 我们的内存池对于小于等于 64K 的
内存分配，则从内存池中分配 64K 的内存块，如果内存池中没有，则调用 malloc()分配
64K 的内存块，释放时，该 64K 的内存块加入内存中，永不还回给操作系统，对于大于
64K 的内存分配，调用 malloc()分配，释放时调用 free()函数换回给 Glibc。这些大量的
64K 的内存块长时间存在于内存池中，导致了 Glibc 中缓存了大量的内存碎片不能释放回
操作系统。 比如:
64K 100K 64K
假如应用层分配内存的顺序是 64K， 100K， 64K，然后释放 100K 的内存块， Glibc 会缓
存这个 100K 的内存块，其中的两个 64K 内存块都在 mempool 中，一直不释放，如果下次再
分配 64K 的内存，就会将 100K 的内存块拆分成 64K 和 36K 的两个内存块， 64K 的内存块返
回给应用层，并被 mempool 缓存，但剩下的 36K 被 Glibc 缓存，再也不能被应用层分配了，
因为应用层分配的最小内存为 64K，这个 36K 的内存块就是内存碎片， 这也是内存暴增的原
因之一。
问题找到了，解决的办法可以参考如下几种:
1. 禁 用 ptmalloc 的 mmap 分 配 阈 值 动 态 调 整 机 制 。 通 过 mallopt() 设 置
M_TRIM_THRESHOLD， M_MMAP_THRESHOLD， M_TOP_PAD 和 M_MMAP_MAX 中的
任意一个，关闭 mmap 分配阈值动态调整机制，同时需要将 mmap 分配阈值设置
为 64K，大于 64K 的内存分配都使用 mmap 向系统分配，释放大于 64K 的内存将调
用 munmap 释放回系统。但强烈建议不要这么做，这会大大降低 ptmalloc 的分配
26
释放效率。因为系统调用 mmap 是串行的，操作系统需要对 mmap 分配内存加锁，
而且操作系统对 mmap 的物理页强制清 0 很慢，请参看 3.2.6 选项配置相关描述。
由于最初我们的系统的预分配优化做得不够好，关闭 mmap 的动态阈值调整机制
后， chunkserver 在 ssd 上的性能减少到原来的 1/3，这种性能结果是无法让人接受
的。
2. 我们系统的关键问题出在全局内存池，它分配的内存是长生命周期的大内存块，通
过前面的分析可知，对长生命周期的大内存块分配最好用 mmap 系统调用直接向
操作系统分配，回收时用 munmap 返回给操作系统。比如内存池每次用 mmap 向
操作系统分配 8M 或是更多的虚拟内存。如果非要用 ptmalloc 的 malloc 函数分配
内存，就得绕过 ptmalloc 的 mmap 分配阈值动态调整机制， mmap 分配阈值在 64
位系统上的最大值为 32M，如果分配的内存大于 32M，可以保证 malloc 分配的内
存肯定是用 mmap 向操作系统分配的，回收时 free 一定会返回给操作系统，而不
会被 ptmalloc缓存用于下一次分配。但是如果这样使用 malloc分配的话，其实 malloc
就是 mmap 的简单封装，还不如直接使用 mmap 系统调用想操作系统分配内存来
得简单，并且显式调用 munmap 回收分配的内存，根本不依赖 ptmalloc 的实现。
3. 改写内存 cache，使用 free list 管理所分配的内存块。 使用预分配优化已有的代码，
尽量在每个请求过程中少分配内存。并使用线程私有内存块来存放线程所使用的私
有实例。这种解决办法也是暂时的。
4. 从长远的设计来看，我们的系统也是分阶段执行的，每次网络请求都会分配 2MB
为单位内存， 请求完成后释放请求锁分配的内存，内存池最适合这种情景的操作。
我们的线程池至少需要包含对 2MB 和几种系统中常用分配大小的支持，采用与
TCMalloc 类似的无锁设计，使用线程私用变量的形式尽量减少分配时线程对锁的争
用。或者直接使用 TCMalloc，免去了很多的线程池设计考虑。



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
