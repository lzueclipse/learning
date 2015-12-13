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

查看RBD image详细信息:
```
[root@node1 ~]# rbd --image rbd1-for-node4 info
rbd image 'rbd1-for-node4':
        size 10240 MB in 2560 objects
        order 22 (4096 kB objects)
        block_name_prefix: rb.0.11d0.2ae8944a
        format: 1
```

**rbd1-for-node4默认创建在rbd pool(rados lspools可查看所有pool)下。**

###1.2 在node4节点检查内核版本，加载rbd内核模块

检查内核版本：
```
[root@node4 ~]# uname -a
Linux node4 3.10.0-229.el7.x86_64 #1 SMP Fri Mar 6 11:36:42 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux
```

加载rbd内核模块:
```
[root@node4 ~]# modprobe rbd
```

###1.3 在node1，用ceph-deploy 向node4安装ceph二进制文件和配置文件

用ceph-deploy向node4安装ceph二进制:
```
[root@node1 ~]# ceph-deploy install node4
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy install node4
[ceph_deploy.install][DEBUG ] Installing stable version hammer on cluster ceph hosts node4
[ceph_deploy.install][DEBUG ] Detecting platform for host node4 ...
The authenticity of host 'node4 (10.200.128.84)' can't be established.
ECDSA key fingerprint is 78:b3:ba:86:49:95:40:2a:d0:3d:0c:01:78:b7:b8:19.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'node4,10.200.128.84' (ECDSA) to the list of known hosts.
root@node4's password:
root@node4's password:
[node4][DEBUG ] connected to host: node4
[node4][DEBUG ] detect platform information from remote host
[node4][DEBUG ] detect machine type
[ceph_deploy.install][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[node4][INFO  ] installing ceph on node4
[node4][INFO  ] Running command: yum clean all
[node4][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node4][WARNIN] Repodata is over 2 weeks old. Install yum-cron? Or run: yum makecache fast
[node4][DEBUG ] Cleaning repos: base extras updates
[node4][DEBUG ] Cleaning up everything
[node4][DEBUG ] Cleaning up list of fastest mirrors
[node4][INFO  ] adding EPEL repository
[node4][INFO  ] Running command: yum -y install epel-release
[node4][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node4][DEBUG ] Determining fastest mirrors
[node4][DEBUG ]  * base: mirrors.pubyun.com
[node4][DEBUG ]  * extras: mirrors.pubyun.com
[node4][DEBUG ]  * updates: mirrors.sina.cn
[node4][DEBUG ] Resolving Dependencies
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package epel-release.noarch 0:7-5 will be installed
[node4][DEBUG ] --> Finished Dependency Resolution
[node4][DEBUG ]
[node4][DEBUG ] Dependencies Resolved
[node4][DEBUG ]
[node4][DEBUG ] ================================================================================
[node4][DEBUG ]  Package                Arch             Version         Repository        Size
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Installing:
[node4][DEBUG ]  epel-release           noarch           7-5             extras            14 k
[node4][DEBUG ]
[node4][DEBUG ] Transaction Summary
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Install  1 Package
[node4][DEBUG ]
[node4][DEBUG ] Total download size: 14 k
[node4][DEBUG ] Installed size: 24 k
[node4][DEBUG ] Downloading packages:
[node4][DEBUG ] Public key for epel-release-7-5.noarch.rpm is not installed
[node4][WARNIN] warning: /var/cache/yum/x86_64/7/extras/packages/epel-release-7-5.noarch.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
[node4][DEBUG ] Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
[node4][WARNIN] Importing GPG key 0xF4A80EB5:
[node4][WARNIN]  Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
[node4][WARNIN]  Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
[node4][WARNIN]  Package    : centos-release-7-1.1503.el7.centos.2.8.x86_64 (@anaconda)
[node4][WARNIN]  From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
[node4][DEBUG ] Running transaction check
[node4][DEBUG ] Running transaction test
[node4][DEBUG ] Transaction test succeeded
[node4][DEBUG ] Running transaction
[node4][DEBUG ]   Installing : epel-release-7-5.noarch                                      1/1
[node4][DEBUG ]   Verifying  : epel-release-7-5.noarch                                      1/1
[node4][DEBUG ]
[node4][DEBUG ] Installed:
[node4][DEBUG ]   epel-release.noarch 0:7-5
[node4][DEBUG ]
[node4][DEBUG ] Complete!
[node4][INFO  ] Running command: yum -y install yum-priorities
[node4][DEBUG ] Loaded plugins: fastestmirror, langpacks
[node4][WARNIN] http://free.nchc.org.tw/fedora-epel/7/x86_64/repodata/b76f2f1c0d7a523eb37f9171fce05720ca540c559a935b3bbaf4ce220ff51255-primary.sqlite.xz: [Errno 14] HTTP Error 404 - Not Found
[node4][WARNIN] Trying other mirror.
[node4][DEBUG ] Loading mirror speeds from cached hostfile
[node4][DEBUG ]  * base: mirrors.pubyun.com
[node4][DEBUG ]  * epel: ftp.riken.jp
[node4][DEBUG ]  * extras: mirrors.pubyun.com
[node4][DEBUG ]  * updates: mirrors.sina.cn
[node4][DEBUG ] Resolving Dependencies
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package yum-plugin-priorities.noarch 0:1.1.31-29.el7 will be installed
[node4][DEBUG ] --> Finished Dependency Resolution
[node4][DEBUG ]
[node4][DEBUG ] Dependencies Resolved
[node4][DEBUG ]
[node4][DEBUG ] ================================================================================
[node4][DEBUG ]  Package                     Arch         Version              Repository  Size
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Installing:
[node4][DEBUG ]  yum-plugin-priorities       noarch       1.1.31-29.el7        base        24 k
[node4][DEBUG ]
[node4][DEBUG ] Transaction Summary
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Install  1 Package
[node4][DEBUG ]
[node4][DEBUG ] Total download size: 24 k
[node4][DEBUG ] Installed size: 28 k
[node4][DEBUG ] Downloading packages:
[node4][DEBUG ] Running transaction check
[node4][DEBUG ] Running transaction test
[node4][DEBUG ] Transaction test succeeded
[node4][DEBUG ] Running transaction
[node4][DEBUG ]   Installing : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node4][DEBUG ]   Verifying  : yum-plugin-priorities-1.1.31-29.el7.noarch                   1/1
[node4][DEBUG ]
[node4][DEBUG ] Installed:
[node4][DEBUG ]   yum-plugin-priorities.noarch 0:1.1.31-29.el7
[node4][DEBUG ]
[node4][DEBUG ] Complete!
[node4][DEBUG ] Configure Yum priorities to include obsoletes
[node4][WARNIN] check_obsoletes has been enabled for Yum priorities plugin
[node4][INFO  ] Running command: rpm --import https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc
[node4][INFO  ] Running command: rpm -Uvh --replacepkgs http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node4][DEBUG ] Retrieving http://ceph.com/rpm-hammer/el7/noarch/ceph-release-1-0.el7.noarch.rpm
[node4][DEBUG ] Preparing...                          ########################################
[node4][DEBUG ] Updating / installing...
[node4][DEBUG ] ceph-release-1-1.el7                  ########################################
[node4][WARNIN] ensuring that /etc/yum.repos.d/ceph.repo contains a high priority
[node4][WARNIN] altered ceph.repo priorities to contain: priority=1
[node4][INFO  ] Running command: yum -y install ceph ceph-radosgw
[node4][DEBUG ] Loaded plugins: fastestmirror, langpacks, priorities
[node4][DEBUG ] Loading mirror speeds from cached hostfile
[node4][DEBUG ]  * base: mirrors.pubyun.com
[node4][DEBUG ]  * epel: mirror.premi.st
[node4][DEBUG ]  * extras: mirrors.pubyun.com
[node4][DEBUG ]  * updates: mirrors.sina.cn
[node4][DEBUG ] 32 packages excluded due to repository priority protections
[node4][DEBUG ] Resolving Dependencies
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package ceph.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: librados2 = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: librbd1 = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libcephfs1 = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: python-rbd = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: ceph-common = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: python-cephfs = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: python-rados = 1:0.94.5-0.el7 for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: python-requests for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: python-flask for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: hdparm for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libboost_program_options-mt.so.1.53.0()(64bit) for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libtcmalloc.so.4()(64bit) for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libleveldb.so.1()(64bit) for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libcephfs.so.1()(64bit) for package: 1:ceph-0.94.5-0.el7.x86_64
[node4][DEBUG ] ---> Package ceph-radosgw.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: mailcap for package: 1:ceph-radosgw-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Processing Dependency: libfcgi.so.0()(64bit) for package: 1:ceph-radosgw-0.94.5-0.el7.x86_64
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package boost-program-options.x86_64 0:1.53.0-23.el7 will be installed
[node4][DEBUG ] ---> Package ceph-common.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: redhat-lsb-core for package: 1:ceph-common-0.94.5-0.el7.x86_64
[node4][DEBUG ] ---> Package fcgi.x86_64 0:2.4.0-22.el7 will be installed
[node4][DEBUG ] ---> Package gperftools-libs.x86_64 0:2.1-1.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: libunwind.so.8()(64bit) for package: gperftools-libs-2.1-1.el7.x86_64
[node4][DEBUG ] ---> Package hdparm.x86_64 0:9.43-5.el7 will be installed
[node4][DEBUG ] ---> Package leveldb.x86_64 0:1.12.0-5.el7 will be installed
[node4][DEBUG ] ---> Package libcephfs1.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] ---> Package librados2.x86_64 1:0.80.7-2.el7 will be updated
[node4][DEBUG ] ---> Package librados2.x86_64 1:0.94.5-0.el7 will be an update
[node4][DEBUG ] ---> Package librbd1.x86_64 1:0.80.7-2.el7 will be updated
[node4][DEBUG ] ---> Package librbd1.x86_64 1:0.94.5-0.el7 will be an update
[node4][DEBUG ] ---> Package mailcap.noarch 0:2.1.41-2.el7 will be installed
[node4][DEBUG ] ---> Package python-cephfs.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] ---> Package python-flask.noarch 1:0.10.1-3.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: python-itsdangerous for package: 1:python-flask-0.10.1-3.el7.noarch
[node4][DEBUG ] --> Processing Dependency: python-werkzeug for package: 1:python-flask-0.10.1-3.el7.noarch
[node4][DEBUG ] --> Processing Dependency: python-jinja2 for package: 1:python-flask-0.10.1-3.el7.noarch
[node4][DEBUG ] ---> Package python-rados.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] ---> Package python-rbd.x86_64 1:0.94.5-0.el7 will be installed
[node4][DEBUG ] ---> Package python-requests.noarch 0:2.6.0-1.el7_1 will be installed
[node4][DEBUG ] --> Processing Dependency: python-urllib3 >= 1.10.2-1 for package: python-requests-2.6.0-1.el7_1.noarch
[node4][DEBUG ] --> Processing Dependency: python-chardet >= 2.2.1-1 for package: python-requests-2.6.0-1.el7_1.noarch
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package libunwind.x86_64 0:1.1-10.el7 will be installed
[node4][DEBUG ] ---> Package python-chardet.noarch 0:2.0.1-7.el7 will be updated
[node4][DEBUG ] ---> Package python-chardet.noarch 0:2.2.1-1.el7_1 will be an update
[node4][DEBUG ] ---> Package python-itsdangerous.noarch 0:0.23-1.el7 will be installed
[node4][DEBUG ] ---> Package python-jinja2.noarch 0:2.7.2-2.el7 will be installed
[node4][DEBUG ] --> Processing Dependency: python-babel >= 0.8 for package: python-jinja2-2.7.2-2.el7.noarch
[node4][DEBUG ] --> Processing Dependency: python-markupsafe for package: python-jinja2-2.7.2-2.el7.noarch
[node4][DEBUG ] ---> Package python-urllib3.noarch 0:1.10.2-2.el7_1 will be installed
[node4][DEBUG ] ---> Package python-werkzeug.noarch 0:0.9.1-1.el7 will be installed
[node4][DEBUG ] ---> Package redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1 will be installed
[node4][DEBUG ] --> Processing Dependency: redhat-lsb-submod-security(x86-64) = 4.1-27.el7.centos.1 for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node4][DEBUG ] --> Processing Dependency: spax for package: redhat-lsb-core-4.1-27.el7.centos.1.x86_64
[node4][DEBUG ] --> Running transaction check
[node4][DEBUG ] ---> Package python-babel.noarch 0:0.9.6-8.el7 will be installed
[node4][DEBUG ] ---> Package python-markupsafe.x86_64 0:0.11-10.el7 will be installed
[node4][DEBUG ] ---> Package redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1 will be installed
[node4][DEBUG ] ---> Package spax.x86_64 0:1.5.2-11.el7 will be installed
[node4][DEBUG ] --> Finished Dependency Resolution
[node4][DEBUG ]
[node4][DEBUG ] Dependencies Resolved
[node4][DEBUG ]
[node4][DEBUG ] ================================================================================
[node4][DEBUG ]  Package                     Arch    Version                 Repository    Size
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Installing:
[node4][DEBUG ]  ceph                        x86_64  1:0.94.5-0.el7          Ceph          20 M
[node4][DEBUG ]  ceph-radosgw                x86_64  1:0.94.5-0.el7          Ceph         2.3 M
[node4][DEBUG ] Installing for dependencies:
[node4][DEBUG ]  boost-program-options       x86_64  1.53.0-23.el7           base         155 k
[node4][DEBUG ]  ceph-common                 x86_64  1:0.94.5-0.el7          Ceph         6.3 M
[node4][DEBUG ]  fcgi                        x86_64  2.4.0-22.el7            Ceph          45 k
[node4][DEBUG ]  gperftools-libs             x86_64  2.1-1.el7               Ceph         267 k
[node4][DEBUG ]  hdparm                      x86_64  9.43-5.el7              base          83 k
[node4][DEBUG ]  leveldb                     x86_64  1.12.0-5.el7            Ceph         158 k
[node4][DEBUG ]  libcephfs1                  x86_64  1:0.94.5-0.el7          Ceph         1.9 M
[node4][DEBUG ]  libunwind                   x86_64  1.1-10.el7              epel          63 k
[node4][DEBUG ]  mailcap                     noarch  2.1.41-2.el7            base          31 k
[node4][DEBUG ]  python-babel                noarch  0.9.6-8.el7             base         1.4 M
[node4][DEBUG ]  python-cephfs               x86_64  1:0.94.5-0.el7          Ceph          11 k
[node4][DEBUG ]  python-flask                noarch  1:0.10.1-3.el7          Ceph-noarch  204 k
[node4][DEBUG ]  python-itsdangerous         noarch  0.23-1.el7              Ceph-noarch   23 k
[node4][DEBUG ]  python-jinja2               noarch  2.7.2-2.el7             base         515 k
[node4][DEBUG ]  python-markupsafe           x86_64  0.11-10.el7             base          25 k
[node4][DEBUG ]  python-rados                x86_64  1:0.94.5-0.el7          Ceph          28 k
[node4][DEBUG ]  python-rbd                  x86_64  1:0.94.5-0.el7          Ceph          18 k
[node4][DEBUG ]  python-requests             noarch  2.6.0-1.el7_1           updates       94 k
[node4][DEBUG ]  python-urllib3              noarch  1.10.2-2.el7_1          updates      100 k
[node4][DEBUG ]  python-werkzeug             noarch  0.9.1-1.el7             Ceph-noarch  562 k
[node4][DEBUG ]  redhat-lsb-core             x86_64  4.1-27.el7.centos.1     base          38 k
[node4][DEBUG ]  redhat-lsb-submod-security  x86_64  4.1-27.el7.centos.1     base          15 k
[node4][DEBUG ]  spax                        x86_64  1.5.2-11.el7            base         259 k
[node4][DEBUG ] Updating for dependencies:
[node4][DEBUG ]  librados2                   x86_64  1:0.94.5-0.el7          Ceph         1.7 M
[node4][DEBUG ]  librbd1                     x86_64  1:0.94.5-0.el7          Ceph         1.8 M
[node4][DEBUG ]  python-chardet              noarch  2.2.1-1.el7_1           updates      227 k
[node4][DEBUG ]
[node4][DEBUG ] Transaction Summary
[node4][DEBUG ] ================================================================================
[node4][DEBUG ] Install  2 Packages (+23 Dependent packages)
[node4][DEBUG ] Upgrade             (  3 Dependent packages)
[node4][DEBUG ]
[node4][DEBUG ] Total download size: 38 M
[node4][DEBUG ] Downloading packages:
[node4][DEBUG ] No Presto metadata available for Ceph
[node4][DEBUG ] Not downloading deltainfo for updates, MD is 302 k and rpms are 227 k
[node4][DEBUG ] Public key for libunwind-1.1-10.el7.x86_64.rpm is not installed
[node4][WARNIN] warning: /var/cache/yum/x86_64/7/epel/packages/libunwind-1.1-10.el7.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID 352c64e5: NOKEY
[node4][DEBUG ] --------------------------------------------------------------------------------
[node4][DEBUG ] Total                                              1.4 MB/s |  38 MB  00:26
[node4][DEBUG ] Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
[node4][WARNIN] Importing GPG key 0x352C64E5:
[node4][WARNIN]  Userid     : "Fedora EPEL (7) <epel@fedoraproject.org>"
[node4][WARNIN]  Fingerprint: 91e9 7d7c 4a5e 96f1 7f3e 888f 6a2f aea2 352c 64e5
[node4][WARNIN]  Package    : epel-release-7-5.noarch (@extras)
[node4][WARNIN]  From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
[node4][DEBUG ] Running transaction check
[node4][DEBUG ] Running transaction test
[node4][DEBUG ] Transaction test succeeded
[node4][DEBUG ] Running transaction
[node4][WARNIN] Warning: RPMDB altered outside of yum.
[node4][DEBUG ]   Updating   : 1:librados2-0.94.5-0.el7.x86_64                             1/31
[node4][DEBUG ]   Installing : 1:python-rados-0.94.5-0.el7.x86_64                          2/31
[node4][DEBUG ]   Updating   : 1:librbd1-0.94.5-0.el7.x86_64                               3/31
[node4][DEBUG ]   Installing : 1:python-rbd-0.94.5-0.el7.x86_64                            4/31
[node4][DEBUG ]   Installing : 1:libcephfs1-0.94.5-0.el7.x86_64                            5/31
[node4][DEBUG ]   Installing : 1:python-cephfs-0.94.5-0.el7.x86_64                         6/31
[node4][DEBUG ]   Installing : python-urllib3-1.10.2-2.el7_1.noarch                        7/31
[node4][DEBUG ]   Installing : python-werkzeug-0.9.1-1.el7.noarch                          8/31
[node4][DEBUG ]   Installing : boost-program-options-1.53.0-23.el7.x86_64                  9/31
[node4][DEBUG ]   Updating   : python-chardet-2.2.1-1.el7_1.noarch                        10/31
[node4][DEBUG ]   Installing : python-requests-2.6.0-1.el7_1.noarch                       11/31
[node4][DEBUG ]   Installing : python-babel-0.9.6-8.el7.noarch                            12/31
[node4][DEBUG ]   Installing : python-markupsafe-0.11-10.el7.x86_64                       13/31
[node4][DEBUG ]   Installing : python-jinja2-2.7.2-2.el7.noarch                           14/31
[node4][DEBUG ]   Installing : leveldb-1.12.0-5.el7.x86_64                                15/31
[node4][DEBUG ]   Installing : fcgi-2.4.0-22.el7.x86_64                                   16/31
[node4][DEBUG ]   Installing : hdparm-9.43-5.el7.x86_64                                   17/31
[node4][DEBUG ]   Installing : libunwind-1.1-10.el7.x86_64                                18/31
[node4][DEBUG ]   Installing : gperftools-libs-2.1-1.el7.x86_64                           19/31
[node4][DEBUG ]   Installing : spax-1.5.2-11.el7.x86_64                                   20/31
[node4][DEBUG ]   Installing : mailcap-2.1.41-2.el7.noarch                                21/31
[node4][DEBUG ]   Installing : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64      22/31
[node4][DEBUG ]   Installing : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 23/31
[node4][DEBUG ]   Installing : 1:ceph-common-0.94.5-0.el7.x86_64                          24/31
[node4][DEBUG ]   Installing : python-itsdangerous-0.23-1.el7.noarch                      25/31
[node4][DEBUG ]   Installing : 1:python-flask-0.10.1-3.el7.noarch                         26/31
[node4][DEBUG ]   Installing : 1:ceph-0.94.5-0.el7.x86_64                                 27/31
[node4][DEBUG ]   Installing : 1:ceph-radosgw-0.94.5-0.el7.x86_64                         28/31
[node4][DEBUG ]   Cleanup    : 1:librbd1-0.80.7-2.el7.x86_64                              29/31
[node4][DEBUG ]   Cleanup    : python-chardet-2.0.1-7.el7.noarch                          30/31
[node4][DEBUG ]   Cleanup    : 1:librados2-0.80.7-2.el7.x86_64                            31/31
[node4][DEBUG ]   Verifying  : 1:python-flask-0.10.1-3.el7.noarch                          1/31
[node4][DEBUG ]   Verifying  : python-itsdangerous-0.23-1.el7.noarch                       2/31
[node4][DEBUG ]   Verifying  : redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64       3/31
[node4][DEBUG ]   Verifying  : mailcap-2.1.41-2.el7.noarch                                 4/31
[node4][DEBUG ]   Verifying  : spax-1.5.2-11.el7.x86_64                                    5/31
[node4][DEBUG ]   Verifying  : 1:libcephfs1-0.94.5-0.el7.x86_64                            6/31
[node4][DEBUG ]   Verifying  : libunwind-1.1-10.el7.x86_64                                 7/31
[node4][DEBUG ]   Verifying  : 1:ceph-0.94.5-0.el7.x86_64                                  8/31
[node4][DEBUG ]   Verifying  : 1:librados2-0.94.5-0.el7.x86_64                             9/31
[node4][DEBUG ]   Verifying  : 1:ceph-common-0.94.5-0.el7.x86_64                          10/31
[node4][DEBUG ]   Verifying  : hdparm-9.43-5.el7.x86_64                                   11/31
[node4][DEBUG ]   Verifying  : fcgi-2.4.0-22.el7.x86_64                                   12/31
[node4][DEBUG ]   Verifying  : leveldb-1.12.0-5.el7.x86_64                                13/31
[node4][DEBUG ]   Verifying  : 1:python-rbd-0.94.5-0.el7.x86_64                           14/31
[node4][DEBUG ]   Verifying  : python-markupsafe-0.11-10.el7.x86_64                       15/31
[node4][DEBUG ]   Verifying  : 1:python-rados-0.94.5-0.el7.x86_64                         16/31
[node4][DEBUG ]   Verifying  : gperftools-libs-2.1-1.el7.x86_64                           17/31
[node4][DEBUG ]   Verifying  : 1:python-cephfs-0.94.5-0.el7.x86_64                        18/31
[node4][DEBUG ]   Verifying  : python-babel-0.9.6-8.el7.noarch                            19/31
[node4][DEBUG ]   Verifying  : python-jinja2-2.7.2-2.el7.noarch                           20/31
[node4][DEBUG ]   Verifying  : 1:librbd1-0.94.5-0.el7.x86_64                              21/31
[node4][DEBUG ]   Verifying  : 1:ceph-radosgw-0.94.5-0.el7.x86_64                         22/31
[node4][DEBUG ]   Verifying  : python-requests-2.6.0-1.el7_1.noarch                       23/31
[node4][DEBUG ]   Verifying  : python-chardet-2.2.1-1.el7_1.noarch                        24/31
[node4][DEBUG ]   Verifying  : boost-program-options-1.53.0-23.el7.x86_64                 25/31
[node4][DEBUG ]   Verifying  : redhat-lsb-core-4.1-27.el7.centos.1.x86_64                 26/31
[node4][DEBUG ]   Verifying  : python-werkzeug-0.9.1-1.el7.noarch                         27/31
[node4][DEBUG ]   Verifying  : python-urllib3-1.10.2-2.el7_1.noarch                       28/31
[node4][DEBUG ]   Verifying  : 1:librbd1-0.80.7-2.el7.x86_64                              29/31
[node4][DEBUG ]   Verifying  : 1:librados2-0.80.7-2.el7.x86_64                            30/31
[node4][DEBUG ]   Verifying  : python-chardet-2.0.1-7.el7.noarch                          31/31
[node4][DEBUG ]
[node4][DEBUG ] Installed:
[node4][DEBUG ]   ceph.x86_64 1:0.94.5-0.el7         ceph-radosgw.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]
[node4][DEBUG ] Dependency Installed:
[node4][DEBUG ]   boost-program-options.x86_64 0:1.53.0-23.el7
[node4][DEBUG ]   ceph-common.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   fcgi.x86_64 0:2.4.0-22.el7
[node4][DEBUG ]   gperftools-libs.x86_64 0:2.1-1.el7
[node4][DEBUG ]   hdparm.x86_64 0:9.43-5.el7
[node4][DEBUG ]   leveldb.x86_64 0:1.12.0-5.el7
[node4][DEBUG ]   libcephfs1.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   libunwind.x86_64 0:1.1-10.el7
[node4][DEBUG ]   mailcap.noarch 0:2.1.41-2.el7
[node4][DEBUG ]   python-babel.noarch 0:0.9.6-8.el7
[node4][DEBUG ]   python-cephfs.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   python-flask.noarch 1:0.10.1-3.el7
[node4][DEBUG ]   python-itsdangerous.noarch 0:0.23-1.el7
[node4][DEBUG ]   python-jinja2.noarch 0:2.7.2-2.el7
[node4][DEBUG ]   python-markupsafe.x86_64 0:0.11-10.el7
[node4][DEBUG ]   python-rados.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   python-rbd.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   python-requests.noarch 0:2.6.0-1.el7_1
[node4][DEBUG ]   python-urllib3.noarch 0:1.10.2-2.el7_1
[node4][DEBUG ]   python-werkzeug.noarch 0:0.9.1-1.el7
[node4][DEBUG ]   redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1
[node4][DEBUG ]   redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1
[node4][DEBUG ]   spax.x86_64 0:1.5.2-11.el7
[node4][DEBUG ]
[node4][DEBUG ] Dependency Updated:
[node4][DEBUG ]   librados2.x86_64 1:0.94.5-0.el7            librbd1.x86_64 1:0.94.5-0.el7
[node4][DEBUG ]   python-chardet.noarch 0:2.2.1-1.el7_1
[node4][DEBUG ]
[node4][DEBUG ] Complete!
[node4][INFO  ] Running command: ceph --version
[node4][DEBUG ] ceph version 0.94.5 (9764da52395923e0b32908d83a9f7304401fee43)
```

用ceph-deploy向node4推送配置文件ceph.conf，和用于认证的秘钥文件ceph.client.admin.keyring ：
```
[root@node1 ~]# ceph-deploy admin node4
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy admin node4
[ceph_deploy.admin][DEBUG ] Pushing admin keys and conf to node4
root@node4's password:
root@node4's password:
[node4][DEBUG ] connected to host: node4
[node4][DEBUG ] detect platform information from remote host
[node4][DEBUG ] detect machine type
[node4][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
```


###1.4 在node4节查找rbd1-for-node4，并挂载

ceph.conf和ceph.client.admin.keyring文件
```
[root@node4 ~]# cd /etc/ceph/
[root@node4 ceph]# ll
total 12
-rw-------. 1 root root  63 Dec  1 10:38 ceph.client.admin.keyring
-rw-r--r--. 1 root root 228 Dec  1 10:38 ceph.conf
-rwxr-xr-x. 1 root root  92 Oct 27 00:12 rbdmap
-rw-------. 1 root root   0 Dec  1 10:38 tmp8JOlh0
```

查看RBD设备：
```
[root@node4 ~]# rbd ls
rbd1-for-node4
```

查看RBD image info:
```
[root@node4 ~]# rbd info --image rbd1-for-node4
rbd image 'rbd1-for-node4':
        size 10240 MB in 2560 objects
        order 22 (4096 kB objects)
        block_name_prefix: rb.0.11d0.2ae8944a
        format: 1
```

在node4，map rbd1-for-node4:
```
[root@node4 ~]# rbd map --image rbd1-for-node4
/dev/rbd0
```

列出node4已经map的RBD设备：
```
[root@node4 ~]# rbd showmapped
id pool image          snap device
0  rbd  rbd1-for-node4 -    /dev/rbd0
```

用fdisk查看/dev/rbd0:
```
[root@node4 ~]# fdisk -l /dev/rbd0

Disk /dev/rbd0: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 4194304 bytes / 4194304 bytes
```

格式化/dev/rbd0为xfs文件系统：
```
[root@node4 ~]# mkfs.xfs /dev/rbd0
log stripe unit (4194304 bytes) is too large (maximum is 256KiB)
log stripe unit adjusted to 32KiB
meta-data=/dev/rbd0              isize=256    agcount=17, agsize=162816 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=0        finobt=0
data     =                       bsize=4096   blocks=2621440, imaxpct=25
         =                       sunit=1024   swidth=1024 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=8 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

挂载/dev/rbd0:
```
[root@node4 ~]# mkdir /mnt/ceph-vol1
[root@node4 ~]#
[root@node4 ~]# mount /dev/rbd0 /mnt/ceph-vol1/
[root@node4 ~]#
```

写文件测试：
```
[root@node4 ~]# dd if=/dev/zero of=/mnt/ceph-vol1/file1 count=100 bs=1M
100+0 records in
100+0 records out
104857600 bytes (105 MB) copied, 0.10709 s, 979 MB/s
[root@node4 ~]# ls -la /mnt/ceph-vol1/
total 102400
drwxr-xr-x. 2 root root        18 Dec  1 19:44 .
drwxr-xr-x. 3 root root        22 Dec  1 19:33 ..
-rw-r--r--. 1 root root 104857600 Dec  1 19:44 file1
```
###1.5 在node4，改变rbd1-for-node4的大小

rbd1-for-node4大小从10GB扩大到20GB：
```
[root@node4 ~]# rbd resize rbd/rbd1-for-node4 --size 20480
Resizing image: 100% complete...done.
```

查看rbd1-for-node4 image info:
```
[root@node4 ~]# rbd info --image rbd1-for-node4
rbd image 'rbd1-for-node4':
        size 20480 MB in 5120 objects
        order 22 (4096 kB objects)
        block_name_prefix: rb.0.11d0.2ae8944a
        format: 1
```

xfs resize:
```
[root@node4 ~]# xfs_growfs -d /mnt/ceph-vol1/
meta-data=/dev/rbd0              isize=256    agcount=17, agsize=162816 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=0        finobt=0
data     =                       bsize=4096   blocks=2621440, imaxpct=25
         =                       sunit=1024   swidth=1024 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
log      =internal               bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=8 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 2621440 to 5242880
```

df 查看：
```
[root@node4 ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda3        36G  3.9G   32G  11% /
devtmpfs        3.9G     0  3.9G   0% /dev
tmpfs           3.9G   80K  3.9G   1% /dev/shm
tmpfs           3.9G   17M  3.9G   1% /run
tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/sda1       497M  121M  377M  25% /boot
/dev/rbd0        20G  134M   20G   1% /mnt/ceph-vol1
```

###1.6 RBD snapshot 测试
创建测试文件:
```
[root@node4 ~]# echo "Hello, this is Ceph RBD snapshot test" > /mnt/ceph-vol1/snapshot_test_file
```

检查/mnt/ceph-vol1下的文件：
```
[root@node4 ~]# ls -l /mnt/ceph-vol1/
total 102404
-rw-r--r--. 1 root root 104857600 Dec  1 19:44 file1
-rw-r--r--. 1 root root        38 Dec  1 20:35 snapshot_test_file
```

对rbd1-for-node4创建snapshot:
```
[root@node4 ~]# rbd snap create rbd/rbd1-for-node4@snap1
```

查看rbd1-for-node4的snapshot:
```
[root@node4 ~]# rbd snap ls rbd/rbd1-for-node4
SNAPID NAME      SIZE
     2 snap1 20480 MB
```

删除/mnt/ceph-vol1下的文件：
```
[root@node4 ~]# rm -f /mnt/ceph-vol1/file1
[root@node4 ~]# rm -f /mnt/ceph-vol1/snapshot_test_file
```

检查/mnt/ceph-vol1下的文件：
```
[root@node4 ~]# ls -l /mnt/ceph-vol1/
total 0
```

rollback 数据：
```
[root@node4 ~]# rbd snap rollback rbd/rbd1-for-node4@snap1
Rolling back to snapshot: 100% complete...done.
```

查看/mnt/ceph-vol1，数据没回来：
```
[root@node4 ~]# ls -l /mnt/ceph-vol1/
total 0
```

卸载并重新挂载/mnt/ceph-vol1:
```
[root@node4 ~]# umount /mnt/ceph-vol1/
[root@node4 ~]#
[root@node4 ~]# mount /dev/rbd0 /mnt/ceph-vol1/
[root@node4 ~]#
```

查看/mnt/ceph-vol1，数据回来了：
```
[root@node4 ~]# ls -l /mnt/ceph-vol1/
total 102404
-rw-r--r--. 1 root root 104857600 Dec  1 19:44 file1
-rw-r--r--. 1 root root        38 Dec  1 20:35 snapshot_test_file
```

删除snapshot:
```
[root@node4 ~]# rbd snap rm rbd/rbd1-for-node4@snap1
```

Ceph提供了一个删除某imge下所有snapshot的命令：
```
[root@node4 ~]# rbd snap purge rbd/rbd1-for-node4
Removing all snapshots: 100% complete...done.
```

删除RBD image rbd1-for-node4可使用命令（我没有执行，因为我还要用rbd1-for-node4):
```
[root@node4 ~]# rbd rm rbd1-for-node4 -p rbd
```

###1.7 RBD clone测试
Ceph能从RBD snapshot创建Copy-on-write(COW) clones。

Snapshot是只读的，但COW clone是可写的。

下图给出了RBD块设备，RBD snapshot，RBD COW clone三者之间的关系。

![图2](https://github.com/lzueclipse/learning/blob/master/ceph/day0004/2.png "图2")

Ceph会保留clone到它parent snapshot的引用关系，在创建clone前，需要保护parent snapshot不被删除(下面实验会给出命令)。

**Clone和RBD一样，is writable, is resizable, can create new snapshot, can be cloned further!!**

RBD imgae定义了两种格式format-1和format-2，这两种格式都支持RBD snapshot，**但只有format-2支持COW clone**。

在node1上创建类型为format-2的RBD image，名字为rbd2-for-node4:
```
[root@node1 ~]# rbd create rbd2-for-node4 --size 10240 --image-format 2

```

在node1上查看rbd2-for-node4:
```
[root@node1 ~]# rbd info --image rbd/rbd2-for-node4
rbd image 'rbd2-for-node4':
        size 10240 MB in 2560 objects
        order 22 (4096 kB objects)
        block_name_prefix: rbd_data.12302ae8944a
        format: 2
        features: layering
        flags:

```

在node1创建snapshot:
```
[root@node1 ~]# rbd snap create rbd/rbd2-for-node4@snapshot_for_clone
```

在node1需要保护该snapshot，**这步非常重要**，如果snapshot丢了，后续的COW clone会被损坏：
```
[root@node1 ~]# rbd snap protect rbd/rbd2-for-node4@snapshot_for_clone
```

在node1，创建COW clone，名字为rbd3-for-node4:
```
[root@node1 ~]# rbd clone rbd/rbd2-for-node4@snapshot_for_clone rbd/rbd3-for-node4
```

在node1，查看rbd3-for-node4，注意到它的parent为一个snapshot:
```

[root@node1 ~]# rbd info --pool rbd --image rbd3-for-node4
rbd image 'rbd3-for-node4':
        size 10240 MB in 2560 objects
        order 22 (4096 kB objects)
        block_name_prefix: rbd_data.123c3d1b58ba
        format: 2
        features: layering
        flags:
        parent: rbd/rbd2-for-node4@snapshot_for_clone
        verlap: 10240 MB
```

Clone中包含了parent snapshot的数据，我们可以用如下命令拆分开COW clone和parent snapshot，在node1节点：
```
[root@node1 ~]# rbd flatten rbd/rbd3-for-node4
Image flatten: 100% complete...done.
```

在node1，再次查看rbd3-for-node4，发现其parent snapshot已经不存在，rbd3-for-node4成为独立的RBD image：
```
[root@node1 ~]# rbd info --pool rbd --image rbd3-for-node4
rbd image 'rbd3-for-node4':
        size 10240 MB in 2560 objects
        order 22 (4096 kB objects)
        lock_name_prefix: rbd_data.123c3d1b58ba
        format: 2
        features: layering
        flags:
```

在node1，不再保护该snapshot:
```
[root@node1 ~]# rbd snap unprotect rbd/rbd2-for-node4@snapshot_for_clone
```

在node1，删除该snapshot：
```
[root@node1 ~]# rbd snap rm rbd/rbd2-for-node4@snapshot_for_clone
```

##2. Ceph 文件系统(CephFS)

CephFS需要用到Metadata Server(MDS)，我们在node1向node2安装MDS。

```
[root@node1 ~]# ceph-deploy mds create node2
[ceph_deploy.conf][DEBUG ] found configuration file at: /root/.cephdeploy.conf
[ceph_deploy.cli][INFO  ] Invoked (1.5.25): /usr/bin/ceph-deploy mds create node2
[ceph_deploy.mds][DEBUG ] Deploying mds, cluster ceph hosts node2:node2
[node2][DEBUG ] connected to host: node2
[node2][DEBUG ] detect platform information from remote host
[node2][DEBUG ] detect machine type
[ceph_deploy.mds][INFO  ] Distro info: CentOS Linux 7.1.1503 Core
[ceph_deploy.mds][DEBUG ] remote host will use sysvinit
[ceph_deploy.mds][DEBUG ] deploying mds bootstrap to node2
[node2][DEBUG ] write cluster configuration to /etc/ceph/{cluster}.conf
[node2][WARNIN] mds keyring does not exist yet, creating one
[node2][DEBUG ] create a keyring file
[node2][DEBUG ] create path if it doesn't exist
[node2][INFO  ] Running command: ceph --cluster ceph --name client.bootstrap-mds --keyring /var/lib/ceph/bootstrap-mds/ceph.keyring auth get-or-create mds.node2 osd allow rwx mds allow mon allow profile mds -o /var/lib/ceph/mds/ceph-node2/keyring
[node2][INFO  ] Running command: service ceph start mds.node2
[node2][DEBUG ] === mds.node2 ===
[node2][DEBUG ] Starting Ceph mds.node2 on node2...
[node2][WARNIN] Running as unit run-30145.service.
[node2][INFO  ] Running command: systemctl enable ceph
[node2][WARNIN] ceph.service is not a native service, redirecting to /sbin/chkconfig.
[node2][WARNIN] Executing /sbin/chkconfig ceph on
[node2][WARNIN] The unit files have no [Install] section. They are not meant to be enabled
[node2][WARNIN] using systemctl.
[node2][WARNIN] Possible reasons for having this kind of units are:
[node2][WARNIN] 1) A unit may be statically enabled by being symlinked from another unit's
[node2][WARNIN]    .wants/ or .requires/ directory.
[node2][WARNIN] 2) A unit's purpose may be to act as a helper for some other unit which has
[node2][WARNIN]    a requirement dependency on it.
[node2][WARNIN] 3) A unit may be started when needed via activation (socket, path, timer,
[node2][WARNIN]    D-Bus, udev, scripted systemctl call, ...).
```

CephFS支持两种挂载方法，从kernel挂载和从FUSE(File System in User Space)挂载。

###2.1 从内核挂载CephFS

在node4，创建挂载目录:
```
[root@node4 ~]# mkdir /mnt/kernel_cephfs
```

在node4，检查admin秘钥：
```
[root@node4 ~]# cat /etc/ceph/ceph.client.admin.keyring
[client.admin]
        key = AQAvzU1WCo1qOhAA9wPRhJVTsgbUh9e1sT9bGQ==
```

在node4，挂载CephFS, **失败了**：
```
[root@node4 ~]# mount -t ceph node1:6789:/ /mnt/kernel_cephfs/ -o name=admin,secret=AQAvzU1WCo1qOhAA9wPRhJVTsgbUh9e1sT9bGQ==
mount error 5 = Input/output error
```

Trouble shooting，"ceph -s"没有mdsmap信息:
```
[root@node4 ~]# ceph -s
    cluster f109ad6d-e9a2-45a2-8794-05af916b4174
     health HEALTH_WARN
            clock skew detected on mon.node2
            tool few PGs per OSD (21 < min 30)
            Monitor clock skew detected
     monmap e3: 3 mons at {node1=10.200.128.81:6789/0,node2=10.200.128.82:6789/0,node3=10.200.128.83:6789/0}
            election epoch 22, quorum 0,1,2 node1,node2,node3
     osdmap e66: 9 osds: 9 up, 9 in
      pgmap v1993: 64 pgs, 1 pools, 214 MB data, 2654 objects
            1023 MB used, 133 GB / 134 GB avail
                 64 active+clean
```

**限于目前对Ceph的了解，我没能解决这个问题，导致没有mount成功，随着下面深入的学习，我会找到相关代码来Trouble shooting.**

为了避免暴露秘钥，可以将秘钥写入/etc/ceph/mykey，然后:
```
mount -t ceph node1:6789:/ /mnt/kernel_cephfs -o name=admin,secretfile=/etc/ceph/mykey
```

也可以加入/etc/fstab：
```
192.168.57.101:6789:/ /mnt/kernel_cephfs ceph name=admin,secretfile=/etc/ceph/adminkey,noatime 0 2
```

###2.2 以FUSE方式挂载CephFS
在node4, 安装ceph-fuse:
```
[root@node4 ~]# yum install ceph-fuse
```

在node4，创建挂载目录：
```
[root@node4 ~]# mkdir /mnt/fuse_cephfs
```

挂载，仍然失败：
**限于目前对Ceph的了解，我没能解决这个问题，导致没有mount成功，随着下面深入的学习，我会找到相关代码来Trouble shooting.**
```
[root@node4 ~]# ceph-fuse -m node1:6789 /mnt/fuse_cephfs/
```

也可以加入/etc/fstab：
```
id=admin /mnt/fuse_cephfs fuse.ceph defaults 0 0
```

##3. Ceph对象存储
每一个对象，包括了data、metadata、unique identifier。

对象存储不能直接通过文件系统访问，只能通过应用层的API访问。

Ceph通过RADOS Gateway提供兼容S3和Swift的RESTful API，来访问对象存储。

![图3](https://github.com/lzueclipse/learning/blob/master/ceph/day0004/3.png "图3")

###3.1 在node5，安装RADOS gateway

需要安装apache，创建ceph-apache.repo：
```
[root@node5 ~]# cat /etc/yum.repos.d/ceph-apache.repo
[apache2-ceph-noarch]
name=Apache noarch packages for Ceph
baseurl=http://gitbuilder.ceph.com/apache2-rpm-centos7-x86_64-basic/ref/master
enabled=1
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/autobuild.asc

[apache2-ceph-source]
name=Apache source packages for Ceph
baseurl=http://gitbuilder.ceph.com/apache2-rpm-centos7-x86_64-basic/ref/master
enabled=0
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/autobuild.asc
[root@node5 ~]#
```

创建ceph-fastcgi.rep:
```

[root@node5 ~]# cat /etc/yum.repos.d/ceph-fastcgi.repo
[fastcgi-ceph-basearch]
name=FastCGI basearch packages for Ceph
baseurl=http://gitbuilder.ceph.com/mod_fastcgi-rpm-centos7-x86_64-basic/ref/master
enabled=1
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/autobuild.asc

[fastcgi-ceph-noarch]
name=FastCGI noarch packages for Ceph
baseurl=http://gitbuilder.ceph.com/mod_fastcgi-rpm-centos7-x86_64-basic/ref/master
enabled=1
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/autobuild.asc

[fastcgi-ceph-source]
name=FastCGI source packages for Ceph
baseurl=http://gitbuilder.ceph.com/mod_fastcgi-rpm-centos7-x86_64-basic/ref/master
enabled=0
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/autobuild.asc
[root@node5 ~]#
```

创建ceph.repo:
```
[root@node5 ~]# cat /etc/yum.repos.d/ceph.repo
[Ceph]
name=Ceph packages for $basearch
baseurl=http://ceph.com/rpm-hammer/el7/$basearch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc

[Ceph-noarch]
name=Ceph noarch packages
baseurl=http://ceph.com/rpm-hammer/el7/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc

[ceph-source]
name=Ceph source packages
baseurl=http://ceph.com/rpm-hammer/el7/SRPMS
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc
[root@node5 ~]#
```

安装yum-plugin-priorities:
```
```


###3.2
###3.3
###3.4

##4. 
###4.1
###4.2
###4.3
###4.4

###参考文献:

>\[1] Learning Ceph, <http://pan.baidu.com/s/1kTEK70j>

>\[2] Ceph Essentials, <http://pan.baidu.com/s/1sj3EmJV>


