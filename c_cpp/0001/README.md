##1. Linux下，STL map存储大量小片(small chunk)数据，map析构后，内存不释放问题；并初步探讨glibc malloc internal。

####1.1. 用代码引出问题

####1.2. 原因分析

####1.3. 用自己实现的内存管理数据结构来解决问题


##3. 

##4. 参考文献:

>\[1] glibc下的内存管理, <http://www.cnblogs.com/lookof/archive/2013/03/26/2981768.html>

>\[2] ptmalloc, <http://blog.csdn.net/phenics/article/details/777053#node_sec_1>

>\[3] glibc（ptmalloc）内存暴增问题解决 <http://www.blog.chinaunix.net/uid-18770639-id-3385860.html>

>\[4] Linux Allocator Does Not Release Small Chunks of Memory, <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[5] Malloc, brk, mmap and multithreading (draft), <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[6] Malloc parameters, <http://www.gnu.org/software/libc/manual/html_node/Malloc-Tunable-Parameters.html>

>\[7] malloc_text.c <https://github.com/metroxinjing/side_projects/blob/master/memory_management/malloc_test.c>

>\[8] mallinfo, <http://sdutlinux.org/t/1295> 

>\[9]man mallinfo

>\[10]malloc.c, <http://osxr.org/glibc/source/malloc/malloc.c?v=glibc-2.17>

>\[11]malloc.c, <http://code.metager.de/source/xref/gnu/glibc/malloc/malloc.c>

>\[12] 频繁分配释放内存导致的性能问题的分析(关于edata的描述，不确切), <http://bbs.csdn.net/topics/330179712>

>\[13] GLIBC内存分配机制引发的“内存泄露”(关于edata的描述，不确切), <http://www.nosqlnotes.net/archives/105>

