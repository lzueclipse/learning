#Storage Provisioning with Ceph

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0004/1.png "图1")

Ceph支持Object存储（兼容S3和Swift），块存储（RBD），文件存储（CephFS）。

##1. The RADOS Block Device （RBD，块存储）

提供块设备，通过librbd 把数据分散到多个OSD上。

支持thin provisioning，dynamic resizable，snapshots，copy-on-write，caching等。

RBD协议在Linux mainline kernel中，这是一大优势，要知道想往Linux mainline里合并代码，要求是非常苛刻的。

在以下实验中，我们将使用node4作为RBD client，来访问在Ceph cluster server(node1, node2, node3)端创建的RBD块设备。

###1.1 在node1上创建RBD

创建rbd1-for-node4, 大小是10240MB
```
[root@node1 ~]# rbd create rbd1-for-node4 --size 10240
```

查看RBD:
```
[root@node1 ~]# rbd ls
rbd1-for-node4
```

###1.2

###1.3

###参考文献:

>\[1] Learning Ceph, <http://pan.baidu.com/s/1kTEK70j>

>\[2] Ceph Essentials, <http://pan.baidu.com/s/1sj3EmJV>


