#Deply Ceph with ceph-deploy tool

###1. 准备虚拟机

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0001/1.png "图1")

如图1所示，用Vmware/VirtualBox 创建1台虚拟机，每台虚拟机4个CPU， 8GB内存，双网卡，4块硬盘。

####1.1 安装CentOS 7
注意在第一块硬盘安装CentOS（/dev/sda）。
简单，略去

####1.2 检查fdisk -l输出
```
Disk /dev/sdc: 21.5 GB, 21474836480 bytes, 41943040 sectors
...

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
...
   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    52430847    26214400   83  Linux
/dev/sda2        52430848    60819455     4194304   82  Linux swap / Solaris

Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
...

Disk /dev/sdd: 21.5 GB, 21474836480 bytes, 41943040 sectors
...
```
可以看出，该CentOS 有4块硬盘，CentOS安装在/dev/sda1，另外的sdb,sdc,sdd我们将用于Ceph OSD。


####1. Clone出另外5台虚拟机，并配置IP地址，host name
简单，略去

###2. 
