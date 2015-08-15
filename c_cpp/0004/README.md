#以菱形链接(diamond link)为例，探讨Linux下 连接器和加载器对Shared libarary兼容性的处理

##1. 什么是菱形链接(diamond link)
菱形链接(diamond link)未必是一个广泛使用的术语，但我觉得它能十分清楚的描述出我们要讨论的问题。

该术语，模仿自C++中的菱形集成(diamond inheritance)。

![图1](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/diamond_linking.jpg "图1")

如上图所示，我们的程序将要load某厂家的共享库libvendor1.so，同时也要使用另外一个厂家的共享库libvendor2.so。

libvendor1.so和libvendor2.so都将使用某知名开源共享库libopensource.so。

但是这两个厂家提供给我们的都是自己编译维护的libopensource.so。

我们遇到的问题是，虽然两个厂家提供的libopensource.so是相同版本，但是互相不兼容，导致我们遇到的现象是：

只有其中一个厂家的库能正常工作，因为只有一个厂家提供的libopensource.so被加载, 另外一个厂家的共享库使用了不是自己提供的libopensource.so。

这个问题扩展展开来：

1)如果libopensource.so的版本不相同，是否两个版本的libopensource.so都会被查找到(lookup)？还是只有某一个版本libopensource.so的被查找到？符号绑定（binding）绑定的是哪个版本的？

2）如果libopensource.so的版本相同，是否两个相同版本的libopensource.so都会被查找到？还是只挑选其中一个版本的libopensource.so被查找到？符号绑定的是哪个版本的？

如果这几个问题您没有答案，建议您跟随我的实验，我们一起探讨下。

因为我个人没看过连接器和加载器的源码，估计也不好看懂，所以我们的探讨集中在我们看到的证据上，并试图给出一些粗浅的结论。

##2.相关实验代码
具体代码在github中。

调用依赖： main.c<----vendor[1|2].c<--------opensource_v[1|2].c(函数opensource_print的不同实现)。

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



##3.libopensource.so的版本不相同，如何查找依赖库和绑定符号

在这个实验里我们编译opensource_v1.c生成./opensource_v1/libopensource.so.1.0；编译opensource_v2.c生成./opensource_v2/libopensource.so.2.0。

libvendor1.so将依赖./opensource_v1/libopensource.so.1.0； libvendor2.so将依赖./opensource_v2/libopensource.so.2.0。

###3.1 符号表不带版本信息的
符号表不带版本信息gcc的默认行为。

#####3.1.1 我们用[force_soname_to_different_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_without_default_symver.sh) 
来编译。

```
[root@localhost 0004]# sh force_soname_to_different_without_default_symver.sh
Complile success
```

#####3.1.2 列出编译生成的文件

我们把libopensource.so.1相应3个文件放在"./opensource_v1"目录，把libopensource.so.2相应3个文件放在"./opensource_v2"目录：

![图2](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/2.png "图2")

#####3.1.3 用readelf查看编译生成的main，libvendor1.so，libvendor2.so

我们仅仅关注"NEEDED"，"RPATH"项。

"NEEDED"表示依赖的库。

"rpath"和"LD_LIBRARY_PATH"，表示查找依赖库会从这些列出的路径查找。

更多细节所请自行Google。

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

#####3.1.4 用nm|grep opensource_print查看编译生成的libvendor1.so和libvendor2.so, 可以看到符号"opensource_print" 
```
[root@localhost 0004]# nm libvendor1.so |grep opensource_print
                 U opensource_print
```

```
[root@localhost 0004]# nm libvendor2.so |grep opensource_print
                 U opensource_print
```

#####3.1.5 用LD_DEBUG 来debug 依赖库和符号绑定的过程
```
[root@localhost 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```
首先看输出，从结果看，仅仅调用了libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.1.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.1.txt)

我们来分析[robin.1.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.1.txt)输出：

51行到61行，./opensource_v1/libopensource.so.1被查找到
```
51      22069: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
52      22069: find library=libopensource.so.1 [0]; searching
53      22069:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./main)
54      22069:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
55      22069:   trying file=./opensource_v1/tls/libopensource.so.1
56      22069:   trying file=./opensource_v1/x86_64/libopensource.so.1
57      22069:   trying file=./opensource_v1/libopensource.so.1
 
59      22069: file=libopensource.so.1 [0];  generating link map
60      22069:   dynamic: 0x00007f21ce192e08  base: 0x00007f21cdf92000   size: 0x0000000000201038
61      22069:     entry: 0x00007f21cdf92600  phdr: 0x00007f21cdf92040  phnum:   
```

64行到74行，./opensource_v2/libopensource.so.2被找到
```
64      22069: file=libopensource.so.2 [0];  needed by ./libvendor2.so [0]
65      22069: find library=libopensource.so.2 [0]; searching
66      22069:  search path=./opensource_v2/tls/x86_64:./opensource_v2/tls:./opensource_v2/x86_64:./opensource_v2      (RPATH from file ./main    )
67      22069:   trying file=./opensource_v2/tls/x86_64/libopensource.so.2
68      22069:   trying file=./opensource_v2/tls/libopensource.so.2
69      22069:   trying file=./opensource_v2/x86_64/libopensource.so.2
70      22069:   trying file=./opensource_v2/libopensource.so.2
71      22069:
72      22069: file=libopensource.so.2 [0];  generating link map
73      22069:   dynamic: 0x00007f21cdf90e08  base: 0x00007f21cdd90000   size: 0x0000000000201038
74      22069:     entry: 0x00007f21cdd90600  phdr: 0x00007f21cdd90040  phnum:                  7
```

752行到772行，然而"opensource_pirnt"这个符号，却被绑定到libopensource.so.1上(757行和772行)：
```
752      22069: symbol=opensource_print;  lookup in file=./main [0]
753      22069: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
754      22069: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
755      22069: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
756      22069: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
757      22069: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
758      22069: symbol=printf;  lookup in file=./main [0]
759      22069: symbol=printf;  lookup in file=./libvendor1.so [0]
760      22069: symbol=printf;  lookup in file=./libvendor2.so [0]
761      22069: symbol=printf;  lookup in file=/lib64/libc.so.6 [0]
762      22069: binding file ./opensource_v1/libopensource.so.1 [0] to /lib64/libc.so.6 [0]: normal symbol `printf' [GLIBC_2.2.5]
763      22069: symbol=vendor2;  lookup in file=./main [0]
764      22069: symbol=vendor2;  lookup in file=./libvendor1.so [0]
765      22069: symbol=vendor2;  lookup in file=./libvendor2.so [0]
766      22069: binding file ./main [0] to ./libvendor2.so [0]: normal symbol `vendor2'
767      22069: symbol=opensource_print;  lookup in file=./main [0]
768      22069: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
769      22069: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
770      22069: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
771      22069: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
772      22069: binding file ./libvendor2.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```

猜测:
虽然两个版本的libopensource.so(libopensource.so.1, libopensource.so.2)都被查找到，
但是libopensource.so.1的位置靠前，所以"opensource_print"先在libopensource.so.1中被查找到，并绑定；
一旦查找到一个，就不再查找。

####3.2 符号表带版本信息的

####3.3 符号表不带版本信息，但显式调用dlopen等API的

##4.libopensource.so的版本相同，如何加载和绑定

##5. 根据实验得出的结论 (所以未必100%正确，但一直也没见到权威的资料描述这些情况)

##6. 参考文献
>\[1] 一篇blog，<https://blog.habets.se/2012/05/Shared-libraries-diamond-problem>

>\[2] Google

