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

1)如果libopensource.so的版本不相同，是否两个版本的libopensource.so都会被加载？还是只有某一个版本的被加载？那么符号绑定（binding）绑定的是哪个版本的？

2）如果libopensource.so的版本相同，是否两个相同版本的libopensource.so都会被加载？还是只挑选其中一个被加载？符号绑定的是哪个版本的？

如果这几个问题您没有答案，建议您跟随我的实验，我们一起探讨下。

因为我个人没看过连接器和加载器的源码，估计也不好看懂，所以我们的探讨集中在我们看到的证据上，并试图给出一些粗浅的结论。

##2.相关代码
具体代码在github中。

C源代码：

"[main.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/main.c)"

"[vendor1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor1.c)"

"[vendor2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/vendor2.c)"

"[opensource_v1.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v1.c)"

"[opensource_v2.c](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/opensource_v2.c)"

用于控制编译的Shell脚本（4个实验，每个使用一个脚本，为了便于说清）:

"[force_soname_to_different_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_without_default_symver.sh)"  

"[force_soname_to_different_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_different_with_default_symver.sh)"

"[force_soname_to_same_without_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_same_without_default_symver.sh)"

"[force_soname_to_same_with_default_symver.sh](https://github.com/lzueclipse/learning/blob/master/c_cpp/0004/force_soname_to_same_with_default_symver.sh)"


##3.情形一，生成libopensource.so的版本

##4.

##5. 参考文献
>\[1] 一篇blog，<https://blog.habets.se/2012/05/Shared-libraries-diamond-problem>

>\[2] Google， <www.google.com>

























