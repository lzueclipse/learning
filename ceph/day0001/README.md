#Deply Ceph with ceph-deploy tool

###1. 准备虚拟机

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0001/1.png "图1")

如图1所示，用Vmware/VirtualBox 创建1台虚拟机，每台虚拟机4个CPU， 8GB内存，双网卡，4块硬盘。

####1.1 安装CentOS 7
注意在第一块硬盘安装CentOS（/dev/sda）。
简单，略去

####1.2 检查fdisk -l输出
`
Disk /dev/sdc: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000cb598

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    52430847    26214400   83  Linux
/dev/sda2        52430848    60819455     4194304   82  Linux swap / Solaris

Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/sdd: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
`


####1. Clone出另外5台虚拟机，并配置IP地址，host name
简单，略去

###2. 
