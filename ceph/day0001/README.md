#Deply Ceph with ceph-deploy tool

##1. 准备虚拟机

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

| hostname   | cpu     | memory   | hard disk       | eth0 IP        | eth1 IP        |
| ---------- | ------- | -------- | --------------- | -------------- | -------------- |
| node1      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.191  | 192.168.29.191 |
| node2      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.192  | 192.168.29.192 |
| node3      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.193  | 192.168.29.193 |
| node4      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.194  | 192.168.29.194 |
| node5      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.195  | 192.168.29.195 |
| node6      | 4 core  | 8GB      | sda,sdb,sdc,sdd | 10.200.29.196  | 192.168.29.196 |

####1.6 将如下加入所有6台虚拟机的/etc/hosts

```
10.200.29.191 node1
10.200.29.192 node2
10.200.29.193 node3
10.200.29.194 node4
10.200.29.195 node5
10.200.29.196 node6
```

##2.配置ssh, 让node1可以无密码登录node2,node3
1)在node1, ssh-keygen, 当提示输入密码时，不输入密码

2)用ssh-copy-id 将node1的ssh key 拷贝到node2, node3，命令如下：

ssh-copy-id node2

ssh-copy-id node3

此时在node1上测试"ssh node2" 或 "ssh node3"，可以发现可以不用输入账号/密码即可登录。

##3.在node1,node2,node3安装EPEL

在3个节点，node1,node2,node3执行如下命令：

rpm -ivh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm

##4.在node1安装ceph-deploy

在node1:

yum install ceph-deploy


##5. "ceph-deploy new"创建一个cluster,名字叫作ceph;生成初始ceph.conf和ceph.mon.keyring

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

##6. 创建/etc/ceph目录

```
[root@node1 ~]# mkdir /etc/ceph
```

##7 安装ceph Hammer版本二进制

在3个节点node1, node2, node3安装ceph Hammer版本的二进制，注意仅仅是安装了相应的RPM包。

通过安装log可以看到，在3个节点上安装了ceph Hammer版本，并安装了很多依赖包。

```
[root@node1 ~]# ceph-deploy install --release hammer node1 node2 node3
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy install --release hammer node1 node2 node3
[ceph_deploy.install][DEBUG ] Installing stable version hammer on cluster ceph hosts node1 node2 node3
[ceph_deploy.install][DEBUG ] Detecting platform for host node1 ...
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.install][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node1][INFO  ] installing ceph on node1
[node1][INFO  ] Running command: yum clean all
[node1][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node1][DEBUG ] Cleaning repos: base epel extras updates
[node1][DEBUG ] Cleaning up everything
[node1][DEBUG ] Cleaning up list of fastest mirrors
[node1][INFO  ] adding EPEL repository
[node1][INFO  ] Running command: yum -y install epel-release
[node1][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node1][WARNIN] http://ftp.kddilabs.jp/Linux/packages/fedora/epel/7/x86_64/repodata/00619915ead1b54a0477f4cdcdf79e683faddea8102e33f0ade2c91c87fda30e-primary.sqlite.xz: [Errno 14] HTTP Error 404 - Not Found
[node1][WARNIN] Trying other mirror.
[node1][DEBUG ] Determining fastest mirrors
[node1][DEBUG ]  * base: mirrors.btte.net
[node1][DEBUG ]  * epel: ftp.kddilabs.jp
[node1][DEBUG ]  * extras: mirrors.zju.edu.cn
[node1][DEBUG ]  * updates: mirrors.zju.edu.cn
[node1][DEBUG ] Package epel-release-7-5.noarch already installed and latest version
[node1][DEBUG ] Nothing to do
[node1][INFO  ] Running command: yum -y install yum-priorities
[node1][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node1][DEBUG ] Loading mirror speeds from cached hostfile
[node1][DEBUG ]  * base: mirrors.btte.net
[node1][DEBUG ]  * epel: ftp.kddilabs.jp
[node1][DEBUG ]  * extras: mirrors.zju.edu.cn
[node1][DEBUG ]  * updates: mirrors.zju.edu.cn
[node1][DEBUG ] Resolving Dependencies
[node1][DEBUG ] --> Running transaction check
[node1][DEBUG ] ---> Package yum-plugin-priorities.noarch 0:1.1.31-29.el7 will be installed
[node1][DEBUG ] --> Finished Dependency Resolution
[node1][DEBUG ]
[node1][DEBUG ] Dependencies Resolved
[node1][DEBUG ]
[node1][DEBUG ] ================================================================================
[node1][DEBUG ]  Package                     Arch         Version              Repository  Size
[node1][DEBUG ] ================================================================================
[node1][DEBUG ] Installing:
[node1][DEBUG ]  yum-plugin-priorities       noarch       1.1.31-29.el7        base        24 k
[node1][DEBUG ]
[node1][DEBUG ] Transaction Summary
[node1][DEBUG ] ================================================================================
[node1][DEBUG ] Install  1 Package
[node1][DEBUG ]
[node1][DEBUG ] Total download size: 24 k
[node1][DEBUG ] Installed size: 28 k
[node1][DEBUG ] Downloading packages:
[node1][DEBUG ] Running transaction check
[node1][DEBUG ] Running transaction test
[node1][DEBUG ] Transaction test succeeded
[node1][DEBUG ] Running transaction
[node1][DEBUG ]   Installing : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node1][DEBUG ]   Verifying  : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node1][DEBUG ]
[node1][DEBUG ] Installed:
[node1][DEBUG ]   yum-plugin-priorities.noarch 0:1.1.31-29.el7
[node1][DEBUG ]
[node1][DEBUG ] Complete!
[node1][DEBUG ] Configure Yum priorities to include obsoletes
[node1][WARNIN] check_obsoletes has been enabled for Yum priorities plugin
[node1][INFO  ] Running command: rpm --import https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc
[node1][INFO  ] Running command: rpm -Uvh --replacepkgs http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node1][DEBUG ] Retrieving http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node1][DEBUG ] Preparing...                          ########################################
[node1][DEBUG ] Updating / installing...
[node1][DEBUG ] ceph-release-1-1.el7                  ########################################
[node1][WARNIN] ensuring that /etc/yum.repos.d/ceph.repo contains a high priority
[node1][WARNIN] altered ceph.repo priorities to contain: priority=1
[node1][INFO  ] Running command: yum -y install ceph ceph-radosgw
[node1][DEBUG ] Loaded plugins: fastestmirror, langpacks, priorities
[node1][DEBUG ] Loading mirror speeds from cached hostfile
[node1][DEBUG ]  * base: mirrors.btte.net
[node1][DEBUG ]  * epel: ftp.kddilabs.jp
[node1][DEBUG ]  * extras: mirrors.zju.edu.cn
[node1][DEBUG ]  * updates: mirrors.zju.edu.cn
[node1][DEBUG ] 36 packages excluded due to repository priority protections
[node1][DEBUG ] Resolving Dependencies
[node1][DEBUG ] --> Running transaction check
[node1][DEBUG ] ---> Package ceph.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: librbd1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: python-cephfs = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: ceph-common = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: librados2 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: python-rados = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: libcephfs1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: python-rbd = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: python-flask for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: python-requests for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: hdparm for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: libboost_program_options-mt.so.1.53.0()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: libtcmalloc.so.4()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: libleveldb.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Processing Dependency: libcephfs.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node1][DEBUG ] ---> Package ceph-radosgw.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: libfcgi.so.0()(64bit) for package: 1:ceph-radosgw-0.94.2-0.el7.x86_64
[node1][DEBUG ] --> Running transaction check
[node1][DEBUG ] ---> Package boost-program-options.x86_64 0:1.53.0-23.el7 will be installed
[node1][DEBUG ] ---> Package ceph-common.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: redhat-lsb-core for package: 1:ceph-common-0.94.2-0.el7.x86_64
[node1][DEBUG ] ---> Package fcgi.x86_64 0:2.4.0-22.el7 will be installed
[node1][DEBUG ] ---> Package gperftools-libs.x86_64 0:2.1-1.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: libunwind.so.8()(64bit) for package: gperftools-libs-2.1-1.el7.x86_64
[node1][DEBUG ] ---> Package hdparm.x86_64 0:9.43-5.el7 will be installed
[node1][DEBUG ] ---> Package leveldb.x86_64 0:1.12.0-5.el7 will be installed
[node1][DEBUG ] ---> Package libcephfs1.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] ---> Package librados2.x86_64 1:0.80.7-2.el7 will be updated
[node1][DEBUG ] ---> Package librados2.x86_64 1:0.94.2-0.el7 will be an update
[node1][DEBUG ] ---> Package librbd1.x86_64 1:0.80.7-2.el7 will be updated
[node1][DEBUG ] ---> Package librbd1.x86_64 1:0.94.2-0.el7 will be an update
[node1][DEBUG ] ---> Package python-cephfs.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] ---> Package python-flask.noarch 1:0.10.1-3.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: python-itsdangerous for package: 1:python-flask-0.10.1-3.el7.noarch
[node1][DEBUG ] --> Processing Dependency: python-werkzeug for package: 1:python-flask-0.10.1-3.el7.noarch
[node1][DEBUG ] --> Processing Dependency: python-jinja2 for package: 1:python-flask-0.10.1-3.el7.noarch
[node1][DEBUG ] ---> Package python-rados.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] ---> Package python-rbd.x86_64 1:0.94.2-0.el7 will be installed
[node1][DEBUG ] ---> Package python-requests.noarch 0:1.1.0-8.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: python-urllib3 for package: python-requests-1.1.0-8.el7.noarch
[node1][DEBUG ] --> Running transaction check
[node1][DEBUG ] ---> Package libunwind.x86_64 0:1.1-3.el7 will be installed
[node1][DEBUG ] ---> Package python-itsdangerous.noarch 0:0.23-1.el7 will be installed
[node1][DEBUG ] ---> Package python-jinja2.noarch 0:2.7.2-2.el7 will be installed
[node1][DEBUG ] --> Processing Dependency: python-babel >= 0.8 for package: python-jinja2-2.7.2-2.el7.noarch
[node1][DEBUG ] ---> Package python-urllib3.noarch 0:1.5-8.el7 will be installed
[node1][DEBUG ] ---> Package python-werkzeug.noarch 0:0.9.1-1.el7 will be installed
[node1][DEBUG ] ---> Package redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1 will be installed
[node1][DEBUG ] --> Processing Dependency: redhat-lsb-submod-security(x86-64) = 4.1-27.el7.centos.1 for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node1][DEBUG ] --> Processing Dependency: spax for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node1][DEBUG ] --> Running transaction check
[node1][DEBUG ] ---> Package python-babel.noarch 0:0.9.6-8.el7 will be installed
[node1][DEBUG ] ---> Package redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1 will be installed
[node1][DEBUG ] ---> Package spax.x86_64 0:1.5.2-11.el7 will be installed
[node1][DEBUG ] --> Finished Dependency Resolution
[node1][DEBUG ]
[node1][DEBUG ] Dependencies Resolved
[node1][DEBUG ]
[node1][DEBUG ] ================================================================================
[node1][DEBUG ]  Package                     Arch    Version                 Repository    Size
[node1][DEBUG ] ================================================================================
[node1][DEBUG ] Installing:
[node1][DEBUG ]  ceph                        x86_64  1:0.94.2-0.el7          Ceph          20 M
[node1][DEBUG ]  ceph-radosgw                x86_64  1:0.94.2-0.el7          Ceph         2.2 M
[node1][DEBUG ] Installing for dependencies:
[node1][DEBUG ]  boost-program-options       x86_64  1.53.0-23.el7           base         155 k
[node1][DEBUG ]  ceph-common                 x86_64  1:0.94.2-0.el7          Ceph         6.3 M
[node1][DEBUG ]  fcgi                        x86_64  2.4.0-22.el7            Ceph          45 k
[node1][DEBUG ]  gperftools-libs             x86_64  2.1-1.el7               Ceph         267 k
[node1][DEBUG ]  hdparm                      x86_64  9.43-5.el7              base          83 k
[node1][DEBUG ]  leveldb                     x86_64  1.12.0-5.el7            Ceph         158 k
[node1][DEBUG ]  libcephfs1                  x86_64  1:0.94.2-0.el7          Ceph         1.8 M
[node1][DEBUG ]  libunwind                   x86_64  1.1-3.el7               epel          61 k
[node1][DEBUG ]  python-babel                noarch  0.9.6-8.el7             base         1.4 M
[node1][DEBUG ]  python-cephfs               x86_64  1:0.94.2-0.el7          Ceph          11 k
[node1][DEBUG ]  python-flask                noarch  1:0.10.1-3.el7          Ceph-noarch  204 k
[node1][DEBUG ]  python-itsdangerous         noarch  0.23-1.el7              Ceph-noarch   23 k
[node1][DEBUG ]  python-jinja2               noarch  2.7.2-2.el7             base         515 k
[node1][DEBUG ]  python-rados                x86_64  1:0.94.2-0.el7          Ceph          28 k
[node1][DEBUG ]  python-rbd                  x86_64  1:0.94.2-0.el7          Ceph          18 k
[node1][DEBUG ]  python-requests             noarch  1.1.0-8.el7             base          70 k
[node1][DEBUG ]  python-urllib3              noarch  1.5-8.el7               base          41 k
[node1][DEBUG ]  python-werkzeug             noarch  0.9.1-1.el7             Ceph-noarch  562 k
[node1][DEBUG ]  redhat-lsb-core             x86_64  4.1-27.el7.centos.1     base          38 k
[node1][DEBUG ]  redhat-lsb-submod-security  x86_64  4.1-27.el7.centos.1     base          15 k
[node1][DEBUG ]  spax                        x86_64  1.5.2-11.el7            base         259 k
[node1][DEBUG ] Updating for dependencies:
[node1][DEBUG ]  librados2                   x86_64  1:0.94.2-0.el7          Ceph         1.7 M
[node1][DEBUG ]  librbd1                     x86_64  1:0.94.2-0.el7          Ceph         1.8 M
[node1][DEBUG ]
[node1][DEBUG ] Transaction Summary
[node1][DEBUG ] ================================================================================
[node1][DEBUG ] Install  2 Packages (+21 Dependent packages)
[node1][DEBUG ] Upgrade             (  2 Dependent packages)
[node1][DEBUG ]
[node1][DEBUG ] Total download size: 37 M
[node1][DEBUG ] Downloading packages:
[node1][DEBUG ] No Presto metadata available for Ceph
[node1][DEBUG ] --------------------------------------------------------------------------------
[node1][DEBUG ] Total                                              1.3 MB/s |  37 MB  00:29
[node1][DEBUG ] Running transaction check
[node1][DEBUG ] Running transaction test
[node1][DEBUG ] Transaction test succeeded
[node1][DEBUG ] Running transaction
[node1][WARNIN] Warning: RPMDB altered outside of yum.
[node1][DEBUG ]   Updating   : 1:librados2-0.94.2-0.el7.x86_64                             1/27
[node1][DEBUG ]   Installing : 1:python-rados-0.94.2-0.el7.x86_64                          2/27
[node1][DEBUG ]   Updating   : 1:librbd1-0.94.2-0.el7.x86_64                               3/27
[node1][DEBUG ]   Installing : 1:python-rbd-0.94.2-0.el7.x86_64                            4/27
[node1][DEBUG ]   Installing : 1:libcephfs1-0.94.2-0.el7.x86_64                            5/27
[node1][DEBUG ]   Installing : 1:python-cephfs-0.94.2-0.el7.x86_64                         6/27
[node1][DEBUG ]   Installing : python-werkzeug-0.9.1-1.el7.noarch                          7/27
[node1][DEBUG ]   Installing : boost-program-options-1.53.0-23.el7.x86_64                  8/27
[node1][DEBUG ]   Installing : python-urllib3-1.5-8.el7.noarch                             9/27
[node1][DEBUG ]   Installing : python-requests-1.1.0-8.el7.noarch                         10/27
[node1][DEBUG ]   Installing : libunwind-1.1-3.el7.x86_64                                 11/27
[node1][DEBUG ]   Installing : gperftools-libs-2.1-1.el7.x86_64                           12/27
[node1][DEBUG ]   Installing : python-babel-0.9.6-8.el7.noarch                            13/27
[node1][DEBUG ]   Installing : python-jinja2-2.7.2-2.el7.noarch                           14/27
[node1][DEBUG ]   Installing : fcgi-2.4.0-22.el7.x86_64                                   15/27
[node1][DEBUG ]   Installing : leveldb-1.12.0-5.el7.x86_64                                16/27
[node1][DEBUG ]   Installing : hdparm-9.43-5.el7.x86_64                                   17/27
[node1][DEBUG ]   Installing : spax-1.5.2-11.el7.x86_64                                   18/27
[node1][DEBUG ]   Installing : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64      19/27
[node1][DEBUG ]   Installing : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 20/27
[node1][DEBUG ]   Installing : 1:ceph-common-0.94.2-0.el7.x86_64                          21/27
[node1][DEBUG ]   Installing : python-itsdangerous-0.23-1.el7.noarch                      22/27
[node1][DEBUG ]   Installing : 1:python-flask-0.10.1-3.el7.noarch                         23/27
[node1][DEBUG ]   Installing : 1:ceph-0.94.2-0.el7.x86_64                                 24/27
[node1][DEBUG ]   Installing : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node1][DEBUG ]   Cleanup    : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node1][DEBUG ]   Cleanup    : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node1][DEBUG ]   Verifying  : 1:python-flask-0.10.1-3.el7.noarch                          1/27
[node1][DEBUG ]   Verifying  : python-itsdangerous-0.23-1.el7.noarch                       2/27
[node1][DEBUG ]   Verifying  : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64       3/27
[node1][DEBUG ]   Verifying  : spax-1.5.2-11.el7.x86_64                                    4/27
[node1][DEBUG ]   Verifying  : hdparm-9.43-5.el7.x86_64                                    5/27
[node1][DEBUG ]   Verifying  : 1:python-rbd-0.94.2-0.el7.x86_64                            6/27
[node1][DEBUG ]   Verifying  : leveldb-1.12.0-5.el7.x86_64                                 7/27
[node1][DEBUG ]   Verifying  : 1:python-cephfs-0.94.2-0.el7.x86_64                         8/27
[node1][DEBUG ]   Verifying  : python-requests-1.1.0-8.el7.noarch                          9/27
[node1][DEBUG ]   Verifying  : 1:librbd1-0.94.2-0.el7.x86_64                              10/27
[node1][DEBUG ]   Verifying  : 1:ceph-0.94.2-0.el7.x86_64                                 11/27
[node1][DEBUG ]   Verifying  : 1:python-rados-0.94.2-0.el7.x86_64                         12/27
[node1][DEBUG ]   Verifying  : gperftools-libs-2.1-1.el7.x86_64                           13/27
[node1][DEBUG ]   Verifying  : fcgi-2.4.0-22.el7.x86_64                                   14/27
[node1][DEBUG ]   Verifying  : python-babel-0.9.6-8.el7.noarch                            15/27
[node1][DEBUG ]   Verifying  : libunwind-1.1-3.el7.x86_64                                 16/27
[node1][DEBUG ]   Verifying  : 1:ceph-common-0.94.2-0.el7.x86_64                          17/27
[node1][DEBUG ]   Verifying  : 1:libcephfs1-0.94.2-0.el7.x86_64                           18/27
[node1][DEBUG ]   Verifying  : python-jinja2-2.7.2-2.el7.noarch                           19/27
[node1][DEBUG ]   Verifying  : 1:librados2-0.94.2-0.el7.x86_64                            20/27
[node1][DEBUG ]   Verifying  : python-urllib3-1.5-8.el7.noarch                            21/27
[node1][DEBUG ]   Verifying  : boost-program-options-1.53.0-23.el7.x86_64                 22/27
[node1][DEBUG ]   Verifying  : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 23/27
[node1][DEBUG ]   Verifying  : python-werkzeug-0.9.1-1.el7.noarch                         24/27
[node1][DEBUG ]   Verifying  : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node1][DEBUG ]   Verifying  : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node1][DEBUG ]   Verifying  : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node1][DEBUG ]
[node1][DEBUG ] Installed:
[node1][DEBUG ]   ceph.x86_64 1:0.94.2-0.el7         ceph-radosgw.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]
[node1][DEBUG ] Dependency Installed:
[node1][DEBUG ]   boost-program-options.x86_64 0:1.53.0-23.el7
[node1][DEBUG ]   ceph-common.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]   fcgi.x86_64 0:2.4.0-22.el7
[node1][DEBUG ]   gperftools-libs.x86_64 0:2.1-1.el7
[node1][DEBUG ]   hdparm.x86_64 0:9.43-5.el7
[node1][DEBUG ]   leveldb.x86_64 0:1.12.0-5.el7
[node1][DEBUG ]   libcephfs1.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]   libunwind.x86_64 0:1.1-3.el7
[node1][DEBUG ]   python-babel.noarch 0:0.9.6-8.el7
[node1][DEBUG ]   python-cephfs.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]   python-flask.noarch 1:0.10.1-3.el7
[node1][DEBUG ]   python-itsdangerous.noarch 0:0.23-1.el7
[node1][DEBUG ]   python-jinja2.noarch 0:2.7.2-2.el7
[node1][DEBUG ]   python-rados.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]   python-rbd.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]   python-requests.noarch 0:1.1.0-8.el7
[node1][DEBUG ]   python-urllib3.noarch 0:1.5-8.el7
[node1][DEBUG ]   python-werkzeug.noarch 0:0.9.1-1.el7
[node1][DEBUG ]   redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1
[node1][DEBUG ]   redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1
[node1][DEBUG ]   spax.x86_64 0:1.5.2-11.el7
[node1][DEBUG ]
[node1][DEBUG ] Dependency Updated:
[node1][DEBUG ]   librados2.x86_64 1:0.94.2-0.el7         librbd1.x86_64 1:0.94.2-0.el7
[node1][DEBUG ]
[node1][DEBUG ] Complete!
[node1][INFO  ] Running command: ceph --version
[node1][DEBUG ] ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
[ceph_deploy.install][DEBUG ] Detecting platform for host node2 ...
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[ceph_deploy.install][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node2][INFO  ] installing ceph on node2
[node2][INFO  ] Running command: yum clean all
[node2][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node2][DEBUG ] Cleaning repos: base epel extras updates
[node2][DEBUG ] Cleaning up everything
[node2][DEBUG ] Cleaning up list of fastest mirrors
[node2][INFO  ] adding EPEL repository
[node2][INFO  ] Running command: yum -y install epel-release
[node2][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node2][WARNIN] http://ftp.kddilabs.jp/Linux/packages/fedora/epel/7/x86_64/repodata/c78d2138f322178579013b905c1fd09d1d03b91f9f04686d46973aeb57b39c9f-pkgtags.sqlite.gz: [Errno 14] HTTP Error 404 - Not Found
[node2][WARNIN] Trying other mirror.
[node2][DEBUG ] Determining fastest mirrors
[node2][DEBUG ]  * base: mirrors.btte.net
[node2][DEBUG ]  * epel: ftp.kddilabs.jp
[node2][DEBUG ]  * extras: mirrors.zju.edu.cn
[node2][DEBUG ]  * updates: mirrors.aliyun.com
[node2][DEBUG ] Package epel-release-7-5.noarch already installed and latest version
[node2][DEBUG ] Nothing to do
[node2][INFO  ] Running command: yum -y install yum-priorities
[node2][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node2][DEBUG ] Loading mirror speeds from cached hostfile
[node2][DEBUG ]  * base: mirrors.btte.net
[node2][DEBUG ]  * epel: ftp.kddilabs.jp
[node2][DEBUG ]  * extras: mirrors.zju.edu.cn
[node2][DEBUG ]  * updates: mirrors.aliyun.com
[node2][DEBUG ] Resolving Dependencies
[node2][DEBUG ] --> Running transaction check
[node2][DEBUG ] ---> Package yum-plugin-priorities.noarch 0:1.1.31-29.el7 will be installed
[node2][DEBUG ] --> Finished Dependency Resolution
[node2][DEBUG ]
[node2][DEBUG ] Dependencies Resolved
[node2][DEBUG ]
[node2][DEBUG ] ================================================================================
[node2][DEBUG ]  Package                     Arch         Version              Repository  Size
[node2][DEBUG ] ================================================================================
[node2][DEBUG ] Installing:
[node2][DEBUG ]  yum-plugin-priorities       noarch       1.1.31-29.el7        base        24 k
[node2][DEBUG ]
[node2][DEBUG ] Transaction Summary
[node2][DEBUG ] ================================================================================
[node2][DEBUG ] Install  1 Package
[node2][DEBUG ]
[node2][DEBUG ] Total download size: 24 k
[node2][DEBUG ] Installed size: 28 k
[node2][DEBUG ] Downloading packages:
[node2][DEBUG ] Running transaction check
[node2][DEBUG ] Running transaction test
[node2][DEBUG ] Transaction test succeeded
[node2][DEBUG ] Running transaction
[node2][DEBUG ]   Installing : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node2][DEBUG ]   Verifying  : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node2][DEBUG ]
[node2][DEBUG ] Installed:
[node2][DEBUG ]   yum-plugin-priorities.noarch 0:1.1.31-29.el7
[node2][DEBUG ]
[node2][DEBUG ] Complete!
[node2][DEBUG ] Configure Yum priorities to include obsoletes
[node2][WARNIN] check_obsoletes has been enabled for Yum priorities plugin
[node2][INFO  ] Running command: rpm --import https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc
[node2][INFO  ] Running command: rpm -Uvh --replacepkgs http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node2][DEBUG ] Retrieving http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node2][DEBUG ] Preparing...                          ########################################
[node2][DEBUG ] Updating / installing...
[node2][DEBUG ] ceph-release-1-1.el7                  ########################################
[node2][WARNIN] ensuring that /etc/yum.repos.d/ceph.repo contains a high priority
[node2][WARNIN] altered ceph.repo priorities to contain: priority=1
[node2][INFO  ] Running command: yum -y install ceph ceph-radosgw
[node2][DEBUG ] Loaded plugins: fastestmirror, langpacks, priorities
[node2][DEBUG ] Loading mirror speeds from cached hostfile
[node2][DEBUG ]  * base: mirrors.btte.net
[node2][DEBUG ]  * epel: ftp.kddilabs.jp
[node2][DEBUG ]  * extras: mirrors.zju.edu.cn
[node2][DEBUG ]  * updates: mirrors.aliyun.com
[node2][DEBUG ] 36 packages excluded due to repository priority protections
[node2][DEBUG ] Resolving Dependencies
[node2][DEBUG ] --> Running transaction check
[node2][DEBUG ] ---> Package ceph.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: librbd1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: python-cephfs = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: ceph-common = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: librados2 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: python-rados = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: libcephfs1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: python-rbd = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: python-flask for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: python-requests for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: hdparm for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: libboost_program_options-mt.so.1.53.0()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: libtcmalloc.so.4()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: libleveldb.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Processing Dependency: libcephfs.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node2][DEBUG ] ---> Package ceph-radosgw.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: libfcgi.so.0()(64bit) for package: 1:ceph-radosgw-0.94.2-0.el7.x86_64
[node2][DEBUG ] --> Running transaction check
[node2][DEBUG ] ---> Package boost-program-options.x86_64 0:1.53.0-23.el7 will be installed
[node2][DEBUG ] ---> Package ceph-common.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: redhat-lsb-core for package: 1:ceph-common-0.94.2-0.el7.x86_64
[node2][DEBUG ] ---> Package fcgi.x86_64 0:2.4.0-22.el7 will be installed
[node2][DEBUG ] ---> Package gperftools-libs.x86_64 0:2.1-1.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: libunwind.so.8()(64bit) for package: gperftools-libs-2.1-1.el7.x86_64
[node2][DEBUG ] ---> Package hdparm.x86_64 0:9.43-5.el7 will be installed
[node2][DEBUG ] ---> Package leveldb.x86_64 0:1.12.0-5.el7 will be installed
[node2][DEBUG ] ---> Package libcephfs1.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] ---> Package librados2.x86_64 1:0.80.7-2.el7 will be updated
[node2][DEBUG ] ---> Package librados2.x86_64 1:0.94.2-0.el7 will be an update
[node2][DEBUG ] ---> Package librbd1.x86_64 1:0.80.7-2.el7 will be updated
[node2][DEBUG ] ---> Package librbd1.x86_64 1:0.94.2-0.el7 will be an update
[node2][DEBUG ] ---> Package python-cephfs.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] ---> Package python-flask.noarch 1:0.10.1-3.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: python-itsdangerous for package: 1:python-flask-0.10.1-3.el7.noarch
[node2][DEBUG ] --> Processing Dependency: python-werkzeug for package: 1:python-flask-0.10.1-3.el7.noarch
[node2][DEBUG ] --> Processing Dependency: python-jinja2 for package: 1:python-flask-0.10.1-3.el7.noarch
[node2][DEBUG ] ---> Package python-rados.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] ---> Package python-rbd.x86_64 1:0.94.2-0.el7 will be installed
[node2][DEBUG ] ---> Package python-requests.noarch 0:1.1.0-8.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: python-urllib3 for package: python-requests-1.1.0-8.el7.noarch
[node2][DEBUG ] --> Running transaction check
[node2][DEBUG ] ---> Package libunwind.x86_64 0:1.1-3.el7 will be installed
[node2][DEBUG ] ---> Package python-itsdangerous.noarch 0:0.23-1.el7 will be installed
[node2][DEBUG ] ---> Package python-jinja2.noarch 0:2.7.2-2.el7 will be installed
[node2][DEBUG ] --> Processing Dependency: python-babel >= 0.8 for package: python-jinja2-2.7.2-2.el7.noarch
[node2][DEBUG ] ---> Package python-urllib3.noarch 0:1.5-8.el7 will be installed
[node2][DEBUG ] ---> Package python-werkzeug.noarch 0:0.9.1-1.el7 will be installed
[node2][DEBUG ] ---> Package redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1 will be installed
[node2][DEBUG ] --> Processing Dependency: redhat-lsb-submod-security(x86-64) = 4.1-27.el7.centos.1 for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node2][DEBUG ] --> Processing Dependency: spax for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node2][DEBUG ] --> Running transaction check
[node2][DEBUG ] ---> Package python-babel.noarch 0:0.9.6-8.el7 will be installed
[node2][DEBUG ] ---> Package redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1 will be installed
[node2][DEBUG ] ---> Package spax.x86_64 0:1.5.2-11.el7 will be installed
[node2][DEBUG ] --> Finished Dependency Resolution
[node2][DEBUG ]
[node2][DEBUG ] Dependencies Resolved
[node2][DEBUG ]
[node2][DEBUG ] ================================================================================
[node2][DEBUG ]  Package                     Arch    Version                 Repository    Size
[node2][DEBUG ] ================================================================================
[node2][DEBUG ] Installing:
[node2][DEBUG ]  ceph                        x86_64  1:0.94.2-0.el7          Ceph          20 M
[node2][DEBUG ]  ceph-radosgw                x86_64  1:0.94.2-0.el7          Ceph         2.2 M
[node2][DEBUG ] Installing for dependencies:
[node2][DEBUG ]  boost-program-options       x86_64  1.53.0-23.el7           base         155 k
[node2][DEBUG ]  ceph-common                 x86_64  1:0.94.2-0.el7          Ceph         6.3 M
[node2][DEBUG ]  fcgi                        x86_64  2.4.0-22.el7            Ceph          45 k
[node2][DEBUG ]  gperftools-libs             x86_64  2.1-1.el7               Ceph         267 k
[node2][DEBUG ]  hdparm                      x86_64  9.43-5.el7              base          83 k
[node2][DEBUG ]  leveldb                     x86_64  1.12.0-5.el7            Ceph         158 k
[node2][DEBUG ]  libcephfs1                  x86_64  1:0.94.2-0.el7          Ceph         1.8 M
[node2][DEBUG ]  libunwind                   x86_64  1.1-3.el7               epel          61 k
[node2][DEBUG ]  python-babel                noarch  0.9.6-8.el7             base         1.4 M
[node2][DEBUG ]  python-cephfs               x86_64  1:0.94.2-0.el7          Ceph          11 k
[node2][DEBUG ]  python-flask                noarch  1:0.10.1-3.el7          Cep
[node2][DEBUG ]  python-itsdangerous         noarch  0.23-1.el7              Cep
[node2][DEBUG ]  python-jinja2               noarch  2.7.2-2.el7             bas
[node2][DEBUG ]  python-rados                x86_64  1:0.94.2-0.el7          Cep
[node2][DEBUG ]  python-rbd                  x86_64  1:0.94.2-0.el7          Cep
[node2][DEBUG ]  python-requests             noarch  1.1.0-8.el7             bas
[node2][DEBUG ]  python-urllib3              noarch  1.5-8.el7               bas
[node2][DEBUG ]  python-werkzeug             noarch  0.9.1-1.el7             Cep
[node2][DEBUG ]  redhat-lsb-core             x86_64  4.1-27.el7.centos.1     bas
[node2][DEBUG ]  redhat-lsb-submod-security  x86_64  4.1-27.el7.centos.1     bas
[node2][DEBUG ]  spax                        x86_64  1.5.2-11.el7            bas
[node2][DEBUG ] Updating for dependencies:
[node2][DEBUG ]  librados2                   x86_64  1:0.94.2-0.el7          Cep
[node2][DEBUG ]  librbd1                     x86_64  1:0.94.2-0.el7          Cep
[node2][DEBUG ]
[node2][DEBUG ] Transaction Summary
[node2][DEBUG ] ================================================================
[node2][DEBUG ] Install  2 Packages (+21 Dependent packages)
[node2][DEBUG ] Upgrade             (  2 Dependent packages)
[node2][DEBUG ]
[node2][DEBUG ] Total download size: 37 M
[node2][DEBUG ] Downloading packages:
[node2][DEBUG ] No Presto metadata available for Ceph
[node2][DEBUG ] --------------------------------------------------------------------------------
[node2][DEBUG ] Total                                              1.4 MB/s |  37 MB  00:27
[node2][DEBUG ] Running transaction check
[node2][DEBUG ] Running transaction test
[node2][DEBUG ] Transaction test succeeded
[node2][DEBUG ] Running transaction
[node2][WARNIN] Warning: RPMDB altered outside of yum.
[node2][DEBUG ]   Updating   : 1:librados2-0.94.2-0.el7.x86_64                             1/27
[node2][DEBUG ]   Installing : 1:python-rados-0.94.2-0.el7.x86_64                          2/27
[node2][DEBUG ]   Updating   : 1:librbd1-0.94.2-0.el7.x86_64                               3/27
[node2][DEBUG ]   Installing : 1:python-rbd-0.94.2-0.el7.x86_64                            4/27
[node2][DEBUG ]   Installing : 1:libcephfs1-0.94.2-0.el7.x86_64                            5/27
[node2][DEBUG ]   Installing : 1:python-cephfs-0.94.2-0.el7.x86_64                         6/27
[node2][DEBUG ]   Installing : python-werkzeug-0.9.1-1.el7.noarch                          7/27
[node2][DEBUG ]   Installing : boost-program-options-1.53.0-23.el7.x86_64                  8/27
[node2][DEBUG ]   Installing : python-urllib3-1.5-8.el7.noarch                             9/27
[node2][DEBUG ]   Installing : python-requests-1.1.0-8.el7.noarch                         10/27
[node2][DEBUG ]   Installing : libunwind-1.1-3.el7.x86_64                                 11/27
[node2][DEBUG ]   Installing : gperftools-libs-2.1-1.el7.x86_64                           12/27
[node2][DEBUG ]   Installing : python-babel-0.9.6-8.el7.noarch                            13/27
[node2][DEBUG ]   Installing : python-jinja2-2.7.2-2.el7.noarch                           14/27
[node2][DEBUG ]   Installing : fcgi-2.4.0-22.el7.x86_64                                   15/27
[node2][DEBUG ]   Installing : leveldb-1.12.0-5.el7.x86_64                                16/27
[node2][DEBUG ]   Installing : hdparm-9.43-5.el7.x86_64                                   17/27
[node2][DEBUG ]   Installing : spax-1.5.2-11.el7.x86_64                                   18/27
[node2][DEBUG ]   Installing : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64      19/27
[node2][DEBUG ]   Installing : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 20/27
[node2][DEBUG ]   Installing : 1:ceph-common-0.94.2-0.el7.x86_64                          21/27
[node2][DEBUG ]   Installing : python-itsdangerous-0.23-1.el7.noarch                      22/27
[node2][DEBUG ]   Installing : 1:python-flask-0.10.1-3.el7.noarch                         23/27
[node2][DEBUG ]   Installing : 1:ceph-0.94.2-0.el7.x86_64                                 24/27
[node2][DEBUG ]   Installing : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node2][DEBUG ]   Cleanup    : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node2][DEBUG ]   Cleanup    : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node2][DEBUG ]   Verifying  : 1:python-flask-0.10.1-3.el7.noarch                          1/27
[node2][DEBUG ]   Verifying  : python-itsdangerous-0.23-1.el7.noarch                       2/27
[node2][DEBUG ]   Verifying  : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64       3/27
[node2][DEBUG ]   Verifying  : spax-1.5.2-11.el7.x86_64                                    4/27
[node2][DEBUG ]   Verifying  : hdparm-9.43-5.el7.x86_64                                    5/27
[node2][DEBUG ]   Verifying  : 1:python-rbd-0.94.2-0.el7.x86_64                            6/27
[node2][DEBUG ]   Verifying  : leveldb-1.12.0-5.el7.x86_64                                 7/27
[node2][DEBUG ]   Verifying  : 1:python-cephfs-0.94.2-0.el7.x86_64                         8/27
[node2][DEBUG ]   Verifying  : python-requests-1.1.0-8.el7.noarch                          9/27
[node2][DEBUG ]   Verifying  : 1:librbd1-0.94.2-0.el7.x86_64                              10/27
[node2][DEBUG ]   Verifying  : 1:ceph-0.94.2-0.el7.x86_64                                 11/27
[node2][DEBUG ]   Verifying  : 1:python-rados-0.94.2-0.el7.x86_64                         12/27
[node2][DEBUG ]   Verifying  : gperftools-libs-2.1-1.el7.x86_64                           13/27
[node2][DEBUG ]   Verifying  : fcgi-2.4.0-22.el7.x86_64                                   14/27
[node2][DEBUG ]   Verifying  : python-babel-0.9.6-8.el7.noarch                            15/27
[node2][DEBUG ]   Verifying  : libunwind-1.1-3.el7.x86_64                                 16/27
[node2][DEBUG ]   Verifying  : 1:ceph-common-0.94.2-0.el7.x86_64                          17/27
[node2][DEBUG ]   Verifying  : 1:libcephfs1-0.94.2-0.el7.x86_64                           18/27
[node2][DEBUG ]   Verifying  : python-jinja2-2.7.2-2.el7.noarch                           19/27
[node2][DEBUG ]   Verifying  : 1:librados2-0.94.2-0.el7.x86_64                            20/27
[node2][DEBUG ]   Verifying  : python-urllib3-1.5-8.el7.noarch                            21/27
[node2][DEBUG ]   Verifying  : boost-program-options-1.53.0-23.el7.x86_64                 22/27
[node2][DEBUG ]   Verifying  : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 23/27
[node2][DEBUG ]   Verifying  : python-werkzeug-0.9.1-1.el7.noarch                         24/27
[node2][DEBUG ]   Verifying  : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node2][DEBUG ]   Verifying  : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node2][DEBUG ]   Verifying  : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node2][DEBUG ]
[node2][DEBUG ] Installed:
[node2][DEBUG ]   ceph.x86_64 1:0.94.2-0.el7         ceph-radosgw.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]
[node2][DEBUG ] Dependency Installed:
[node2][DEBUG ]   boost-program-options.x86_64 0:1.53.0-23.el7
[node2][DEBUG ]   ceph-common.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]   fcgi.x86_64 0:2.4.0-22.el7
[node2][DEBUG ]   gperftools-libs.x86_64 0:2.1-1.el7
[node2][DEBUG ]   hdparm.x86_64 0:9.43-5.el7
[node2][DEBUG ]   leveldb.x86_64 0:1.12.0-5.el7
[node2][DEBUG ]   libcephfs1.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]   libunwind.x86_64 0:1.1-3.el7
[node2][DEBUG ]   python-babel.noarch 0:0.9.6-8.el7
[node2][DEBUG ]   python-cephfs.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]   python-flask.noarch 1:0.10.1-3.el7
[node2][DEBUG ]   python-itsdangerous.noarch 0:0.23-1.el7
[node2][DEBUG ]   python-jinja2.noarch 0:2.7.2-2.el7
[node2][DEBUG ]   python-rados.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]   python-rbd.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]   python-requests.noarch 0:1.1.0-8.el7
[node2][DEBUG ]   python-urllib3.noarch 0:1.5-8.el7
[node2][DEBUG ]   python-werkzeug.noarch 0:0.9.1-1.el7
[node2][DEBUG ]   redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1
[node2][DEBUG ]   redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1
[node2][DEBUG ]   spax.x86_64 0:1.5.2-11.el7
[node2][DEBUG ]
[node2][DEBUG ] Dependency Updated:
[node2][DEBUG ]   librados2.x86_64 1:0.94.2-0.el7         librbd1.x86_64 1:0.94.2-0.el7
[node2][DEBUG ]
[node2][DEBUG ] Complete!
[node2][INFO  ] Running command: ceph --version
[node2][DEBUG ] ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
[ceph_deploy.install][DEBUG ] Detecting platform for host node3 ...
[node3][DEBUG ] connected to host: node3
[node3][DEBUG ] detect platform information from remote host
[node3][DEBUG ] detect machine type
[ceph_deploy.install][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node3][INFO  ] installing ceph on node3
[node3][INFO  ] Running command: yum clean all
[node3][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node3][DEBUG ] Cleaning repos: base epel extras updates
[node3][DEBUG ] Cleaning up everything
[node3][DEBUG ] Cleaning up list of fastest mirrors
[node3][INFO  ] adding EPEL repository
[node3][INFO  ] Running command: yum -y install epel-release
[node3][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node3][DEBUG ] Determining fastest mirrors
[node3][DEBUG ]  * base: mirrors.btte.net
[node3][DEBUG ]  * epel: ftp.kddilabs.jp
[node3][DEBUG ]  * extras: mirrors.zju.edu.cn
[node3][DEBUG ]  * updates: mirrors.aliyun.com
[node3][DEBUG ] Package epel-release-7-5.noarch already installed and latest version
[node3][DEBUG ] Nothing to do
[node3][INFO  ] Running command: yum -y install yum-priorities
[node3][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node3][DEBUG ] Loading mirror speeds from cached hostfile
[node3][DEBUG ]  * base: mirrors.btte.net
[node3][DEBUG ]  * epel: ftp.kddilabs.jp
[node3][DEBUG ]  * extras: mirrors.zju.edu.cn
[node3][DEBUG ]  * updates: mirrors.aliyun.com
[node3][DEBUG ] Resolving Dependencies
[node3][DEBUG ] --> Running transaction check
[node3][DEBUG ] ---> Package yum-plugin-priorities.noarch 0:1.1.31-29.el7 will be installed
[node3][DEBUG ] --> Finished Dependency Resolution
[node3][DEBUG ]
[node3][DEBUG ] Dependencies Resolved
[node3][DEBUG ]
[node3][DEBUG ] ================================================================================
[node3][DEBUG ]  Package                     Arch         Version              Repository  Size
[node3][DEBUG ] ================================================================================
[node3][DEBUG ] Installing:
[node3][DEBUG ]  yum-plugin-priorities       noarch       1.1.31-29.el7        base        24 k
[node3][DEBUG ]
[node3][DEBUG ] Transaction Summary
[node3][DEBUG ] ================================================================================
[node3][DEBUG ] Install  1 Package
[node3][DEBUG ]
[node3][DEBUG ] Total download size: 24 k
[node3][DEBUG ] Installed size: 28 k
[node3][DEBUG ] Downloading packages:
[node3][DEBUG ] Running transaction check
[node3][DEBUG ] Running transaction test
[node3][DEBUG ] Transaction test succeeded
[node3][DEBUG ] Running transaction
[node3][DEBUG ]   Installing : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node3][DEBUG ]   Verifying  : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node3][DEBUG ]
[node3][DEBUG ] Installed:
[node3][DEBUG ]   yum-plugin-priorities.noarch 0:1.1.31-29.el7
[node3][DEBUG ]
[node3][DEBUG ] Complete!
[node3][DEBUG ] Configure Yum priorities to include obsoletes
[node3][WARNIN] check_obsoletes has been enabled for Yum priorities plugin
[node3][INFO  ] Running command: rpm --import https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc
[node3][INFO  ] Running command: rpm -Uvh --replacepkgs http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node3][DEBUG ] Retrieving http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node3][DEBUG ] Preparing...                          ########################################
[node3][DEBUG ] Updating / installing...
[node3][DEBUG ] ceph-release-1-1.el7                  ########################################
[node3][WARNIN] ensuring that /etc/yum.repos.d/ceph.repo contains a high priority
[node3][WARNIN] altered ceph.repo priorities to contain: priority=1
[node3][INFO  ] Running command: yum -y install ceph ceph-radosgw
[node3][DEBUG ] Loaded plugins: fastestmirror, langpacks, priorities
[node3][DEBUG ] Loading mirror speeds from cached hostfile
[node3][DEBUG ]  * base: mirrors.btte.net
[node3][DEBUG ]  * epel: ftp.kddilabs.jp
[node3][DEBUG ]  * extras: mirrors.zju.edu.cn
[node3][DEBUG ]  * updates: mirrors.aliyun.com
[node3][DEBUG ] 36 packages excluded due to repository priority protections
[node3][DEBUG ] Resolving Dependencies
[node3][DEBUG ] --> Running transaction check
[node3][DEBUG ] ---> Package ceph.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: librbd1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: python-cephfs = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: ceph-common = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: librados2 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: python-rados = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: libcephfs1 = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: python-rbd = 1:0.94.2-0.el7 for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: python-flask for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: python-requests for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: hdparm for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: libboost_program_options-mt.so.1.53.0()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: libtcmalloc.so.4()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: libleveldb.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Processing Dependency: libcephfs.so.1()(64bit) for package: 1:ceph-0.94.2-0.el7.x86_64
[node3][DEBUG ] ---> Package ceph-radosgw.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: libfcgi.so.0()(64bit) for package: 1:ceph-radosgw-0.94.2-0.el7.x86_64
[node3][DEBUG ] --> Running transaction check
[node3][DEBUG ] ---> Package boost-program-options.x86_64 0:1.53.0-23.el7 will be installed
[node3][DEBUG ] ---> Package ceph-common.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: redhat-lsb-core for package: 1:ceph-common-0.94.2-0.el7.x86_64
[node3][DEBUG ] ---> Package fcgi.x86_64 0:2.4.0-22.el7 will be installed
[node3][DEBUG ] ---> Package gperftools-libs.x86_64 0:2.1-1.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: libunwind.so.8()(64bit) for package: gperftools-libs-2.1-1.el7.x86_64
[node3][DEBUG ] ---> Package hdparm.x86_64 0:9.43-5.el7 will be installed
[node3][DEBUG ] ---> Package leveldb.x86_64 0:1.12.0-5.el7 will be installed
[node3][DEBUG ] ---> Package libcephfs1.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] ---> Package librados2.x86_64 1:0.80.7-2.el7 will be updated
[node3][DEBUG ] ---> Package librados2.x86_64 1:0.94.2-0.el7 will be an update
[node3][DEBUG ] ---> Package librbd1.x86_64 1:0.80.7-2.el7 will be updated
[node3][DEBUG ] ---> Package librbd1.x86_64 1:0.94.2-0.el7 will be an update
[node3][DEBUG ] ---> Package python-cephfs.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] ---> Package python-flask.noarch 1:0.10.1-3.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: python-itsdangerous for package: 1:python-flask-0.10.1-3.el7.noarch
[node3][DEBUG ] --> Processing Dependency: python-werkzeug for package: 1:python-flask-0.10.1-3.el7.noarch
[node3][DEBUG ] --> Processing Dependency: python-jinja2 for package: 1:python-flask-0.10.1-3.el7.noarch
[node3][DEBUG ] ---> Package python-rados.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] ---> Package python-rbd.x86_64 1:0.94.2-0.el7 will be installed
[node3][DEBUG ] ---> Package python-requests.noarch 0:1.1.0-8.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: python-urllib3 for package: python-requests-1.1.0-8.el7.noarch
[node3][DEBUG ] --> Running transaction check
[node3][DEBUG ] ---> Package libunwind.x86_64 0:1.1-3.el7 will be installed
[node3][DEBUG ] ---> Package python-itsdangerous.noarch 0:0.23-1.el7 will be installed
[node3][DEBUG ] ---> Package python-jinja2.noarch 0:2.7.2-2.el7 will be installed
[node3][DEBUG ] --> Processing Dependency: python-babel >= 0.8 for package: python-jinja2-2.7.2-2.el7.noarch
[node3][DEBUG ] ---> Package python-urllib3.noarch 0:1.5-8.el7 will be installed
[node3][DEBUG ] ---> Package python-werkzeug.noarch 0:0.9.1-1.el7 will be installed
[node3][DEBUG ] ---> Package redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1 will be installed
[node3][DEBUG ] --> Processing Dependency: redhat-lsb-submod-security(x86-64) = 4.1-27.el7.centos.1 for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node3][DEBUG ] --> Processing Dependency: spax for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node3][DEBUG ] --> Running transaction check
[node3][DEBUG ] ---> Package python-babel.noarch 0:0.9.6-8.el7 will be installed
[node3][DEBUG ] ---> Package redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1 will be installed
[node3][DEBUG ] ---> Package spax.x86_64 0:1.5.2-11.el7 will be installed
[node3][DEBUG ] --> Finished Dependency Resolution
[node3][DEBUG ]
[node3][DEBUG ] Dependencies Resolved
[node3][DEBUG ]
[node3][DEBUG ] ================================================================================
[node3][DEBUG ]  Package                     Arch    Version                 Repository    Size
[node3][DEBUG ] ================================================================================
[node3][DEBUG ] Installing:
[node3][DEBUG ]  ceph                        x86_64  1:0.94.2-0.el7          Ceph          20 M
[node3][DEBUG ]  ceph-radosgw                x86_64  1:0.94.2-0.el7          Ceph         2.2 M
[node3][DEBUG ] Installing for dependencies:
[node3][DEBUG ]  boost-program-options       x86_64  1.53.0-23.el7           base         155 k
[node3][DEBUG ]  ceph-common                 x86_64  1:0.94.2-0.el7          Ceph         6.3 M
[node3][DEBUG ]  fcgi                        x86_64  2.4.0-22.el7            Ceph          45 k
[node3][DEBUG ]  gperftools-libs             x86_64  2.1-1.el7               Ceph         267 k
[node3][DEBUG ]  hdparm                      x86_64  9.43-5.el7              base          83 k
[node3][DEBUG ]  leveldb                     x86_64  1.12.0-5.el7            Ceph         158 k
[node3][DEBUG ]  libcephfs1                  x86_64  1:0.94.2-0.el7          Ceph         1.8 M
[node3][DEBUG ]  libunwind                   x86_64  1.1-3.el7               epel          61 k
[node3][DEBUG ]  python-babel                noarch  0.9.6-8.el7             base         1.4 M
[node3][DEBUG ]  python-cephfs               x86_64  1:0.94.2-0.el7          Ceph          11 k
[node3][DEBUG ]  python-flask                noarch  1:0.10.1-3.el7          Ceph-noarch  204 k
[node3][DEBUG ]  python-itsdangerous         noarch  0.23-1.el7              Ceph-noarch   23 k
[node3][DEBUG ]  python-jinja2               noarch  2.7.2-2.el7             base         515 k
[node3][DEBUG ]  python-rados                x86_64  1:0.94.2-0.el7          Ceph          28 k
[node3][DEBUG ]  python-rbd                  x86_64  1:0.94.2-0.el7          Ceph          18 k
[node3][DEBUG ]  python-requests             noarch  1.1.0-8.el7             base          70 k
[node3][DEBUG ]  python-urllib3              noarch  1.5-8.el7               base          41 k
[node3][DEBUG ]  python-werkzeug             noarch  0.9.1-1.el7             Ceph-noarch  562 k
[node3][DEBUG ]  redhat-lsb-core             x86_64  4.1-27.el7.centos.1     base          38 k
[node3][DEBUG ]  redhat-lsb-submod-security  x86_64  4.1-27.el7.centos.1     base          15 k
[node3][DEBUG ]  spax                        x86_64  1.5.2-11.el7            base         259 k
[node3][DEBUG ] Updating for dependencies:
[node3][DEBUG ]  librados2                   x86_64  1:0.94.2-0.el7          Ceph         1.7 M
[node3][DEBUG ]  librbd1                     x86_64  1:0.94.2-0.el7          Ceph         1.8 M
[node3][DEBUG ]
[node3][DEBUG ] Transaction Summary
[node3][DEBUG ] ================================================================================
[node3][DEBUG ] Install  2 Packages (+21 Dependent packages)
[node3][DEBUG ] Upgrade             (  2 Dependent packages)
[node3][DEBUG ]
[node3][DEBUG ] Total download size: 37 M
[node3][DEBUG ] Downloading packages:
[node3][DEBUG ] No Presto metadata available for Ceph
[node3][DEBUG ] --------------------------------------------------------------------------------
[node3][DEBUG ] Total                                              1.3 MB/s |  37 MB  00:29
[node3][DEBUG ] Running transaction check
[node3][DEBUG ] Running transaction test
[node3][DEBUG ] Transaction test succeeded
[node3][DEBUG ] Running transaction
[node3][WARNIN] Warning: RPMDB altered outside of yum.
[node3][DEBUG ]   Updating   : 1:librados2-0.94.2-0.el7.x86_64                             1/27
[node3][DEBUG ]   Installing : 1:python-rados-0.94.2-0.el7.x86_64                          2/27
[node3][DEBUG ]   Updating   : 1:librbd1-0.94.2-0.el7.x86_64                               3/27
[node3][DEBUG ]   Installing : 1:python-rbd-0.94.2-0.el7.x86_64                            4/27
[node3][DEBUG ]   Installing : 1:libcephfs1-0.94.2-0.el7.x86_64                            5/27
[node3][DEBUG ]   Installing : 1:python-cephfs-0.94.2-0.el7.x86_64                         6/27
[node3][DEBUG ]   Installing : python-werkzeug-0.9.1-1.el7.noarch                          7/27
[node3][DEBUG ]   Installing : boost-program-options-1.53.0-23.el7.x86_64                  8/27
[node3][DEBUG ]   Installing : python-urllib3-1.5-8.el7.noarch                             9/27
[node3][DEBUG ]   Installing : python-requests-1.1.0-8.el7.noarch                         10/27
[node3][DEBUG ]   Installing : libunwind-1.1-3.el7.x86_64                                 11/27
[node3][DEBUG ]   Installing : gperftools-libs-2.1-1.el7.x86_64                           12/27
[node3][DEBUG ]   Installing : python-babel-0.9.6-8.el7.noarch                            13/27
[node3][DEBUG ]   Installing : python-jinja2-2.7.2-2.el7.noarch                           14/27
[node3][DEBUG ]   Installing : fcgi-2.4.0-22.el7.x86_64                                   15/27
[node3][DEBUG ]   Installing : leveldb-1.12.0-5.el7.x86_64                                16/27
[node3][DEBUG ]   Installing : hdparm-9.43-5.el7.x86_64                                   17/27
[node3][DEBUG ]   Installing : spax-1.5.2-11.el7.x86_64                                   18/27
[node3][DEBUG ]   Installing : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64      19/27
[node3][DEBUG ]   Installing : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 20/27
[node3][DEBUG ]   Installing : 1:ceph-common-0.94.2-0.el7.x86_64                          21/27
[node3][DEBUG ]   Installing : python-itsdangerous-0.23-1.el7.noarch                      22/27
[node3][DEBUG ]   Installing : 1:python-flask-0.10.1-3.el7.noarch                         23/27
[node3][DEBUG ]   Installing : 1:ceph-0.94.2-0.el7.x86_64                                 24/27
[node3][DEBUG ]   Installing : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node3][DEBUG ]   Cleanup    : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node3][DEBUG ]   Cleanup    : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node3][DEBUG ]   Verifying  : 1:python-flask-0.10.1-3.el7.noarch                          1/27
[node3][DEBUG ]   Verifying  : python-itsdangerous-0.23-1.el7.noarch                       2/27
[node3][DEBUG ]   Verifying  : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64       3/27
[node3][DEBUG ]   Verifying  : spax-1.5.2-11.el7.x86_64                                    4/27
[node3][DEBUG ]   Verifying  : hdparm-9.43-5.el7.x86_64                                    5/27
[node3][DEBUG ]   Verifying  : 1:python-rbd-0.94.2-0.el7.x86_64                            6/27
[node3][DEBUG ]   Verifying  : leveldb-1.12.0-5.el7.x86_64                                 7/27
[node3][DEBUG ]   Verifying  : 1:python-cephfs-0.94.2-0.el7.x86_64                         8/27
[node3][DEBUG ]   Verifying  : python-requests-1.1.0-8.el7.noarch                          9/27
[node3][DEBUG ]   Verifying  : 1:librbd1-0.94.2-0.el7.x86_64                              10/27
[node3][DEBUG ]   Verifying  : 1:ceph-0.94.2-0.el7.x86_64                                 11/27
[node3][DEBUG ]   Verifying  : 1:python-rados-0.94.2-0.el7.x86_64                         12/27
[node3][DEBUG ]   Verifying  : gperftools-libs-2.1-1.el7.x86_64                           13/27
[node3][DEBUG ]   Verifying  : fcgi-2.4.0-22.el7.x86_64                                   14/27
[node3][DEBUG ]   Verifying  : python-babel-0.9.6-8.el7.noarch                            15/27
[node3][DEBUG ]   Verifying  : libunwind-1.1-3.el7.x86_64                                 16/27
[node3][DEBUG ]   Verifying  : 1:ceph-common-0.94.2-0.el7.x86_64                          17/27
[node3][DEBUG ]   Verifying  : 1:libcephfs1-0.94.2-0.el7.x86_64                           18/27
[node3][DEBUG ]   Verifying  : python-jinja2-2.7.2-2.el7.noarch                           19/27
[node3][DEBUG ]   Verifying  : 1:librados2-0.94.2-0.el7.x86_64                            20/27
[node3][DEBUG ]   Verifying  : python-urllib3-1.5-8.el7.noarch                            21/27
[node3][DEBUG ]   Verifying  : boost-program-options-1.53.0-23.el7.x86_64                 22/27
[node3][DEBUG ]   Verifying  : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 23/27
[node3][DEBUG ]   Verifying  : python-werkzeug-0.9.1-1.el7.noarch                         24/27
[node3][DEBUG ]   Verifying  : 1:ceph-radosgw-0.94.2-0.el7.x86_64                         25/27
[node3][DEBUG ]   Verifying  : 1:librbd1-0.80.7-2.el7.x86_64                              26/27
[node3][DEBUG ]   Verifying  : 1:librados2-0.80.7-2.el7.x86_64                            27/27
[node3][DEBUG ]
[node3][DEBUG ] Installed:
[node3][DEBUG ]   ceph.x86_64 1:0.94.2-0.el7         ceph-radosgw.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]
[node3][DEBUG ] Dependency Installed:
[node3][DEBUG ]   boost-program-options.x86_64 0:1.53.0-23.el7
[node3][DEBUG ]   ceph-common.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]   fcgi.x86_64 0:2.4.0-22.el7
[node3][DEBUG ]   gperftools-libs.x86_64 0:2.1-1.el7
[node3][DEBUG ]   hdparm.x86_64 0:9.43-5.el7
[node3][DEBUG ]   leveldb.x86_64 0:1.12.0-5.el7
[node3][DEBUG ]   libcephfs1.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]   libunwind.x86_64 0:1.1-3.el7
[node3][DEBUG ]   python-babel.noarch 0:0.9.6-8.el7
[node3][DEBUG ]   python-cephfs.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]   python-flask.noarch 1:0.10.1-3.el7
[node3][DEBUG ]   python-itsdangerous.noarch 0:0.23-1.el7
[node3][DEBUG ]   python-jinja2.noarch 0:2.7.2-2.el7
[node3][DEBUG ]   python-rados.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]   python-rbd.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]   python-requests.noarch 0:1.1.0-8.el7
[node3][DEBUG ]   python-urllib3.noarch 0:1.5-8.el7
[node3][DEBUG ]   python-werkzeug.noarch 0:0.9.1-1.el7
[node3][DEBUG ]   redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1
[node3][DEBUG ]   redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1
[node3][DEBUG ]   spax.x86_64 0:1.5.2-11.el7
[node3][DEBUG ]
[node3][DEBUG ] Dependency Updated:
[node3][DEBUG ]   librados2.x86_64 1:0.94.2-0.el7         librbd1.x86_64 1:0.94.2-0.el7
[node3][DEBUG ]
[node3][DEBUG ] Complete!
[node3][INFO  ] Running command: ceph --version
[node3][DEBUG ] ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
```

##8. 在3个节点node1,node2,node3上检查ceph binaries是否被安装

```
[root@node1 ~]# ceph -v
ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
```

```
[root@node2 ~]# ceph -v
ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
```

```
[root@node3 ~]# ceph -v
ceph version 0.94.2 (5fb85614ca8f354284c713a2f9c610860720bbf3)
```

##9. 在node1部署ceph

####9.1 在node1上创建第一个monitor节点

**在node1上创建monitor**

```
[root@node1 ~]# ceph-deploy mon create-initial
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy mon create-initial
[ceph_deploy.mon][DEBUG ] Deploying mon, cluster ceph hosts node1
[ceph_deploy.mon][DEBUG ] detecting platform for host node1 ...
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.mon][INFO  ] distro info: CentOS Linux 7.1.1503 Core
[node1][DEBUG ] determining if provided host has same hostname in remote
[node1][DEBUG ] get remote short hostname
[node1][DEBUG ] deploying mon to node1
[node1][DEBUG ] get remote short hostname
[node1][DEBUG ] remote hostname: node1
[node1][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[node1][DEBUG ] create the mon path if it does not exist
[node1][DEBUG ] checking for done path: /var/lib/ceph/mon/ceph-node1/done
[node1][DEBUG ] done path does not exist: /var/lib/ceph/mon/ceph-node1/done
[node1][INFO  ] creating keyring file: /var/lib/ceph/tmp/ceph-node1.mon.keyring
[node1][DEBUG ] create the monitor keyring file
[node1][INFO  ] Running command: ceph-mon --cluster ceph --mkfs -i node1 --keyring /var/lib/ceph/tmp/ceph-node1.mon.keyring
[node1][DEBUG ] ceph-mon: mon.noname-a 10.200.29.191:6789/0 is local, renaming to mon.node1
[node1][DEBUG ] ceph-mon: set fsid to 8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a
[node1][DEBUG ] ceph-mon: created monfs at /var/lib/ceph/mon/ceph-node1 for mon.node1
[node1][INFO  ] unlinking keyring file /var/lib/ceph/tmp/ceph-node1.mon.keyring
[node1][DEBUG ] create a done file to avoid re-doing the mon deployment
[node1][DEBUG ] create the init path if it does not exist
[node1][DEBUG ] locating the `service` executable...
[node1][INFO  ] Running command: /usr/sbin/service ceph -c /etc/ceph/ceph.conf start mon.node1
[node1][DEBUG ] === mon.node1 ===
[node1][DEBUG ] Starting Ceph mon.node1 on node1...
[node1][WARNIN] Running as unit run-31528.service.
[node1][DEBUG ] Starting ceph-create-keys on node1...
[node1][INFO  ] Running command: systemctl enable ceph
[node1][WARNIN] ceph.service is not a native service, redirecting to /sbin/chkconfig.
[node1][WARNIN] Executing /sbin/chkconfig ceph on
[node1][WARNIN] The unit files have no [Install] section. They are not meant to be enabled
[node1][WARNIN] using systemctl.
[node1][WARNIN] Possible reasons for having this kind of units are:
[node1][WARNIN] 1) A unit may be statically enabled by being symlinked from another unit's
[node1][WARNIN]    .wants/ or .requires/ directory.
[node1][WARNIN] 2) A unit's purpose may be to act as a helper for some other unit which has
[node1][WARNIN]    a requirement dependency on it.
[node1][WARNIN] 3) A unit may be started when needed via activation (socket, path, timer,
[node1][WARNIN]    D-Bus, udev, scripted systemctl call, ...).
[node1][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node1.asok mon_status
[node1][DEBUG ] ********************************************************************************
[node1][DEBUG ] status for monitor: mon.node1
[node1][DEBUG ] {
[node1][DEBUG ]   "election_epoch": 2,
[node1][DEBUG ]   "extra_probe_peers": [],
[node1][DEBUG ]   "monmap": {
[node1][DEBUG ]     "created": "0.000000",
[node1][DEBUG ]     "epoch": 1,
[node1][DEBUG ]     "fsid": "8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a",
[node1][DEBUG ]     "modified": "0.000000",
[node1][DEBUG ]     "mons": [
[node1][DEBUG ]       {
[node1][DEBUG ]         "addr": "10.200.29.191:6789/0",
[node1][DEBUG ]         "name": "node1",
[node1][DEBUG ]         "rank": 0
[node1][DEBUG ]       }
[node1][DEBUG ]     ]
[node1][DEBUG ]   },
[node1][DEBUG ]   "name": "node1",
[node1][DEBUG ]   "outside_quorum": [],
[node1][DEBUG ]   "quorum": [
[node1][DEBUG ]     0
[node1][DEBUG ]   ],
[node1][DEBUG ]   "rank": 0,
[node1][DEBUG ]   "state": "leader",
[node1][DEBUG ]   "sync_provider": []
[node1][DEBUG ] }
[node1][DEBUG ] ********************************************************************************
[node1][INFO  ] monitor: mon.node1 is running
[node1][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node1.asok mon_status
[ceph_deploy.mon][INFO  ] processing monitor mon.node1
[node1][DEBUG ] connected to host: node1
[node1][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node1.asok mon_status
[ceph_deploy.mon][INFO  ] mon.node1 monitor has reached quorum!
[ceph_deploy.mon][INFO  ] all initial monitors are running and have formed quorum
[ceph_deploy.mon][INFO  ] Running gatherkeys...
[ceph_deploy.gatherkeys][DEBUG ] Checking node1 for /etc/ceph/ceph.client.admin.keyring
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[node1][DEBUG ] fetch remote file
[ceph_deploy.gatherkeys][DEBUG ] Got ceph.client.admin.keyring key from node1.
[ceph_deploy.gatherkeys][DEBUG ] Have ceph.mon.keyring
[ceph_deploy.gatherkeys][DEBUG ] Checking node1 for /var/lib/ceph/bootstrap-osd/ceph.keyring
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[node1][DEBUG ] fetch remote file
[ceph_deploy.gatherkeys][DEBUG ] Got ceph.bootstrap-osd.keyring key from node1.
[ceph_deploy.gatherkeys][DEBUG ] Checking node1 for /var/lib/ceph/bootstrap-mds/ceph.keyring
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[node1][DEBUG ] fetch remote file
[ceph_deploy.gatherkeys][DEBUG ] Got ceph.bootstrap-mds.keyring key from node1.
[ceph_deploy.gatherkeys][DEBUG ] Checking node1 for /var/lib/ceph/bootstrap-rgw/ceph.keyring
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[node1][DEBUG ] fetch remote file
[ceph_deploy.gatherkeys][DEBUG ] Got ceph.bootstrap-rgw.keyring key from node1.
```

**检查monitor状态**

```
[root@node1 ~]# ceph status
    cluster 8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a
     health HEALTH_ERR
            64 pgs stuck inactive
            64 pgs stuck unclean
            no osds
     monmap e1: 1 mons at {node1=10.200.29.191:6789/0}
            election epoch 2, quorum 0 node1
     osdmap e1: 0 osds: 0 up, 0 in
      pgmap v2: 64 pgs, 1 pools, 0 bytes data, 0 objects
            0 kB used, 0 kB / 0 kB avail
                  64 creating
```

####9.2 在node1创建object storage device(OSD)

列出node1的磁盘信息,其中sdb,sdc,sdd为未格式化将要用于OSD的硬盘。

```
[root@node1 ~]# ceph-deploy disk list node1
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy disk list node1
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[ceph_deploy.osd][DEBUG ] Listing disks on node1...
[node1][DEBUG ] find the location of an executable
[node1][INFO  ] Running command: /usr/sbin/ceph-disk list
[node1][DEBUG ] /dev/sda :
[node1][DEBUG ]  /dev/sda1 other, xfs, mounted on /
[node1][DEBUG ]  /dev/sda2 swap, swap
[node1][DEBUG ] /dev/sdb other, unknown
[node1][DEBUG ] /dev/sdc other, unknown
[node1][DEBUG ] /dev/sdd other, unknown
[node1][DEBUG ] /dev/sr0 other, iso9660
```

####9.3 用ceph-deploy disk zap 破坏掉node1节点sdb,sdc,sdd的分区表

```
[root@node1 ~]# ceph-deploy disk zap node1:sdb node1:sdc node1:sdd
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy disk zap node1:sdb node1:sdc node1:sdd
[ceph_deploy.osd][DEBUG ] zapping /dev/sdb on node1
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node1][DEBUG ] zeroing last few blocks of device
[node1][DEBUG ] find the location of an executable
[node1][INFO  ] Running command: /usr/sbin/ceph-disk zap /dev/sdb
[node1][DEBUG ]
[node1][DEBUG ] ***************************************************************
[node1][DEBUG ] Found invalid GPT and valid MBR; converting MBR to GPT format.
[node1][DEBUG ] ***************************************************************
[node1][DEBUG ]
[node1][DEBUG ] GPT data structures destroyed! You may now partition the disk using fdisk or
[node1][DEBUG ] other utilities.
[node1][DEBUG ] Creating new GPT entries.
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] partx: specified range <1:0> does not make sense
[ceph_deploy.osd][INFO  ] calling partx on zapped device /dev/sdb
[ceph_deploy.osd][INFO  ] re-reading known partitions will display errors
[node1][INFO  ] Running command: partx -a /dev/sdb
[ceph_deploy.osd][DEBUG ] zapping /dev/sdc on node1
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node1][DEBUG ] zeroing last few blocks of device
[node1][DEBUG ] find the location of an executable
[node1][INFO  ] Running command: /usr/sbin/ceph-disk zap /dev/sdc
[node1][DEBUG ]
[node1][DEBUG ] ***************************************************************
[node1][DEBUG ] Found invalid GPT and valid MBR; converting MBR to GPT format.
[node1][DEBUG ] ***************************************************************
[node1][DEBUG ]
[node1][DEBUG ] GPT data structures destroyed! You may now partition the disk using fdisk or
[node1][DEBUG ] other utilities.
[node1][DEBUG ] Creating new GPT entries.
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] partx: specified range <1:0> does not make sense
[ceph_deploy.osd][INFO  ] calling partx on zapped device /dev/sdc
[ceph_deploy.osd][INFO  ] re-reading known partitions will display errors
[node1][INFO  ] Running command: partx -a /dev/sdc
[ceph_deploy.osd][DEBUG ] zapping /dev/sdd on node1
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node1][DEBUG ] zeroing last few blocks of device
[node1][DEBUG ] find the location of an executable
[node1][INFO  ] Running command: /usr/sbin/ceph-disk zap /dev/sdd
[node1][DEBUG ] Creating new GPT entries.
[node1][DEBUG ] GPT data structures destroyed! You may now partition the disk using fdisk or
[node1][DEBUG ] other utilities.
[node1][DEBUG ] Creating new GPT entries.
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] partx: specified range <1:0> does not make sense
[ceph_deploy.osd][INFO  ] calling partx on zapped device /dev/sdd
[ceph_deploy.osd][INFO  ] re-reading known partitions will display errors
[node1][INFO  ] Running command: partx -a /dev/sdd
```

####9.4 在node1的sdb,sdc,sdd创建OSD

```
[root@node1 ~]# ceph-deploy osd create node1:sdb node1:sdc node1:sdd
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy osd create node1:sdb node1:sdc node1:sdd
[ceph_deploy.osd][DEBUG ] Preparing cluster ceph disks node1:/dev/sdb: node1:/dev/sdc: node1:/dev/sdd:
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[ceph_deploy.osd][DEBUG ] Deploying osd to node1
[node1][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[node1][INFO  ] Running command: udevadm trigger --subsystem-match=block --action=add
[ceph_deploy.osd][DEBUG ] Preparing host node1 disk /dev/sdb journal None activate True
[node1][INFO  ] Running command: ceph-disk -v prepare --fs-type xfs --cluster ceph -- /dev/sdb
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=fsid
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=osd_journal_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_cryptsetup_parameters
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_key_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_type
[node1][WARNIN] INFO:ceph-disk:Will colocate journal with data on /dev/sdb
[node1][WARNIN] DEBUG:ceph-disk:Creating journal partition num 2 size 5120 on /dev/sdb
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --new=2:0:5120M --change-name=2:ceph journal --partition-guid=2:f4b8e65d-a647-4b57-bc72-24aebc1ca346 --typecode=2:45b0969e-9b03-4f30-b4c6-b4b80ceff106 --mbrtogpt -- /dev/sdb
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdb
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdb
[node1][WARNIN] partx: /dev/sdb: error adding partition 2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/f4b8e65d-a647-4b57-bc72-24aebc1ca346
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/f4b8e65d-a647-4b57-bc72-24aebc1ca346
[node1][WARNIN] DEBUG:ceph-disk:Creating osd partition on /dev/sdb
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --largest-new=1 --change-name=1:ceph data --partition-guid=1:9f8bc2ee-9d7a-4e9c-8238-690578d8629b --typecode=1:89c57f98-2fe5-4dc0-89c1-f3ad0ceff2be -- /dev/sdb
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on created device /dev/sdb
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdb
[node1][WARNIN] partx: /dev/sdb: error adding partitions 1-2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Creating xfs fs on /dev/sdb1
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/mkfs -t xfs -f -i size=2048 -- /dev/sdb1
[node1][DEBUG ] meta-data=/dev/sdb1              isize=2048   agcount=4, agsize=982975 blks
[node1][DEBUG ]          =                       sectsz=512   attr=2, projid32bit=1
[node1][DEBUG ]          =                       crc=0        finobt=0
[node1][DEBUG ] data     =                       bsize=4096   blocks=3931899, imaxpct=25
[node1][DEBUG ]          =                       sunit=0      swidth=0 blks
[node1][DEBUG ] naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
[node1][DEBUG ] log      =internal log           bsize=4096   blocks=2560, version=2
[node1][DEBUG ]          =                       sectsz=512   sunit=0 blks, lazy-count=1
[node1][DEBUG ] realtime =none                   extsz=4096   blocks=0, rtextents=0
[node1][WARNIN] DEBUG:ceph-disk:Mounting /dev/sdb1 on /var/lib/ceph/tmp/mnt.xmOMWR with options noatime,inode64
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/mount -t xfs -o noatime,inode64 -- /dev/sdb1 /var/lib/ceph/tmp/mnt.xmOMWR
[node1][WARNIN] DEBUG:ceph-disk:Preparing osd data dir /var/lib/ceph/tmp/mnt.xmOMWR
[node1][WARNIN] DEBUG:ceph-disk:Creating symlink /var/lib/ceph/tmp/mnt.xmOMWR/journal -> /dev/disk/by-partuuid/f4b8e65d-a647-4b57-bc72-24aebc1ca346
[node1][WARNIN] DEBUG:ceph-disk:Unmounting /var/lib/ceph/tmp/mnt.xmOMWR
[node1][WARNIN] INFO:ceph-disk:Running command: /bin/umount -- /var/lib/ceph/tmp/mnt.xmOMWR
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --typecode=1:4fbd7e29-9d25-41b8-afd0-062c0ceff05d -- /dev/sdb
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdb
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdb
[node1][WARNIN] partx: /dev/sdb: error adding partitions 1-2
[node1][INFO  ] Running command: udevadm trigger --subsystem-match=block --action=add
[node1][INFO  ] checking OSD status...
[node1][INFO  ] Running command: ceph --cluster=ceph osd stat --format=json
[ceph_deploy.osd][DEBUG ] Host node1 is now ready for osd use.
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[ceph_deploy.osd][DEBUG ] Preparing host node1 disk /dev/sdc journal None activate True
[node1][INFO  ] Running command: ceph-disk -v prepare --fs-type xfs --cluster ceph -- /dev/sdc
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=fsid
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=osd_journal_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_cryptsetup_parameters
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_key_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_type
[node1][WARNIN] INFO:ceph-disk:Will colocate journal with data on /dev/sdc
[node1][WARNIN] DEBUG:ceph-disk:Creating journal partition num 2 size 5120 on /dev/sdc
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --new=2:0:5120M --change-name=2:ceph journal --partition-guid=2:4cbc461f-2238-47c0-8171-1b3b688b7682 --typecode=2:45b0969e-9b03-4f30-b4c6-b4b80ceff106 --mbrtogpt -- /dev/sdc
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdc
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdc
[node1][WARNIN] partx: /dev/sdc: error adding partition 2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/4cbc461f-2238-47c0-8171-1b3b688b7682
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/4cbc461f-2238-47c0-8171-1b3b688b7682
[node1][WARNIN] DEBUG:ceph-disk:Creating osd partition on /dev/sdc
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --largest-new=1 --change-name=1:ceph data --partition-guid=1:10faed08-db17-4fc0-97e6-d49685d472df --typecode=1:89c57f98-2fe5-4dc0-89c1-f3ad0ceff2be -- /dev/sdc
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on created device /dev/sdc
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdc
[node1][WARNIN] partx: /dev/sdc: error adding partitions 1-2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Creating xfs fs on /dev/sdc1
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/mkfs -t xfs -f -i size=2048 -- /dev/sdc1
[node1][DEBUG ] meta-data=/dev/sdc1              isize=2048   agcount=4, agsize=982975 blks
[node1][DEBUG ]          =                       sectsz=512   attr=2, projid32bit=1
[node1][DEBUG ]          =                       crc=0        finobt=0
[node1][DEBUG ] data     =                       bsize=4096   blocks=3931899, imaxpct=25
[node1][DEBUG ]          =                       sunit=0      swidth=0 blks
[node1][DEBUG ] naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
[node1][DEBUG ] log      =internal log           bsize=4096   blocks=2560, version=2
[node1][DEBUG ]          =                       sectsz=512   sunit=0 blks, lazy-count=1
[node1][DEBUG ] realtime =none                   extsz=4096   blocks=0, rtextents=0
[node1][WARNIN] DEBUG:ceph-disk:Mounting /dev/sdc1 on /var/lib/ceph/tmp/mnt.olThVL with options noatime,inode64
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/mount -t xfs -o noatime,inode64 -- /dev/sdc1 /var/lib/ceph/tmp/mnt.olThVL
[node1][WARNIN] DEBUG:ceph-disk:Preparing osd data dir /var/lib/ceph/tmp/mnt.olThVL
[node1][WARNIN] DEBUG:ceph-disk:Creating symlink /var/lib/ceph/tmp/mnt.olThVL/journal -> /dev/disk/by-partuuid/4cbc461f-2238-47c0-8171-1b3b688b7682
[node1][WARNIN] DEBUG:ceph-disk:Unmounting /var/lib/ceph/tmp/mnt.olThVL
[node1][WARNIN] INFO:ceph-disk:Running command: /bin/umount -- /var/lib/ceph/tmp/mnt.olThVL
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --typecode=1:4fbd7e29-9d25-41b8-afd0-062c0ceff05d -- /dev/sdc
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdc
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdc
[node1][WARNIN] partx: /dev/sdc: error adding partitions 1-2
[node1][INFO  ] Running command: udevadm trigger --subsystem-match=block --action=add
[node1][INFO  ] checking OSD status...
[node1][INFO  ] Running command: ceph --cluster=ceph osd stat --format=json
[ceph_deploy.osd][DEBUG ] Host node1 is now ready for osd use.
[node1][DEBUG ] connected to host: node1
[node1][DEBUG ] detect platform information from remote host
[node1][DEBUG ] detect machine type
[ceph_deploy.osd][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[ceph_deploy.osd][DEBUG ] Preparing host node1 disk /dev/sdd journal None activate True
[node1][INFO  ] Running command: ceph-disk -v prepare --fs-type xfs --cluster ceph -- /dev/sdd
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=fsid
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mkfs_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_fs_mount_options_xfs
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-osd --cluster=ceph --show-config-value=osd_journal_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_cryptsetup_parameters
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_key_size
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/ceph-conf --cluster=ceph --name=osd. --lookup osd_dmcrypt_type
[node1][WARNIN] INFO:ceph-disk:Will colocate journal with data on /dev/sdd
[node1][WARNIN] DEBUG:ceph-disk:Creating journal partition num 2 size 5120 on /dev/sdd
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --new=2:0:5120M --change-name=2:ceph journal --partition-guid=2:51607277-d2d0-4cdb-bc87-5b21be4b5e14 --typecode=2:45b0969e-9b03-4f30-b4c6-b4b80ceff106 --mbrtogpt -- /dev/sdd
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdd
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdd
[node1][WARNIN] partx: /dev/sdd: error adding partition 2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/51607277-d2d0-4cdb-bc87-5b21be4b5e14
[node1][WARNIN] DEBUG:ceph-disk:Journal is GPT partition /dev/disk/by-partuuid/51607277-d2d0-4cdb-bc87-5b21be4b5e14
[node1][WARNIN] DEBUG:ceph-disk:Creating osd partition on /dev/sdd
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --largest-new=1 --change-name=1:ceph data --partition-guid=1:43e671a0-fe74-4a31-8bac-acc09ce4fec5 --typecode=1:89c57f98-2fe5-4dc0-89c1-f3ad0ceff2be -- /dev/sdd
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on created device /dev/sdd
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdd
[node1][WARNIN] partx: /dev/sdd: error adding partitions 1-2
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/udevadm settle
[node1][WARNIN] DEBUG:ceph-disk:Creating xfs fs on /dev/sdd1
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/mkfs -t xfs -f -i size=2048 -- /dev/sdd1
[node1][DEBUG ] meta-data=/dev/sdd1              isize=2048   agcount=4, agsize=982975 blks
[node1][DEBUG ]          =                       sectsz=512   attr=2, projid32bit=1
[node1][DEBUG ]          =                       crc=0        finobt=0
[node1][DEBUG ] data     =                       bsize=4096   blocks=3931899, imaxpct=25
[node1][DEBUG ]          =                       sunit=0      swidth=0 blks
[node1][DEBUG ] naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
[node1][DEBUG ] log      =internal log           bsize=4096   blocks=2560, version=2
[node1][DEBUG ]          =                       sectsz=512   sunit=0 blks, lazy-count=1
[node1][DEBUG ] realtime =none                   extsz=4096   blocks=0, rtextents=0
[node1][WARNIN] DEBUG:ceph-disk:Mounting /dev/sdd1 on /var/lib/ceph/tmp/mnt.l6qDUC with options noatime,inode64
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/bin/mount -t xfs -o noatime,inode64 -- /dev/sdd1 /var/lib/ceph/tmp/mnt.l6qDUC
[node1][WARNIN] DEBUG:ceph-disk:Preparing osd data dir /var/lib/ceph/tmp/mnt.l6qDUC
[node1][WARNIN] DEBUG:ceph-disk:Creating symlink /var/lib/ceph/tmp/mnt.l6qDUC/journal -> /dev/disk/by-partuuid/51607277-d2d0-4cdb-bc87-5b21be4b5e14
[node1][WARNIN] DEBUG:ceph-disk:Unmounting /var/lib/ceph/tmp/mnt.l6qDUC
[node1][WARNIN] INFO:ceph-disk:Running command: /bin/umount -- /var/lib/ceph/tmp/mnt.l6qDUC
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/sgdisk --typecode=1:4fbd7e29-9d25-41b8-afd0-062c0ceff05d -- /dev/sdd
[node1][DEBUG ] The operation has completed successfully.
[node1][WARNIN] INFO:ceph-disk:calling partx on prepared device /dev/sdd
[node1][WARNIN] INFO:ceph-disk:re-reading known partitions will display errors
[node1][WARNIN] INFO:ceph-disk:Running command: /usr/sbin/partx -a /dev/sdd
[node1][WARNIN] partx: /dev/sdd: error adding partitions 1-2
[node1][INFO  ] Running command: udevadm trigger --subsystem-match=block --action=add
[node1][INFO  ] checking OSD status...
[node1][INFO  ] Running command: ceph --cluster=ceph osd stat --format=json
[ceph_deploy.osd][DEBUG ] Host node1 is now ready for osd use.
```

**"ceph-deploy osd create"会先格式化磁盘为xfs，然后针对每个磁盘创建两个分区。**

**其中第1个分区用作数据，第2个分区用作日志。**

**可用fdisk查看。**

```
[root@node1 ~]# fdisk -l
Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
...
...
#         Start          End    Size  Type            Name
 1     10487808     41943006     15G  unknown         ceph data
 2         2048     10485760      5G  unknown         ceph journal

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
...
...
   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    52430847    26214400   83  Linux
/dev/sda2        52430848    60819455     4194304   82  Linux swap / Solaris

Disk /dev/sdd: 21.5 GB, 21474836480 bytes, 41943040 sectors
...
...
#         Start          End    Size  Type            Name
 1     10487808     41943006     15G  unknown         ceph data
 2         2048     10485760      5G  unknown         ceph journal

Disk /dev/sdc: 21.5 GB, 21474836480 bytes, 41943040 sectors
...
...
#         Start          End    Size  Type            Name
 1     10487808     41943006     15G  unknown         ceph data
 2         2048     10485760      5G  unknown         ceph journal
```


**可用mount查看/dev/sdb1, /dev/sdc1, /dev/sdd1的mount point。**

```
[root@node1 ~]# mount
...
/dev/sdb1 on /var/lib/ceph/osd/ceph-0 type xfs (rw,noatime,seclabel,attr2,inode64,noquota)
/dev/sdc1 on /var/lib/ceph/osd/ceph-1 type xfs (rw,noatime,seclabel,attr2,inode64,noquota)
/dev/sdd1 on /var/lib/ceph/osd/ceph-2 type xfs (rw,noatime,seclabel,attr2,inode64,noquota)
```

####9.5 node1 查看ceph status

```
[root@node1 ~]# ceph status
    cluster 8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a
     health HEALTH_WARN
            64 pgs degraded
            64 pgs stuck degraded
            64 pgs stuck inactive
            64 pgs stuck unclean
            64 pgs stuck undersized
            64 pgs undersized
            too few PGs per OSD (21 < min 30)
     monmap e1: 1 mons at {node1=10.200.29.191:6789/0}
            election epoch 2, quorum 0 node1
     osdmap e13: 3 osds: 3 up, 3 in
      pgmap v20: 64 pgs, 1 pools, 0 bytes data, 0 objects
            101488 kB used, 45947 MB / 46046 MB avail
                  64 undersized+degraded+peered
```

##10. 在node2,node3部署ceph

####10.1 在node1,node2,node3上停止firewalld（底层用的也是iptables)，并禁用firewalld服务

node1:

```
[root@node1 ~]# systemctl stop firewalld.service

[root@node1 ~]# systemctl disable firewalld
rm '/etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service'
rm '/etc/systemd/system/basic.target.wants/firewalld.service'
```

node2:

```
[root@node1 ~]# ssh node2 systemctl stop firewalld.service

[root@node1 ~]# ssh node2 systemctl disable firewalld
rm '/etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service'
rm '/etc/systemd/system/basic.target.wants/firewalld.service'
```

node3:

```
[root@node1 ~]# ssh node3 systemctl stop firewalld.service
[root@node1 ~]#
[root@node1 ~]# ssh node3 systemctl disable firewalld
rm '/etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service'
rm '/etc/systemd/system/basic.target.wants/firewalld.service'
```

####10.2 在node2,node3上部署monitor节点

node2:

```
[root@node1 ~]# ceph-deploy mon add node2
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy mon add node2
[ceph_deploy.mon][INFO  ] ensuring configuration of new mon host: node2
[ceph_deploy.admin][DEBUG ] Pushing admin keys and conf to node2
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[node2][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[ceph_deploy.mon][DEBUG ] Adding mon to cluster ceph, host node2
[ceph_deploy.mon][DEBUG ] using mon address by resolving host: 10.200.29.192
[ceph_deploy.mon][DEBUG ] detecting platform for host node2 ...
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[ceph_deploy.mon][INFO  ] distro info: CentOS Linux 7.1.1503 Core
[node2][DEBUG ] determining if provided host has same hostname in remote
[node2][DEBUG ] get remote short hostname
[node2][DEBUG ] adding mon to node2
[node2][DEBUG ] get remote short hostname
[node2][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[node2][DEBUG ] create the mon path if it does not exist
[node2][DEBUG ] checking for done path: /var/lib/ceph/mon/ceph-node2/done
[node2][DEBUG ] create a done file to avoid re-doing the mon deployment
[node2][DEBUG ] create the init path if it does not exist
[node2][INFO  ] Running command: ceph-mon -i node2 --public-addr 10.200.29.192
[node2][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node2.asok mon_status
[node2][WARNIN] node2 is not defined in `mon initial members`
[node2][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node2.asok mon_status
[node2][DEBUG ] ********************************************************************************
[node2][DEBUG ] status for monitor: mon.node2
[node2][DEBUG ] {
[node2][DEBUG ]   "election_epoch": 1,
[node2][DEBUG ]   "extra_probe_peers": [
[node2][DEBUG ]     "10.200.29.191:6789/0"
[node2][DEBUG ]   ],
[node2][DEBUG ]   "monmap": {
[node2][DEBUG ]     "created": "0.000000",
[node2][DEBUG ]     "epoch": 2,
[node2][DEBUG ]     "fsid": "8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a",
[node2][DEBUG ]     "modified": "2015-07-05 15:33:41.996295",
[node2][DEBUG ]     "mons": [
[node2][DEBUG ]       {
[node2][DEBUG ]         "addr": "10.200.29.191:6789/0",
[node2][DEBUG ]         "name": "node1",
[node2][DEBUG ]         "rank": 0
[node2][DEBUG ]       },
[node2][DEBUG ]       {
[node2][DEBUG ]         "addr": "10.200.29.192:6789/0",
[node2][DEBUG ]         "name": "node2",
[node2][DEBUG ]         "rank": 1
[node2][DEBUG ]       }
[node2][DEBUG ]     ]
[node2][DEBUG ]   },
[node2][DEBUG ]   "name": "node2",
[node2][DEBUG ]   "outside_quorum": [],
[node2][DEBUG ]   "quorum": [],
[node2][DEBUG ]   "rank": 1,
[node2][DEBUG ]   "state": "electing",
[node2][DEBUG ]   "sync_provider": []
[node2][DEBUG ] }
[node2][DEBUG ] ********************************************************************************
[node2][INFO  ] monitor: mon.node2 is running
```

node3:

```
[root@node1 ~]# ceph-deploy mon add node2
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy mon add node2
[ceph_deploy.mon][INFO  ] ensuring configuration of new mon host: node2
[ceph_deploy.admin][DEBUG ] Pushing admin keys and conf to node2
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[node2][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[ceph_deploy.mon][DEBUG ] Adding mon to cluster ceph, host node2
[ceph_deploy.mon][DEBUG ] using mon address by resolving host: 10.200.29.192
[ceph_deploy.mon][DEBUG ] detecting platform for host node2 ...
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[ceph_deploy.mon][INFO  ] distro info: CentOS Linux 7.1.1503 Core
[node2][DEBUG ] determining if provided host has same hostname in remote
[node2][DEBUG ] get remote short hostname
[node2][DEBUG ] adding mon to node2
[node2][DEBUG ] get remote short hostname
[node2][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[node2][DEBUG ] create the mon path if it does not exist
[node2][DEBUG ] checking for done path: /var/lib/ceph/mon/ceph-node2/done
[node2][DEBUG ] create a done file to avoid re-doing the mon deployment
[node2][DEBUG ] create the init path if it does not exist
[node2][INFO  ] Running command: ceph-mon -i node2 --public-addr 10.200.29.192
[node2][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node2.asok mon_status
[node2][WARNIN] node2 is not defined in `mon initial members`
[node2][INFO  ] Running command: ceph --cluster=ceph --admin-daemon /var/run/ceph/ceph-mon.node2.asok mon_status
[node2][DEBUG ] ********************************************************************************
[node2][DEBUG ] status for monitor: mon.node2
[node2][DEBUG ] {
[node2][DEBUG ]   "election_epoch": 1,
[node2][DEBUG ]   "extra_probe_peers": [
[node2][DEBUG ]     "10.200.29.191:6789/0"
[node2][DEBUG ]   ],
[node2][DEBUG ]   "monmap": {
[node2][DEBUG ]     "created": "0.000000",
[node2][DEBUG ]     "epoch": 2,
[node2][DEBUG ]     "fsid": "8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a",
[node2][DEBUG ]     "modified": "2015-07-05 15:33:41.996295",
[node2][DEBUG ]     "mons": [
[node2][DEBUG ]       {
[node2][DEBUG ]         "addr": "10.200.29.191:6789/0",
[node2][DEBUG ]         "name": "node1",
[node2][DEBUG ]         "rank": 0
[node2][DEBUG ]       },
[node2][DEBUG ]       {
[node2][DEBUG ]         "addr": "10.200.29.192:6789/0",
[node2][DEBUG ]         "name": "node2",
[node2][DEBUG ]         "rank": 1
[node2][DEBUG ]       }
[node2][DEBUG ]     ]
[node2][DEBUG ]   },
[node2][DEBUG ]   "name": "node2",
[node2][DEBUG ]   "outside_quorum": [],
[node2][DEBUG ]   "quorum": [],
[node2][DEBUG ]   "rank": 1,
[node2][DEBUG ]   "state": "electing",
[node2][DEBUG ]   "sync_provider": []
[node2][DEBUG ] }
[node2][DEBUG ] ********************************************************************************
[node2][INFO  ] monitor: mon.node2 is running
```

####10.3 查看ceph status
```
[root@node1 ~]# ceph status
    cluster 8c3fb7e2-6750-4e8e-b3f0-ad6afe25bb1a
     health HEALTH_WARN
            64 pgs degraded
            64 pgs stuck degraded
            64 pgs stuck inactive
            64 pgs stuck unclean
            64 pgs stuck undersized
            64 pgs undersized
            too few PGs per OSD (21 < min 30)
            clock skew detected on mon.node2, mon.node3
     monmap e3: 3 mons at {node1=10.200.29.191:6789/0,node2=10.200.29.192:6789/0,node3=10.200.29.193:6789/0}
            election epoch 8, quorum 0,1,2 node1,node2,node3
     osdmap e13: 3 osds: 3 up, 3 in
      pgmap v20: 64 pgs, 1 pools, 0 bytes data, 0 objects
            101488 kB used, 45947 MB / 46046 MB avail
                  64 undersized+degraded+peered
```
