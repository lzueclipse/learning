#以菱形链接(diamond link)为例，探讨Linux下连接器和加载器对Shared libarary兼容性的处理

##1. 什么是菱形链接(diamond link)
菱形链接(diamond link)能十分清楚的描述出我们要讨论的问题。

![图1](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/diamond_linking.jpg "图1")

如上图所示，我们的程序将要使用某厂家的共享库libvendor1.so，同时也要使用另外一个厂家的共享库libvendor2.so。

libvendor1.so和libvendor2.so都将使用某知名开源共享库libopensource.so.xxx(xxx表示版本)。

但是这两个厂家提供给我们的都是自己编译维护的libopensource.so.xxx。

我们遇到的问题是：

一个厂家使用了另外一个厂家提供libopensource.so.xxx，而不是自己提供的，出现兼容性问题。

这个问题扩展展开来：

1)如果libopensource.so.xxx的版本不相同，符号绑定（binding）的是哪个版本的？

2)如果libopensource.so.xxx的版本相同，符号绑定的是哪个版本的？

3)对于问题1)和2)，采用系统默认加载和使用"dlopen"等API显式加载，又有什么不同？

如果这几个问题您没有答案或者觉得比较含糊，建议您跟随我的实验，我们一起探讨下。

因为我个人没看过连接器和加载器的源码，所以我们的探讨集中在我们看到的证据上，并试图给出一些粗浅的结论。

##2.相关代码
具体代码在github中。
我们先弄清楚c文件的调用关系，以及编译脚本做了什么样的工作。

调用依赖： main.c<----vendor[1|2].c<--------opensource_v[1|2].c(函数opensource_print的不同实现)。

C源代码:

1)其中vendor1.c会被编译生成libvendor1.so，vendor2.c会被编译生成libvendor2.so；

opensource_v1.c会被编译生成./opensource_v1/libopensource.so.xxx(xxx值表示版本信息，后续实验会给定真实值)，opensource_v2.c会被编译成./opensource_v2/libopensource.so.xxx；

libvendor1.so会依赖./opensource_v1/libopensource.so.xxx, libvendor2.so会依赖./opensource_v2/libopensource.so.xxx,

2)main.c链接libvendor1.so，libvendor2.so生成可执行文件

3)main.c有两种用法，一种"general"使用系统默认的加载共享库的方法，一种"dlopen"使用dlopen等API显式加载需要的共享库。

[main.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/main.c)

[vendor1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor1.c)

[vendor2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor2.c)

[opensource_v1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v1.c)

[opensource_v2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v2.c)

用于控制编译的Shell脚本（每个使用一个脚本，为了便于说清）:

[different_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_without_default_symver.sh)  

[different_soname_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_with_default_symver.sh)

[same_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/same_soname_without_default_symver.sh)

[same_soname_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/same_soname_with_default_symver.sh)


##3.libopensource.so.xxx的版本不相同，系统如何查找依赖库和绑定符号

在这个实验里我们编译opensource_v1.c生成./opensource_v1/libopensource.so.1.0；编译opensource_v2.c生成./opensource_v2/libopensource.so.2.0。

libvendor1.so将依赖./opensource_v1/libopensource.so.1.0； libvendor2.so将依赖./opensource_v2/libopensource.so.2.0。

###3.1 符号表不带版本信息的
gcc编译的符号，默认是不带版本信息的。

#####3.1.1 我们用[different_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_without_default_symver.sh) 来编译。

```
[root@node1 0004]# sh different_soname_without_default_symver.sh
Complile success
```

#####3.1.2 列出编译生成的文件

我们把libopensource.so.1.0相应3个文件放在"./opensource_v1"目录，把libopensource.so.2.0相应3个文件放在"./opensource_v2"目录：

![图2](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/2.png "图2")

#####3.1.3 用readelf查看编译生成的main，libvendor1.so，libvendor2.so

我们仅仅关注"NEEDED"，"RPATH"项。

"NEEDED"表示依赖的库。

"RPATH"表示查找依赖库会从这些列出的路径查找(另外有个环境变量LD_LIBARARY_PATH也是类似的作用)。

更多细节所请自行Google。

```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0xde8 contains 28 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
  0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
  0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000f (RPATH)              Library rpath: [./]
```

```
[root@node1 0004]# readelf -d libvendor1.so

Dynamic section at offset 0xde8 contains 27 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000e (SONAME)             Library soname: [libvendor1.so]
  0x000000000000000f (RPATH)              Library rpath: [./opensource_v1]
```

```
[root@node1 0004]# readelf -d libvendor2.so

Dynamic section at offset 0xde8 contains 27 entries:
 Tag        Type                         Name/Value
 0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.2]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000000e (SONAME)             Library soname: [libvendor2.so]
 0x000000000000000f (RPATH)              Library rpath: [./opensource_v2]
```

#####3.1.4 用nm|grep opensource_print查看编译生成的libvendor1.so和libvendor2.so, 可以看到使用相同符号"opensource_print" 
```
[root@node1 0004]# nm libvendor1.so |grep opensource_print
                 U opensource_print
```

```
[root@node1 0004]# nm libvendor2.so |grep opensource_print
                 U opensource_print
```

#####3.1.5 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对默认加载动态库的情况)
```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main general
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```

首先看输出，从结果看，仅仅调用了./opensource_v1/libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.1.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.1.txt)

我们来分析[robin.1.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.1.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；71行到81行，./opensource_v2/libopensource.so.2被找到：
```
58       3774: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59       3774: find library=libopensource.so.1 [0]; searching
60       3774:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61       3774:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62       3774:   trying file=./opensource_v1/tls/libopensource.so.1
63       3774:   trying file=./opensource_v1/x86_64/libopensource.so.1
64       3774:   trying file=./opensource_v1/libopensource.so.1
65       3774:
66       3774: file=libopensource.so.1 [0];  generating link map
67       3774:   dynamic: 0x00007f940ce07e08  base: 0x00007f940cc07000   size: 0x0000000000201038
68       3774:     entry: 0x00007f940cc07600  phdr: 0x00007f940cc07040  phnum:                  7
69       3774:
70       3774:
71       3774: file=libopensource.so.2 [0];  needed by ./libvendor2.so [0]
72       3774: find library=libopensource.so.2 [0]; searching
73       3774:  search path=./opensource_v2/tls/x86_64:./opensource_v2/tls:./opensource_v2/x86_64:./opensource_v2      (RPATH from file ./libvendor2.so)
74       3774:   trying file=./opensource_v2/tls/x86_64/libopensource.so.2
75       3774:   trying file=./opensource_v2/tls/libopensource.so.2
76       3774:   trying file=./opensource_v2/x86_64/libopensource.so.2
77       3774:   trying file=./opensource_v2/libopensource.so.2
78       3774:
79       3774: file=libopensource.so.2 [0];  generating link map
80       3774:   dynamic: 0x00007f940cc05e08  base: 0x00007f940ca05000   size: 0x0000000000201038
81       3774:     entry: 0x00007f940ca05600  phdr: 0x00007f940ca05040  phnum:  
```

996行，libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；1013行，libvendor2.so调用的"opensource_print"也被绑定到./opensource_v1/libopensource.so.1：
```
990       3774: symbol=opensource_print;  lookup in file=./main [0]
991       3774: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
992       3774: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
993       3774: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
994       3774: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
995       3774: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
996       3774: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
997       3774: symbol=printf;  lookup in file=./main [0]
998       3774: symbol=printf;  lookup in file=./libvendor1.so [0]
999       3774: symbol=printf;  lookup in file=./libvendor2.so [0]
1000       3774: symbol=printf;  lookup in file=/lib64/libdl.so.2 [0]
1001       3774: symbol=printf;  lookup in file=/lib64/libc.so.6 [0]
1002       3774: binding file ./opensource_v1/libopensource.so.1 [0] to /lib64/libc.so.6 [0]: normal symbol `printf' [GLIBC_2.2.5]
1003       3774: symbol=vendor2;  lookup in file=./main [0]
1004       3774: symbol=vendor2;  lookup in file=./libvendor1.so [0]
1005       3774: symbol=vendor2;  lookup in file=./libvendor2.so [0]
1006       3774: binding file ./main [0] to ./libvendor2.so [0]: normal symbol `vendor2'
1007       3774: symbol=opensource_print;  lookup in file=./main [0]
1008       3774: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1009       3774: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1010       3774: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1011       3774: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1012       3774: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1013       3774: binding file ./libvendor2.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
1014       3774:
```


#####3.1.6 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对使用"dlopen"等API，显式加载共享库的情况)
和3.1.5差不多一样。

```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main dlopen
----------------------dlopen----------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```

首先看输出，从结果看，仅仅调用了./opensource_v1/libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.2.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.2.txt)

我们来分析[robin.2.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.2.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；71行到81行，./opensource_v2/libopensource.so.2被找到：
```
58      22438: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59      22438: find library=libopensource.so.1 [0]; searching
60      22438:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61      22438:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62      22438:   trying file=./opensource_v1/tls/libopensource.so.1
63      22438:   trying file=./opensource_v1/x86_64/libopensource.so.1
64      22438:   trying file=./opensource_v1/libopensource.so.1
65      22438:
66      22438: file=libopensource.so.1 [0];  generating link map
67      22438:   dynamic: 0x00007f41a353de08  base: 0x00007f41a333d000   size: 0x0000000000201038
68      22438:     entry: 0x00007f41a333d600  phdr: 0x00007f41a333d040  phnum:                  7
69      22438:
70      22438:
71      22438: file=libopensource.so.2 [0];  needed by ./libvendor2.so [0]
72      22438: find library=libopensource.so.2 [0]; searching
73      22438:  search path=./opensource_v2/tls/x86_64:./opensource_v2/tls:./opensource_v2/x86_64:./opensource_v2      (RPATH from file ./libvendor2.so)
74      22438:   trying file=./opensource_v2/tls/x86_64/libopensource.so.2
75      22438:   trying file=./opensource_v2/tls/libopensource.so.2
76      22438:   trying file=./opensource_v2/x86_64/libopensource.so.2
77      22438:   trying file=./opensource_v2/libopensource.so.2
78      22438:
79      22438: file=libopensource.so.2 [0];  generating link map
80      22438:   dynamic: 0x00007f41a333be08  base: 0x00007f41a313b000   size: 0x0000000000201038
81      22438:     entry: 0x00007f41a313b600  phdr: 0x00007f41a313b040  phnum:                  7
```

1033行，libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；1072行，libvendor2.so调用的"opensource_print"也被绑定到./opensource_v1/libopensource.so.1：
```
1027      22438: symbol=opensource_print;  lookup in file=./main [0]
1028      22438: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1029      22438: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1030      22438: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1031      22438: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1032      22438: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1033      22438: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```
```
1066      22438: symbol=opensource_print;  lookup in file=./main [0]
1067      22438: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1068      22438: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1069      22438: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1070      22438: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1071      22438: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1072      22438: binding file ./libvendor2.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```

####3.1.7 推测结论

**!!!!!!猜测: 根据3.1.5和3.1.6，虽然./opensource_v1/libopensource.so.1和./opensource_v2/libopensource.so.2都被查找到，但是./opensource_v1/libopensource.so.1的位置靠前，所以符号"opensource_print"先在./opensource_v1/libopensource.so.1中被查找到，并绑定；一旦查找到一个，就不再查找。**

**!!!!!!我们是有证据支持这个猜测的。**

编辑[different_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_without_default_symver.sh)，仅仅改变"-lvendor2","-lvendor1"的顺序，让"-lvendor2"靠前，如下：
```
#main.c
#gcc -Wl,-rpath=./ -o main  main.c -L. -lvendor1 -lvendor2 -ldl
gcc -Wl,-rpath=./ -o main  main.c -L. -lvendor2 -lvendor1 -ldl
```

重新编译：
```
[root@node1 0004]# sh different_soname_without_default_symver.sh
Complile success
```

重新查看"readelf -d main", 和之前的3.1.3比较，看到"libverndor2.so"位置被提前了：
```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0xde8 contains 28 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
   0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
   0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000f (RPATH)              Library rpath: [./]
```

运行程序，./opensource_v2/libopensource.so.2里的"opensource_print"被绑定了(此处，略去LD_DEBUG步骤，有兴趣可以自己试)：
```
[root@node1 0004]# ./main general
-----------------------general--------------------
opensource v2 print, called by vendor 1
opensource v2 print, called by vendor 2
```

**!!!!!!推论的延伸: 如果不使用libopensource.so.2这样和libopensource.so.1混淆的名字，而是使用一个其他的名字(例如librobin.so.2)，和本次测试是一样的结果(此处不在给出测试结果）。可以用[different_soname_without_default_symver_2.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_without_default_symver_2.sh) 来编译做实验**



####3.2 符号表带版本信息的
编译时指定"-Wl,--default-symver"，那么编译出的符号是带版本信息的。

#####3.2.1 我们用[different_soname_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/different_soname_with_default_symver.sh) 来编译

```
[root@node1 0004]# sh different_soname_with_default_symver.sh
Complile success
```

#####3.2.2 列出编译生成的文件
略，和3.1.2一样.

#####3.2.3 用readelf查看编译生成的main，libvendor1.so，libvendor2.so

可以看出和3.1.3是一样的。

```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0x1de8 contains 28 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
  0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
  0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000f (RPATH)              Library rpath: [./]
```

```
[root@node1 0004]# readelf -d libvendor1.so

Dynamic section at offset 0xdc8 contains 29 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000e (SONAME)             Library soname: [libvendor1.so]
   0x000000000000000f (RPATH)              Library rpath: [./opensource_v1]
```

```
[root@node1 0004]# readelf -d libvendor2.so

Dynamic section at offset 0xdc8 contains 29 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.2]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000e (SONAME)             Library soname: [libvendor2.so]
   0x000000000000000f (RPATH)              Library rpath: [./opensource_v2]
```

#####3.2.4 用nm|grep opensource_print查看编译生成的libvendor1.so和libvendor2.so, 可以看到不同的符号"opensource_print@@libopensource.so.1"和opensource_print@@libopensource.so.2

```
[root@node1 0004]# nm libvendor1.so  |grep opensource_print
                 U opensource_print@@libopensource.so.1
```
```
[root@node1 0004]# nm libvendor2.so  |grep opensource_print
                 U opensource_print@@libopensource.so.2
```

#####3.2.5 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对默认加载动态库的情况)
```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main general
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v2 print, called by vendor 2
```

首先看输出，从结果看，libvendor1.so调用了./opensource_v1/libopensource.so.1里的"opensource_print"(opensource_v1.c)；libvendor2.so调用了./opensource_v2/libopensource.so.2里的"opensource_print"(opensource_v2.c)。

完整的LD_DEBUG输出在[robin.3.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.3.txt)

我们来分析[robin.3.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.3.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；71行到81行，./opensource_v2/libopensource.so.2被查找到：
```
58        409: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59        409: find library=libopensource.so.1 [0]; searching
60        409:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61        409:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62        409:   trying file=./opensource_v1/tls/libopensource.so.1
63        409:   trying file=./opensource_v1/x86_64/libopensource.so.1
64        409:   trying file=./opensource_v1/libopensource.so.1
65        409:
66        409: file=libopensource.so.1 [0];  generating link map
67        409:   dynamic: 0x00007ffa01a9ade8  base: 0x00007ffa0189a000   size: 0x0000000000201038
68        409:     entry: 0x00007ffa0189a640  phdr: 0x00007ffa0189a040  phnum:                  7
69        409:
70        409:
71        409: file=libopensource.so.2 [0];  needed by ./libvendor2.so [0]
72        409: find library=libopensource.so.2 [0]; searching
73        409:  search path=./opensource_v2/tls/x86_64:./opensource_v2/tls:./opensource_v2/x86_64:./opensource_v2      (RPATH from file ./libvendor2.so)
74        409:   trying file=./opensource_v2/tls/x86_64/libopensource.so.2
75        409:   trying file=./opensource_v2/tls/libopensource.so.2
76        409:   trying file=./opensource_v2/x86_64/libopensource.so.2
77        409:   trying file=./opensource_v2/libopensource.so.2
78        409:
79        409: file=libopensource.so.2 [0];  generating link map
80        409:   dynamic: 0x00007ffa01898de8  base: 0x00007ffa01698000   size: 0x0000000000201038
81        409:     entry: 0x00007ffa01698640  phdr: 0x00007ffa01698040  phnum:                  7
```

1000行，可以看到libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；1018行，libvendor2.so调用的"opensource_print"被绑定到./opensource_v2/libopensource.so.2上:
```
994        409: symbol=opensource_print;  lookup in file=./main [0]
995        409: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
996        409: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
997        409: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
998        409: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
999        409: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1000        409: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print' [libopensource.so.1]
1001        409: symbol=printf;  lookup in file=./main [0]
1002        409: symbol=printf;  lookup in file=./libvendor1.so [0]
1003        409: symbol=printf;  lookup in file=./libvendor2.so [0]
1004        409: symbol=printf;  lookup in file=/lib64/libdl.so.2 [0]
1005        409: symbol=printf;  lookup in file=/lib64/libc.so.6 [0]
1006        409: binding file ./opensource_v1/libopensource.so.1 [0] to /lib64/libc.so.6 [0]: normal symbol `printf' [GLIBC_2.2.5]
1007        409: symbol=vendor2;  lookup in file=./main [0]
1008        409: symbol=vendor2;  lookup in file=./libvendor1.so [0]
1009        409: symbol=vendor2;  lookup in file=./libvendor2.so [0]
1010        409: binding file ./main [0] to ./libvendor2.so [0]: normal symbol `vendor2' [libvendor2.so]
1011        409: symbol=opensource_print;  lookup in file=./main [0]
1012        409: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1013        409: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1014        409: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1015        409: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1016        409: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1017        409: symbol=opensource_print;  lookup in file=./opensource_v2/libopensource.so.2 [0]
1018        409: binding file ./libvendor2.so [0] to ./opensource_v2/libopensource.so.2 [0]: normal symbol `opensource_print' [libopensource.so.2]
```

#####3.2.6 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对使用"dlopen"等API，显式加载共享库的情况)
和3.2.5差不多一样。

```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main dlopen
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v2 print, called by vendor 2
```

首先看输出，从结果看，libvendor1.so调用了./opensource_v1/libopensource.so.1里的"opensource_print"(opensource_v1.c)；libvendor2.so调用了./opensource_v2/libopensource.so.2里的"opensource_print"(opensource_v2.c)。

完整的LD_DEBUG输出在[robin.4.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.4.txt)

我们来分析[robin.4.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.4.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；71行到81行，./opensource_v2/libopensource.so.2被查找到：
```
58        409: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59        409: find library=libopensource.so.1 [0]; searching
60        409:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61        409:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62        409:   trying file=./opensource_v1/tls/libopensource.so.1
63        409:   trying file=./opensource_v1/x86_64/libopensource.so.1
64        409:   trying file=./opensource_v1/libopensource.so.1
65        409:
66        409: file=libopensource.so.1 [0];  generating link map
67        409:   dynamic: 0x00007ffa01a9ade8  base: 0x00007ffa0189a000   size: 0x0000000000201038
68        409:     entry: 0x00007ffa0189a640  phdr: 0x00007ffa0189a040  phnum:                  7
69        409:
70        409:
71        409: file=libopensource.so.2 [0];  needed by ./libvendor2.so [0]
72        409: find library=libopensource.so.2 [0]; searching
73        409:  search path=./opensource_v2/tls/x86_64:./opensource_v2/tls:./opensource_v2/x86_64:./opensource_v2      (RPATH from file ./libvendor2.so)
74        409:   trying file=./opensource_v2/tls/x86_64/libopensource.so.2
75        409:   trying file=./opensource_v2/tls/libopensource.so.2
76        409:   trying file=./opensource_v2/x86_64/libopensource.so.2
77        409:   trying file=./opensource_v2/libopensource.so.2
78        409:
79        409: file=libopensource.so.2 [0];  generating link map
80        409:   dynamic: 0x00007ffa01898de8  base: 0x00007ffa01698000   size: 0x0000000000201038
81        409:     entry: 0x00007ffa01698640  phdr: 0x00007ffa01698040  phnum:                  7
```

1037行，可以看到libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；1077行，libvendor2.so调用的"opensource_print"被绑定到./opensource_v2/libopensource.so.2上:
```
1031      24314: symbol=opensource_print;  lookup in file=./main [0]
1032      24314: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1033      24314: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1034      24314: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1035      24314: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1036      24314: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1037      24314: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print' [libopensource.so.1]
```
```
1070      24314: symbol=opensource_print;  lookup in file=./main [0]
1071      24314: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
1072      24314: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
1073      24314: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
1074      24314: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
1075      24314: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
1076      24314: symbol=opensource_print;  lookup in file=./opensource_v2/libopensource.so.2 [0]
1077      24314: binding file ./libvendor2.so [0] to ./opensource_v2/libopensource.so.2 [0]: normal symbol `opensource_print' [libopensource.so.2]
```

####3.2.7 推测结论
**猜测：对比3.2.4和3.1.4 "nm"输出，可以看到当编译时设定""-Wl,--default-symver"，那么编译出的符号是有版本信息的，"opensource_print@@libopensource.so.1" 和 "opensource_print@@libopensource.so.2" 是能找到其对应的正确的共享库的。**


##4. libopensource.so.xxx的版本相同，系统如何查找依赖库和绑定符号

在这个实验里我们编译opensource_v1.c生成./opensource_v1/libopensource.so.1.0；编译opensource_v2.c生成./opensource_v2/libopensource.so.1.0。

libvendor1.so将依赖./opensource_v1/libopensource.so.1.0； libvendor2.so将依赖./opensource_v2/libopensource.so.1.0。

###4.1 符号表不带版本信息的
gcc编译的符号，默认是不带版本信息的。

#####4.1.1 我们用[same_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/same_soname_without_default_symver.sh) 来编译。

```
[root@node1 0004]# sh same_soname_without_default_symver.sh
Complile success
```

#####4.1.2 列出编译生成的文件

libvendor1.so使用的libopensource.so.1.0相应3个文件放在"./opensource_v1"目录;

libvendor2.so使用的libopensource.so.1.0相应3个文件放在"./opensource_v2"目录;

![图3](https://raw.githubusercontent.com/lzueclipse/learning/master/c_cpp/0004/3.png "图3")

#####4.1.3 用readelf查看编译生成的main，libvendor1.so，libvendor2.so
```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0xde8 contains 28 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
  0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
  0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000f (RPATH)              Library rpath: [./]
```

```
[root@node1 0004]# readelf -d libvendor1.so

Dynamic section at offset 0xde8 contains 27 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000e (SONAME)             Library soname: [libvendor1.so]
  0x000000000000000f (RPATH)              Library rpath: [./opensource_v1]
```

```
[root@node1 0004]# readelf -d libvendor2.so

Dynamic section at offset 0xde8 contains 27 entries:
 Tag        Type                         Name/Value
 0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000000e (SONAME)             Library soname: [libvendor2.so]
 0x000000000000000f (RPATH)              Library rpath: [./opensource_v2]
```

#####4.1.4 用nm|grep opensource_print查看编译生成的libvendor1.so和libvendor2.so, 可以看到使用相同符号"opensource_print" 
```
[root@node1 0004]# nm libvendor1.so |grep opensource_print
                 U opensource_print
```

```
[root@node1 0004]# nm libvendor2.so |grep opensource_print
                 U opensource_print
```

#####4.1.5 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对默认加载动态库的情况)
```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main general
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```

首先看输出，从结果看，仅仅调用了./opensource_v1/libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.5.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.5.txt)

我们来分析[robin.5.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.5.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；./opensource_v2/libopensource.so.1却**没有被查找**：
```
58      24862: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59      24862: find library=libopensource.so.1 [0]; searching
60      24862:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61      24862:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62      24862:   trying file=./opensource_v1/tls/libopensource.so.1
63      24862:   trying file=./opensource_v1/x86_64/libopensource.so.1
64      24862:   trying file=./opensource_v1/libopensource.so.1
65      24862:
66      24862: file=libopensource.so.1 [0];  generating link map
67      24862:   dynamic: 0x00007fda2f686e08  base: 0x00007fda2f486000   size: 0x0000000000201038
68      24862:     entry: 0x00007fda2f486600  phdr: 0x00007fda2f486040  phnum:                  7
```

905行,libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；922行，libvendor2.so调用的"opensource_print"也被绑定到./opensource_v1/libopensource.so.1：
```
899      24862: symbol=opensource_print;  lookup in file=./main [0]
900      24862: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
901      24862: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
902      24862: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
903      24862: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
904      24862: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
905      24862: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
906      24862: symbol=printf;  lookup in file=./main [0]
907      24862: symbol=printf;  lookup in file=./libvendor1.so [0]
908      24862: symbol=printf;  lookup in file=./libvendor2.so [0]
909      24862: symbol=printf;  lookup in file=/lib64/libdl.so.2 [0]
910      24862: symbol=printf;  lookup in file=/lib64/libc.so.6 [0]
911      24862: binding file ./opensource_v1/libopensource.so.1 [0] to /lib64/libc.so.6 [0]: normal symbol `printf' [GLIBC_2.2.5]
912      24862: symbol=vendor2;  lookup in file=./main [0]
913      24862: symbol=vendor2;  lookup in file=./libvendor1.so [0]
914      24862: symbol=vendor2;  lookup in file=./libvendor2.so [0]
915      24862: binding file ./main [0] to ./libvendor2.so [0]: normal symbol `vendor2'
916      24862: symbol=opensource_print;  lookup in file=./main [0]
917      24862: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
918      24862: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
919      24862: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
920      24862: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
921      24862: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
922      24862: binding file ./libvendor2.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```


#####4.1.6 用LD_DEBUG 来debug 依赖库和符号绑定的过程(针对使用"dlopen"等API，显式加载共享库的情况)
和4.1.5差不多一样。

```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main dlopen
----------------------dlopen----------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```

首先看输出，从结果看，仅仅调用了./opensoure_v1/libopensource.so.1(opensource_v1.c)里的"opensource_print函数"。

完整的LD_DEBUG输出在[robin.6.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.6.txt)

我们来分析[robin.6.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.6.txt)输出：

58行到68行，./opensource_v1/libopensource.so.1被查找到；./opensource_v2/libopensource.so.1**没有被查找**：
```
58      25068: file=libopensource.so.1 [0];  needed by ./libvendor1.so [0]
59      25068: find library=libopensource.so.1 [0]; searching
60      25068:  search path=./opensource_v1/tls/x86_64:./opensource_v1/tls:./opensource_v1/x86_64:./opensource_v1      (RPATH from file ./libvendor1.so)
61      25068:   trying file=./opensource_v1/tls/x86_64/libopensource.so.1
62      25068:   trying file=./opensource_v1/tls/libopensource.so.1
63      25068:   trying file=./opensource_v1/x86_64/libopensource.so.1
64      25068:   trying file=./opensource_v1/libopensource.so.1
65      25068:
66      25068: file=libopensource.so.1 [0];  generating link map
67      25068:   dynamic: 0x00007fcc7608ce08  base: 0x00007fcc75e8c000   size: 0x0000000000201038
68      25068:     entry: 0x00007fcc75e8c600  phdr: 0x00007fcc75e8c040  phnum:                  7
```

942行，libvendor1.so调用的"opensource_print"被绑定到./opensource_v1/libopensource.so.1上；981行，libvendor2.so调用的"opensource_print"也被绑定到./opensource_v1/libopensource.so.1：
```
936      25068: symbol=opensource_print;  lookup in file=./main [0]
937      25068: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
938      25068: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
939      25068: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
940      25068: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
941      25068: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
942      25068: binding file ./libvendor1.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```
```
975      25068: symbol=opensource_print;  lookup in file=./main [0]
976      25068: symbol=opensource_print;  lookup in file=./libvendor1.so [0]
977      25068: symbol=opensource_print;  lookup in file=./libvendor2.so [0]
978      25068: symbol=opensource_print;  lookup in file=/lib64/libdl.so.2 [0]
979      25068: symbol=opensource_print;  lookup in file=/lib64/libc.so.6 [0]
980      25068: symbol=opensource_print;  lookup in file=./opensource_v1/libopensource.so.1 [0]
981      25068: binding file ./libvendor2.so [0] to ./opensource_v1/libopensource.so.1 [0]: normal symbol `opensource_print'
```

####4.1.7 推测结论

**猜测: 根据4.1.5和4.1.6，只有./opensource_v1/libopensource.so.1被查找，所以只有./opensource_v1/libopensource.so.1里的"opensource_print"会被绑定**

**我们是有证据支持这个猜测的。**

编辑[same_soname_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/same_soname_without_default_symver.sh)，仅仅改变"-lvendor2","-lvendor1"的顺序，让"-lvendor2"靠前，如下：
```
#main.c
#gcc -Wl,-rpath=./ -o main  main.c -L. -lvendor1 -lvendor2 -ldl
gcc -Wl,-rpath=./ -o main  main.c -L. -lvendor2 -lvendor1 -ldl
```

重新编译：
```
[root@node1 0004]# sh same_soname_without_default_symver.sh
Complile success
```

重新查看"readelf -d main", 和之前的4.1.3比较，看到"libverndor2.so"位置被提前了：
```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0xde8 contains 28 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
   0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
   0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000f (RPATH)              Library rpath: [./]
```

运行程序，发现./opensource_v2/libopensource.so.1里的"opensource_print"被绑定(此处，略去LD_DEBUG步骤，有兴趣可以自己试)：
```
[root@node1 0004]# ./main general
-----------------------general--------------------
opensource v2 print, called by vendor 1
opensource v2 print, called by vendor 2
```

####4.2 符号表带版本信息的
编译时指定"-Wl,--default-symver"，那么编译出的符号是带版本信息的。

#####4.2.1 我们用[same_soname_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/same_soname_with_default_symver.sh) 来编译

```
[root@node1 0004]# sh same_soname_with_default_symver.sh
Complile success
```

#####4.2.2 列出编译生成的文件
略，和4.1.2一样.

#####4.2.3 用readelf查看编译生成的main，libvendor1.so，libvendor2.so

可以看出和4.1.3是一样的。

```
[root@node1 0004]# readelf -d main

Dynamic section at offset 0x1de8 contains 28 entries:
  Tag        Type                         Name/Value
  0x0000000000000001 (NEEDED)             Shared library: [libvendor1.so]
  0x0000000000000001 (NEEDED)             Shared library: [libvendor2.so]
  0x0000000000000001 (NEEDED)             Shared library: [libdl.so.2]
  0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
  0x000000000000000f (RPATH)              Library rpath: [./]
```

```
[root@node1 0004]# readelf -d libvendor1.so

Dynamic section at offset 0xdc8 contains 29 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000e (SONAME)             Library soname: [libvendor1.so]
   0x000000000000000f (RPATH)              Library rpath: [./opensource_v1]
```

```
[root@node1 0004]# readelf -d libvendor2.so

Dynamic section at offset 0xdc8 contains 29 entries:
  Tag        Type                         Name/Value
   0x0000000000000001 (NEEDED)             Shared library: [libopensource.so.1]
   0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   0x000000000000000e (SONAME)             Library soname: [libvendor2.so]
   0x000000000000000f (RPATH)              Library rpath: [./opensource_v2]
```

#####4.2.4 用nm|grep opensource_print查看编译生成的libvendor1.so和libvendor2.so, 可以看到相同的符号"opensource_print@@libopensource.so.1"

```
[root@node1 0004]# nm libvendor1.so  |grep opensource_print
                 U opensource_print@@libopensource.so.1
```
```
[root@node1 0004]# nm libvendor2.so  |grep opensource_print
                 U opensource_print@@libopensource.so.1
```

**libvendor1.so和libvendor2.so使用了相同版本的libopensource.so.1，并且使用了相同的符号opensource_print@@libopensource.so.1，所以实验4.2和4.1是等价的实验，没必要再做下去了。 不过我还是列出了后续实验的LD_DEBUG的输出，供参考。**

```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main general
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```
对应的完整的LD_DEBUG输出为[robin.7.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.7.txt)

```
[root@node1 0004]# LD_DEBUG_OUTPUT=robin.txt LD_DEBUG=all ./main dlopen
-----------------------general--------------------
opensource v1 print, called by vendor 1
opensource v1 print, called by vendor 2
```
对应的完整的LD_DEBUG输出为[robin.8.txt](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/robin.8.txt)

##5. 结论
1)对于不同版本的libopensource.so.xxx共享库，两个版本的共享库都会被查找到，但有先后顺序；最终绑定的"opensource_print"符号，是在先被查找到的共享库里的。

这个情况延伸开来，如果其他完全不相干的共享库里有同名符号"opensource_print"，那么到底绑定哪个"opensource_print"，也是和共享库被查找到顺序有关。

这个问题可以通过编译时指定"-Wl,--default-symver"来解决。

2)对于相同版本的lbopensource.so.xxx共享库，只有其中的一个会被查找，只有这个被查找到的共享库里的符号被绑定。

遇到这样的问题时，尝试下LD_PRELOAD，但不一定能完全解决问题。

##6. 参考文献
>\[1] 一篇blog，<https://blog.habets.se/2012/05/Shared-libraries-diamond-problem>

>\[2] Google

