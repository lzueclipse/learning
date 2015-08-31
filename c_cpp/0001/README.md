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
[(插入数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L80)
来模拟我们的业务场景(一个md5值作为key，对应一个uint64_t值作为value)。
可以发现map.clear()删除数据后
[(删除数据代码)](https://github.com/lzueclipse/learning/blob/master/c_cpp/0001/mytest.cpp#L108)，
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

**在第2节，我们将讲述glibc malloc/free(ptmalloc2)原理。**
-------------------------------------------------------

###2. ptmalloc2基础
目前glibc中使用的是ptmalloc version 2，简称ptmalloc2。

我们仅仅针对ptmalloc2展开讨论，不涉及业界流行的jemalloc，tcmalloc等其他内存分配器。

本章节大部分节选自[参考文献 1，淘宝工程师力作](http://pan.baidu.com/s/1G1pIe)

###2.1 x86_64位下内存布局

![图1](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0001/1.png "图1")
上图是 X86_64 下 Linux 进程的默认内存布局形式，这只是一个示意图， 当前内核默认 配置下，进程的stack和 mmap映射区域并不是从一个固定地址开始，并且每次启动时的值都

不一样，这是程序在启动时随机改变这些值的设置，使得使用缓冲区溢出进行攻击更加困难。可以用如下命令禁止该特性：sudo sysctl -w kernel.randomize_va_space=0

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
