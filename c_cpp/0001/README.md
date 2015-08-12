##1. Linux下，STL map存储大量小片(small chunk)数据，map析构后，内存不释放问题；并初步探讨glibc malloc internal。

####1.1. 用代码引出问题

####1.2. 原因分析

####1.3. 用自己实现的内存管理数据结构来解决问题

##2. 某些参考文献是错误的

####2.1. 参考文献"[1 频繁分配释放内存导致的性能问题的分析](http://bbs.csdn.net/topics/330179712)"的错误

文章认为brk是将数据段(.data)的最高地址指针"_edata" 往高地址推。

但是我进行了测试，在glibc里不是这样的(不知该文章针对哪个malloc实现)。

编译代码"[edata_test.cpp](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/edata_test.cpp)" 得到输出：

```
-----------------------------------------------------
Before malloc A:
&_edata=  0x60104c, _edata=0
After malloc A & memset A:
&_edata=  0x60104c, _edata=0
-----------------------------------------------------
Before malloc B:
&_edata=  0x60104c, _edata=0
After malloc B & memset B:
&_edata=  0x60104c, _edata=0
-----------------------------------------------------
```

可以看到&_edata 没有发生变化。。。

####2.2. 参考文献"[2 GLIBC内存分配机制引发的'内存泄露'](http://www.nosqlnotes.net/archives/105)"引用了"[1](http://bbs.csdn.net/topics/330179712)"

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

>\[11]malloc.c, <http://osxr.org/glibc/source/malloc/malloc.c?v=glibc-2.17>

>\[12]malloc.c, <http://code.metager.de/source/xref/gnu/glibc/malloc/malloc.c>
