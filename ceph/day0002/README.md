#Ceph Architecture/Ceph Components/Ceph internals/Ceph essentials

##1. Ceph主要模块

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/1.png "图1")

如图1所示，Ceph主要模块图。

###1.1. RADOS
全称是Reliable Automatic Distributed Object Store，是Ceph的基础。

在底层，Ceph是以object来存储的。

RADOS负责数据的可靠性和一致性(错误发现，错误恢复，data replication)。

LIBRADOS对外提供了访问RADOS的接口。

###1.2. OSD

![图2](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/2.png "图2")

全称是Object Storage Device，是真正存放数据的。

一般一个物理硬盘，会绑定一个OSD daemon。

###1.3. MON

Monitor，主要维护系统运行所需的一些状态信息，包括：

OSD map，MON map， PG map，CRUSH Map。 

###1.3. librados

###1.4. Ceph Gateway

###1.5. RBD

###1.6. Ceph FS

###1.7. 
