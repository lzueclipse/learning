#Ceph Architecture/Ceph Components/Ceph internals/Ceph essentials

#本章会先粗略构建一个big picture，然后后续章节会展开详细介绍

##1. Ceph主要模块

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/1.png "图1")

如图1所示，Ceph主要模块图。

###1.1. RADOS
全称是Reliable Automatic Distributed Object Store，是Ceph的基础。

在底层，Ceph是以object来存储的。

RADOS负责数据的可靠性和一致性(错误发现，错误恢复，data replication)。
当Ceph cluster收到一个write request，CRUSH（Controlled Replication Under Scalable Hash）算法计算出
将要写入的OSD位置，RADOS会收到这个位置信息，并根据系统配置的CRUSH rulset进行replication。

LIBRADOS对外提供了访问RADOS的接口。

相关命令：

```
[root@node1 ~]# rados lspools
rbd
```

```
[root@node1 ~]# rados -p rbd ls
```

```
[root@node1 ~]# rados df
pool name                 KB      objects       clones     degraded      unfound           rd        rd KB           wr        wr KB
rbd                        0            0            0            0           0            0            0            0            0
  total used          324084            0
  total avail      141132120
  total space      141456204
```

###1.2. OSD

![图2](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/2.png "图2")

全称是Object Storage Device，是真正存放数据的。

一般一个物理硬盘，会绑定一个OSD daemon。

对于每一个object，有一个primary copy，和几个secondary copy。
每一个OSD是某些object的primary OSD，同时又是其他某些object的secondary OSD；
对于某一个object，当它的primary OSD挂掉后，其secondary OSD是需要提升为primary OSD的。

从Ceph Firefly release(0.80)，除了replication，还支持Erasure coding（纠删码）。

###1.3. MON

Monitor，主要维护系统运行所需的一些状态信息，包括：

OSD map，MON map， PG map，CRUSH Map。 

###1.4. RBD

全称是RADOS block device。

提供块存储，支持thin provisioning和snapshots。

###1.5. RGW

全称是RADOS Gateway，提供对象存储。

其RESTFUL API接口，兼容Amazon S3和OpenStack Swift，

###1.6. Ceph FS

Ceph File System。

提供兼容POSIX的分布式文件系统

###1.7. MDS

全称Metadata Server。

用于存储Ceph FS中的元数据。


