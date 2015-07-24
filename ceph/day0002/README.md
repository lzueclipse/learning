#Ceph Architecture/Ceph Components/Ceph internals/Ceph essentials

##本章会先粗略构建一个big picture，然后后续章节会展开详细介绍

##1. Ceph架构以及主要模块

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/1.png "图1")

如图1所示，Ceph主要模块图。

##2. RADOS
全称是Reliable Automatic Distributed Object Store，是Ceph的基础。

在底层，Ceph是以object来存储的。

RADOS负责数据的可靠性和一致性(错误发现，错误恢复，data replication)。
当Ceph cluster收到一个write request，CRUSH（Controlled Replication Under Scalable Hash）算法计算出
将要写入的OSD位置，RADOS会收到这个位置信息，并根据系统配置的CRUSH rulset进行replication。


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

###2.1. OSD

![图2](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/2.png "图2")

全称是Object Storage Device，是真正存放数据的。

一般一个物理硬盘，会绑定一个OSD daemon。

对于每一个object，有一个primary copy，和几个secondary copy。
每一个OSD是某些object的primary OSD，同时又是其他某些object的secondary OSD；
对于某一个object，当它的primary OSD挂掉后，其secondary OSD是需要提升为primary OSD的。

从Ceph Firefly release(0.80)，除了replication，还支持Erasure coding（纠删码）。

#####2.1.1. OSD选用的文件系统

OSD daemon要求文件系统支持扩展属性(XATTRS)，这些扩展属性被用来存储object state, snapshot, metadata, ACL等内部信息。

目前官方推荐使用XFS。
Ext4的XATTRS过小，Btrfs不建议用在生产环境。

#####2.1.2. OSD journal

![图3](https://github.com/lzueclipse/learning/blob/master/ceph/day0002/3.png "图3")


Ceph先写Journal，后写数据。

建议Jouranl用SSD，以提高效率。

#####2.1.3 OSD commands

```
[root@node1 ~]# service ceph status osd
=== osd.0 ===
osd.0: running {"version":"0.94.2"}
=== osd.1 ===
osd.1: running {"version":"0.94.2"}
=== osd.2 ===
osd.2: running {"version":"0.94.2"}
```
```
[root@node1 ~]# ceph osd ls
0
1
2
3
4
5
6
7
8
```
```
[root@node1 ~]# ceph osd stat
     osdmap e68: 9 osds: 9 up, 9 in
```
```
[root@node1 ~]# ceph osd  tree
ID WEIGHT  TYPE NAME      UP/DOWN REWEIGHT PRIMARY-AFFINITY
-1 0.08995 root default
-2 0.02998     host node1
 0 0.00999         osd.0       up  1.00000          1.00000
 1 0.00999         osd.1       up  1.00000          1.00000
 2 0.00999         osd.2       up  1.00000          1.00000
-3 0.02998     host node2
 3 0.00999         osd.3       up  1.00000          1.00000
 4 0.00999         osd.4       up  1.00000          1.00000
 5 0.00999         osd.5       up  1.00000          1.00000
-4 0.02998     host node3
 6 0.00999         osd.6       up  1.00000          1.00000
 7 0.00999         osd.7       up  1.00000          1.00000
 8 0.00999         osd.8       up  1.00000          1.00000
```

###2.2. MON

Monitor，主要维护系统运行所需的一些状态信息，包括：

OSD map，MON map， PG map，CRUSH Map。 

###2.3

LIBRADOS对外提供了访问RADOS的接口。
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


