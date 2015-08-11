##1. Linux下，STL map存储大量小片(small chunk)数据，map析构后，内存不释放问题；并初步探讨glibc malloc internal。

###1.1. 用代码引出问题

###1.2. 原因分析

###1.3. 用自己实现的内存管理数据结构来解决问题

##2. 某些参考文献是错误的，虽然看起来很牛逼

参考文献"[1][频繁分配释放内存导致的性能问题的分析](http://bbs.csdn.net/topics/330179712)"，其中描述看起来很有道理，


##3. 参考文献:

>\[1] 频繁分配释放内存导致的性能问题的分析, <http://bbs.csdn.net/topics/330179712>

>\[2] GLIBC内存分配机制引发的“内存泄露”, <http://www.nosqlnotes.net/archives/105>

>\[3] glibc下的内存管理, <http://www.cnblogs.com/lookof/archive/2013/03/26/2981768.html>

>\[4] ptmalloc, <http://blog.csdn.net/phenics/article/details/777053#node_sec_1>

>\[5] Linux Allocator Does Not Release Small Chunks of Memory, <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[6] Malloc, brk, mmap and multithreading (draft), <http://stackoverflow.com/questions/10943907/linux-allocator-does-not-release-small-chunks-of-memory>

>\[7] Malloc parameters, <http://www.gnu.org/software/libc/manual/html_node/Malloc-Tunable-Parameters.html>

>\[8] malloc_text.c <https://github.com/metroxinjing/side_projects/blob/master/memory_management/malloc_test.c>

>\[9] mallinfo, <http://sdutlinux.org/t/1295> 

>\[10]man mallinfo
