#Deply Ceph with ceph-deploy tool

###1. 准备虚拟机

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0001/1.png "图1")

如图1所示，用Vmware/VirtualBox 创建1台虚拟机，每台虚拟机4个CPU， 8GB内存，双网卡，4块硬盘。

#####1.1 安装CentOS 7
注意在第一块硬盘安装CentOS（/dev/sda）。
简单，略去

#####1.2 检查fdisk -l输出
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


#####1.3 检查hostname, cat /etc/hostname

```
node1
```

#####1.4 检查两块网卡IP配置
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

#####1.5 Clone出另外5台虚拟机，并配置IP地址，host name
简单，略去
所以最终，6台虚拟机如下：

| hostname   | cpu     | memory   | hard disk       | eth0 IP        | eth1 IP        |
| ---------- | ------- | -------- | --------------- | -------------- | -------------- |
| node1      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.191  | 192.168.29.191 |
| node2      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.192  | 192.168.29.192 |
| node3      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.193  | 192.168.29.193 |
| node4      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.194  | 192.168.29.194 |
| node5      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.195  | 192.168.29.195 |
| node6      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.196  | 192.168.29.196 |

#####1.6 将如下加入所有6台虚拟机的/etc/hosts

```
10.200.29.191 node1
10.200.29.192 node2
10.200.29.193 node3
10.200.29.194 node4
10.200.29.195 node5
10.200.29.196 node6
```

###2.配置ssh, 让node1可以无密码登录node2,node3
1)在node1, ssh-keygen, 当提示输入密码时，不输入密码

2)用ssh-copy-id 将node1的ssh key 拷贝到node2, node3，命令如下：

ssh-copy-id node2

ssh-copy-id node3

此时在node1上测试"ssh node2" 或 "ssh node3"，可以发现可以不用输入账号/密码即可登录。

###3.在node1,node2,node3安装EPEL

在3个节点，node1,node2,node3执行如下命令：

rpm -ivh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm

###4.在node1,node2,node3安装ceph-deploy

在3个节点，node1,node2,node3上安装ceph-deploy,命令为:

yum install ceph-deploy


###4.利用ceph-deploy，在node1,node2,node3三个节点上安装ceph

#####4.1 创建一个cluster,名字叫作ceph;生成初始ceph.conf和ceph.mon.keyring

```
[root@node1 ~]# ceph-deploy new node1
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy new node1
[ceph_deploy.new][DEBUG ] Creating new cluster named ceph
[ceph_deploy.new][INFO  ] making sure passwordless SSH succeeds
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[node1][DEBUG ] find the location of an executable
[node1][INFO  ] Running command: /usr/sbin/ip link show
[node1][INFO  ] Running command: /usr/sbin/ip addr show
[node1][DEBUG ] IP addresses found: ['10.200.29.191', '192.168.29.191']
[ceph_deploy.new][DEBUG ] Resolving host node1
[ceph_deploy.new][DEBUG ] Monitor node1 at 10.200.29.191
[ceph_deploy.new][DEBUG ] Monitor initial members are ['node1']
[ceph_deploy.new][DEBUG ] Monitor addrs are ['10.200.29.191']
[ceph_deploy.new][DEBUG ] Creating a random mon key...
[ceph_deploy.new][DEBUG ] Writing monitor keyring to ceph.mon.keyring...
[ceph_deploy.new][DEBUG ] Writing initial config to ceph.conf...
```

#####4.2 创建/etc/ceph目录

```
[root@node1 ~]# mkdir /etc/ceph
```

#####4.3 安装ceph

在3个节点node1, node2, node3安装ceph



