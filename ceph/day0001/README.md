#Deply Ceph with ceph-deploy tool

###1. 准备虚拟机

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0001/1.png "图1")

如图1所示，用Vmware/VirtualBox 创建1台虚拟机，每台虚拟机4个CPU， 8GB内存，双网卡，4块硬盘。

####1.1 安装CentOS 7
注意在第一块硬盘安装CentOS（/dev/sda）。
简单，略去

####1.2 检查fdisk -l输出
```

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
...
   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    52430847    26214400   83  Linux
/dev/sda2        52430848    60819455     4194304   82  Linux swap / Solaris

Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
...

Disk /dev/sdc: 21.5 GB, 21474836480 bytes, 41943040 sectors
...

Disk /dev/sdd: 21.5 GB, 21474836480 bytes, 41943040 sectors
...
```
可以看出，该CentOS 有4块硬盘，CentOS安装在/dev/sda1，另外的sdb,sdc,sdd我们将用于Ceph OSD。


####1.3 检查hostname, cat /etc/hostname

```
node1
```

####1.4 检查两块网卡IP配置
cat /etc/sysconfig/network-scripts/ifcfg-ens192

```
TYPE="Ethernet"
BOOTPROTO="none"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
NAME="eth0"
UUID="f8b3e56b-074d-4a0b-a98c-213a83823f4a"
DEVICE="ens192"
ONBOOT="yes"
IPADDR="10.200.29.191"
PREFIX="24"
GATEWAY="10.200.29.254"
DNS1="143.127.251.16"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"
```

cat /etc/sysconfig/network-scripts/ifcfg-ens224

```
TYPE=Ethernet
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
NAME=eth2
UUID=7e3b2f64-1cc5-461d-a2f6-2e4eb9f08c2d
DEVICE=ens224
ONBOOT=yes
IPADDR=192.168.29.191
PREFIX=24
GATEWAY=192.168.29.254
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_PRIVACY=no
```

####1.5 Clone出另外5台虚拟机，并配置IP地址，host name
简单，略去
所以最终，6台虚拟机如下：
| hostname | cpu   | memory | eth0 IP      |eth1 IP      |
|----------|-------|--------|--------------|-------------|
| node1    | 4 core| 8GB    |10.200.29.191 |10.200.29.192|

###2. 
