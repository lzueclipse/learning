# C/C++ notes

##1. 分享一个我的案例
Linux下，STL map存储大量小块(small chunk)数据，map析构后，内存不返还给操作系统，导致内存暴增。
该问题的本质是glibc malloc分配大量小块数据，free后，内存不返还给操作系统。

具体链接：

[Linux下，STL map析构后，内存不返还给给操作系统](./0001/)

