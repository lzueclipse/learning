##Linux下，STL map存储大量小块(small chunk)数据，map析构后，内存不返还给操作系统

###1. 问题

STL map析构后，内存不返还给操作系统，这个问题和glibc malloc/free的实现有关。

STL map调用的new/delete是基于malloc/free实现的。

我们仅仅讨论glibc默认使用的ptmalloc，不涉及tcmalloc，jemalloc等其它比较流行的malloc实现。

###2. ptmalloc基础

###2.1 

###2.2

###2.3

###2.4

###2.5

###2.6

###3. 重现STL map不返还内存问题，并根据malloc debug信息分析


###4. 自己实现的内存管理来解决问题


###5. 参考文献:

>\[1] glibc内存管理ptmalloc源代码分析4--淘宝工程师力作, <http://pan.baidu.com/s/1G1pIe>

>\[2] glibc下的内存管理, <http://www.cnblogs.com/lookof/archive/2013/03/26/2981768.html>

>\[3] ptmalloc, <http://blog.csdn.net/phenics/article/details/777053#node_sec_1>

>\[4] glibc（ptmalloc）内存暴增问题解决 <http://www.blog.chinaunix.net/uid-18770639-id-3385860.html>

>\[5] Linux Allocator Does Not Release Small Chunks of Memory, <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[6] Malloc, brk, mmap and multithreading (draft), <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[7] Malloc parameters, <http://www.gnu.org/software/libc/manual/html_node/Malloc-Tunable-Parameters.html>

>\[8] malloc_text.c <https://github.com/metroxinjing/side_projects/blob/master/memory_management/malloc_test.c>

>\[9] mallinfo, <http://sdutlinux.org/t/1295> 

>\[10]man mallinfo

>\[11]malloc.c, <http://osxr.org/glibc/source/malloc/malloc.c?v=glibc-2.17>

>\[12]malloc.c, <http://code.metager.de/source/xref/gnu/glibc/malloc/malloc.c>

>\[13] 频繁分配释放内存导致的性能问题的分析(关于edata的描述，不确切), <http://bbs.csdn.net/topics/330179712>

>\[14] GLIBC内存分配机制引发的“内存泄露”(关于edata的描述，不确切), <http://www.nosqlnotes.net/archives/105>

>\[15] Understanding glibc malloc (自备梯子） <https://sploitfun.wordpress.com/2015/02/10/understanding-glibc-malloc/>
