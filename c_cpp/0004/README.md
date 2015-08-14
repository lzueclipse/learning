#以菱形链接(diamond link)为例，探讨Linux下 连接器和加载器对Shared libarary兼容性的处理

##1. 什么是菱形链接(diamond link)
菱形链接(diamond link)未必是一个真正被大家广泛接受的术语，但我觉得它能十分清楚的描述出我们要讨论的问题。

该术语，模仿自C++中的菱形集成(diamond inheritance)。

![图1](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/diamond_linking.jpg "图1")

如上图所示，我们的程序将要load某厂家的共享库libvendor1.so，同时也要使用另外一个厂家的共享库libvendor2.so。

libvendor1.so和libvendor2.so都将使用某知名开源共享库libopensource.so。

但是这两个厂家提供给我们的都是自己编译维护的libopensource.so。

我们遇到的问题是，虽然两个厂家提供的libopensource.so是相同版本，但是互相不兼容，导致我们遇到的现象是：

只有其中一个厂家的库能正常工作，因为只有一个厂家提供的libopensource.so被加载, 另外一个厂家的共享库使用了不是自己提供的libopensource.so。

这个问题扩展展开来：

1)如果libopensource.so的版本不相同，是否两个版本的libopensource.so都会被加载？还是只有某一个版本的被加载？符号绑定（binding）绑定的是哪个版本的？

2）如果libopensource.so的版本相同，是否两个相同版本的libopensource.so都会被加载？还是只挑选其中一个被加载？符号绑定的是哪个版本的？

如果这几个问题您没有答案，建议您跟随我的实验，我们一起探讨下。

因为我个人没看过连接器和加载器的源码，估计也不好看懂，所以我们的探讨集中在我们看到的证据上，并试图给出一些粗浅的结论。

##2.相关代码
具体代码在github中。

调用依赖： main.c<----vendor[1|2].c<--------opensource_v[1|2].c

C源代码:

1)其中vendor1.c会被编译生成libvendor1.so，vendor2.c会被编译生成libvendor2.so，opensource_v1.c会被编译生成libopensource.so.xxx，
opensource_v2.c会被编译成libopensource.so.xxx（xxx值需详细看后续实验）

2)main.c链接libvendor1.so，libvendor2.so，libopensource.so.xxx生成可执行文件

[main.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/main.c)

[vendor1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor1.c)

[vendor2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor2.c)

[opensource_v1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v1.c)

[opensource_v2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v2.c)

用于控制编译的Shell脚本（4个实验，每个使用一个脚本，为了便于说清）:

[force_soname_to_different_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_without_default_symver.sh)  

[force_soname_to_different_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_with_default_symver.sh)

[force_soname_to_same_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_same_without_default_symver.sh)

[force_soname_to_same_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_same_with_default_symver.sh)



##3.libopensource.so的版本不相同，如何加载和绑定

在这个实验里我们编译opensource_v1.c生成./opensource_v1/libopensource.so.1.0；编译opensource_v2.c生成./opensource_v2/libopensource.so.2.0。

libvendor1.so将依赖./opensource_v1/libopensource.so.1.0； libvendor2.so将依赖./opensource_v2/libopensource.so.2.0。

####3.1 符号表不带版本信息的
符号表不带版本信息gcc的默认行为。

1)我们用[force_soname_to_different_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_without_default_symver.sh) 
来编译。

```
[root@localhost 0004]# sh force_soname_to_different_without_default_symver.sh
Complile success
```

2)列出编译生成的文件

我们把libopensource.so.1相应3个文件放在"./opensource_v1"目录，把libopensource.so.2相应3个文件放在"./opensource_v2"目录：

![图2](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/2.png "图2")

3)用readelf查看编译生成的main，libvendor1.so，libvendor2.so

我们仅仅关注"NEEDED"，"RPATH"，"SONAME"项。

关于"rpath"和"LD_LIBRARY_PATH"请自行Google。


```
[root@localhost 0004]# readelf -d main

Dynamic section at offset 0xdf8 contains 27 entries:
 Tag        Type                         Name/Value
 0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
 0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000000f (RPATH)              Library rpath: [./:./opensource_v1:./opensource_v2]

```

```
[root@localhost 0004]# readelf -d libvendor1.so

Dynamic section at offset 0xde8 contains 27 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000e (SONAME)             Library soname: [libvendor1.so]
  0x000000000000000f (RPATH)              Library rpath: [./opensource_v1]
```

```
[root@localhost 0004]# readelf -d libvendor2.so

Dynamic section at offset 0xde8 contains 27 entries:
 Tag        Type                         Name/Value
 0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.2]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000000e (SONAME)             Library soname: [libvendor2.so]
 0x000000000000000f (RPATH)              Library rpath: [./opensource_v2]
```

4)用ldd查看编译生成的main，libvendor1.so，libvendor2.so
```
[root@localhost 0004]# ldd main
        linux-vdso.so.1 =>  (0x00007ffff6ffe000)
        libvendor1.so => ./libvendor1.so (0x00007fde0ced1000)
        libvendor2.so => ./libvendor2.so (0x00007fde0ccce000)
        libc.so.6 => /lib64/libc.so.6 (0x00007fde0c8fb000)
        libopensource.so.1 => ./opensource_v1/libopensource.so.1 (0x00007fde0c6f9000)
        libopensource.so.2 => ./opensource_v2/libopensource.so.2 (0x00007fde0c4f6000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fde0d0d4000)
```

```
[root@localhost 0004]# ldd libvendor1.so
        linux-vdso.so.1 =>  (0x00007fffad3fe000)
        libopensource.so.1 => ./opensource_v1/libopensource.so.1 (0x00007f69cfd3b000)
        libc.so.6 => /lib64/libc.so.6 (0x00007f69cf967000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f69d0140000)

```

```
[root@localhost 0004]# ldd libvendor2.so
        linux-vdso.so.1 =>  (0x00007fff425fe000)
        libopensource.so.2 => ./opensource_v2/libopensource.so.2 (0x00007ffc4dbb9000)
        libc.so.6 => /lib64/libc.so.6 (0x00007ffc4d7e5000)
        /lib64/ld-linux-x86-64.so.2 (0x00007ffc4dfbe000)
```

5)用nm|grep opensource_print查看编译生成的libvendor1.so，libvendor2.so
```
[root@localhost 0004]# nm libvendor1.so |grep opensource_print
                 U opensource_print
```

```
[root@localhost 0004]# nm libvendor2.so |grep opensource_print
                 U opensource_print
```

6)用LD_DEBUG 来debug 加载和绑定的过程
```
[root@localhost 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```
首先看输出，从结果看，仅仅调用了libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.1.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.1.txt)


####3.2 符号表带版本信息的


##4.libopensource.so的版本相同，如何加载和绑定



##5. 参考文献
>\[1] 一篇blog，<https://blog.habets.se/2012/05/Shared-libraries-diamond-problem>

>\[2] Google

