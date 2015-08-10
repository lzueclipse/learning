#Storage Provisioning with Ceph

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0004/1.png "图1")

Ceph支持Object存储（兼容S3和Swift），块存储（RBD），文件存储（CephFS）。

##1. The RADOS Block Device （RBD，块存储）

提供块设备，通过librbd 把数据分散到多个OSD上。

支持thin provisioning，dynamic resizable，snapshots，copy-on-write，caching等。



