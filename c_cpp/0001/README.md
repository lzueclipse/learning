##由STL map析构后，内存不返还给操作系统的问题出发，探讨ptmalloc2(glibc malloc) malloc/free行为

###1. 问题
我们的程序要向std::map中插入大量的数据，但每个数据只有几十字节。
[(插入数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L40)

当使用完该std::map，调用map.clear()，删除map里的所有元素，sleep一段时间后，发现std::map所占内存没有返还给操作系统。
[(删除数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L68)

当std::map被析构，sleep一段时间后，发现内存仍然没有返还给操作系统。
[(std::map析构代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L82)

**实验：**

编译:
```
sh build.sh
```

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
