#Ceph internals/Ceph essentials

##1. Object

Ceph的底层就是一个Object Store，所有数据均以Object存放。

唯一标示一个Object的是OID（Object ID）。

##2.数据布局

###2.1 CRUSH算法

全称是Controlled Replication Under Scalable Hash。

1)伪随机分布算法
 
2)可以基于Rule配置
 
例如可以调整Replication count；可以调整Topology（如机房，机柜，服务器等信息）；可以调整权重等。

####2.1.1. CRUSH 查询

![图1](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/1.png "图1")

图1给出了一个Ceph Object读写的大致数据流图。

1)当一个Client要读写数据时，首先会获得Ceph集群的一些信息（随着后续读代码，做实验，需要明确具体是什么样的信息），这其中包括PG(Placement Group)数，要读取/写入的Pool ID。

2)根据Object name和Pool ID计算出 PGID(Place Group ID)

3)CRUSH根据PGID, Cluster State, CRUSH map计算出对应的Primary OSD和Secondary OSD。

####2.1.2. CRUSH Hierarchy

![图2](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/2.png "图2")

对应图2所示，CRUSH Hierarchy包括osd(osd weight), node, rack, row, switch, power circuit, room, data center等。

为了数据安全，在规划CRUSH Map的时候，尽量考虑到把数据分散在不同的rack，不同的switch....，甚至于不同的data center。

####2.1.3. 例子：一个OSD挂掉后的恢复
1)当一个OSD挂掉后，其它OSD（后续需要明确哪些OSD，目前仅粗略知道是同一个Replication Placement Group内的OSD）

在规定时间内没收到心跳，就通知Monitor。 Monitor把这个OSD标记为Down。

2)如果挂掉的OSD在Replication Placement Group中是Primary的，那么同一Placement Group中的某个OSD会被提升为Primary

3)当挂掉的OSD在规定的时间内没恢复，为了维持Replication数满足要求，Ceph会给该Placement Group增加一个新OSD，

  Primary OSD会把相关数据Replicate到新的OSD。

####2.1.4. 例子：添加一些新的OSD
会触发老的数据Reblance到新的OSD。Reblance结束后，会删除被Replicate的老的数据。

为了降低过多数据的Reblance，可以把新OSD的weight设为0，随后慢慢增加。

这样避免性能下降的太厉害。

####2.1.5. 编辑CRUSH Map

1)取出当前系统的CRUSH Map
```
[root@node1 ~]# ceph osd getcrushmap -o crushmap.txt
got crush map from osdmap epoch 180
```

得到的crushmap.txt是一个二进制文件。

2)反编译crushmap.txt
```
[root@node1 ~]# crushtool -d crushmap.txt -o crushmap-decompile
```

得到一个文本文件crushmap-decompile。
```
[root@node1 ~]# cat crushmap-decompile
# begin crush map
tunable choose_local_tries 0
tunable choose_local_fallback_tries 0
tunable choose_total_tries 50
tunable chooseleaf_descend_once 1
tunable straw_calc_version 1

# devices
device 0 osd.0
device 1 osd.1
device 2 osd.2
device 3 osd.3
device 4 osd.4
device 5 osd.5
device 6 osd.6
device 7 osd.7
device 8 osd.8

# types
type 0 osd
type 1 host
type 2 chassis
type 3 rack
type 4 row
type 5 pdu
type 6 pod
type 7 room
type 8 datacenter
type 9 region
type 10 root

# buckets
host node1 {
        id -2           # do not change unnecessarily
        # weight 0.030
        alg straw
        hash 0  # rjenkins1
        item osd.0 weight 0.010
        item osd.1 weight 0.010
        item osd.2 weight 0.010
}
host node2 {
        id -3           # do not change unnecessarily
        # weight 0.030
        alg straw
        hash 0  # rjenkins1
        item osd.3 weight 0.010
        item osd.4 weight 0.010
        item osd.5 weight 0.010
}
host node3 {
        id -4           # do not change unnecessarily
        # weight 0.030
        alg straw
        hash 0  # rjenkins1
        item osd.6 weight 0.010
        item osd.7 weight 0.010
        item osd.8 weight 0.010
}
root default {
        id -1           # do not change unnecessarily
        # weight 0.090
        alg straw
        hash 0  # rjenkins1
        item node1 weight 0.030
        item node2 weight 0.030
        item node3 weight 0.030
}

# rules
rule replicated_ruleset {
        ruleset 0
        type replicated
        min_size 1
        max_size 10
        step take default
        step chooseleaf firstn 0 type host
        step emit
}

# end crush map
```

3)编辑crushmap-decompile

4)重新编译crushmap-decompile

```
[root@node1 ~]# crushtool -c crushmap-decompile -o crushmap-compiled
```

5)为Ceph设置新的CRUSH Map
```
[root@node1 ~]# ceph osd setcrushmap -i crushmap-compiled
```

####2.1.6. 定制Cluster Layout

1)修改前的Layout
```
#ceph osd tree
```

![图3](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/3.png "图3")

2)添加几个Rack（Rack是Host的上一层级）
```
# ceph osd crush add-bucket rack01 rack
# ceph osd crush add-bucket rack02 rack
# ceph osd crush add-bucket rack03 rack
```

3)把Host move到相应的Rack
```
# ceph osd crush move node1 rack=rack01
# ceph osd crush move node2 rack=rack02
# ceph osd crush move node3 rack=rack03
```

4)把Rack move到默认的root节点下
```
# ceph osd crush move rack03 root=default
# ceph osd crush move rack02 root=default
# ceph osd crush move rack01 root=default
```

5)修改后的Layout
```
#ceph osd tree
```

![图4](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/4.png "图4")


###2.2. PG

####2.2.1. 什么是PG

全称是Palcement Group。

1)是一个object的逻辑集合

2)同一PG下的Object被Replicate到相同的OSD

3)根据Pool ID，Object name计算出Placement Group ID (图1所示)。

4)便于追踪和管理海量的Object

![图5](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/5.png "图5")

####2.2.2. PG number
```
Total PGs = (Total_number_of_OSD * 100) / max_replication_count
```

```
Total PGs for 1 Pool= ((Total_number_of_OSD * 100) / max_replication_count) / pool count
```

####2.2.3. 修改PG number 和PGP number

PGP is the total number of placement groups for placement purposes. 应该等于PG number。

获得当前PG number 和 PGP number
```
[root@node1 day0003]# ceph osd pool get rbd pg_num
pg_num: 64
[root@node1 day0003]# ceph osd pool get rbd pgp_num
pgp_num: 64
```

设置PG number 和 PGP number
```
# ceph osd pool set rbd pg_num 256
# ceph osd pool set rbd pgp_num 256
```

####2.2.4. 在一个PG中，某OSD是Primary的，同时在其它PG中该OSD可能是是Secondary或Tertiary
![图6](https://github.com/lzueclipse/learning/blob/master/ceph/day0003/6.png "图6")

###2.3. Pool

####2.3.1. 什么是Pool

1)用来存储object的logical partition

2)可设置自己的owership/access权限

3)可设置自己的replicas number (或者Erasure Code的配置)

4)可设置自己的PG数

5)可设置自己的CRUSH rule

6)Pool中的PG动态map到OSD

####2.3.2. 创建一个pool，并写些数据

1)创建一个名字叫web-services的pool，PG number和PGP number都是128
```
[root@node1 day0003]# ceph osd pool create web-services 128 128
pool 'web-services' created
```

2)检查系统中存在的所有pool

```
[root@node1 day0003]# ceph osd lspools
0 rbd,1 web-services,
```

```
[root@node1 day0003]# rados lspools
rbd
web-services
```

```
[root@node1 day0003]# ceph osd dump
epoch 182
fsid cad73756-0719-4bb1-a1da-aafbde55725a
created 2015-07-26 16:58:30.595358
modified 2015-08-02 17:44:00.653407
flags
pool 0 'rbd' replicated size 3 min_size 2 crush_ruleset 0 object_hash rjenkins pg_num 64 pgp_num 64 last_change 1 flags hashpspool stripe_width 0
pool 1 'web-services' replicated size 3 min_size 2 crush_ruleset 0 object_hash rjenkins pg_num 128 pgp_num 128 last_change 181 flags hashpspool stripe_width 0
max_osd 9
osd.0 up   in  weight 1 up_from 167 up_thru 181 down_at 166 last_clean_interval [138,155) 192.168.1.140:6808/3052 192.168.1.140:6809/3052 192.168.1.140:6810/3052 192.168.1.140:6811/3052 exists,up 8ece204d-b1a9-4b34-90f7-9459d364428c
osd.1 up   in  weight 1 up_from 164 up_thru 181 down_at 163 last_clean_interval [141,155) 192.168.1.140:6804/2735 192.168.1.140:6805/2735 192.168.1.140:6806/2735 192.168.1.140:6807/2735 exists,up 539a9c0c-65cd-495f-bfe0-73855dd39fa6
osd.2 up   in  weight 1 up_from 158 up_thru 181 down_at 157 last_clean_interval [135,155) 192.168.1.140:6800/2385 192.168.1.140:6801/2385 192.168.1.140:6802/2385 192.168.1.140:6803/2385 exists,up a813f1fe-198b-4f1a-a3fb-212d36af9a06
osd.3 up   in  weight 1 up_from 175 up_thru 181 down_at 156 last_clean_interval [149,155) 192.168.1.141:6804/2633 192.168.1.141:6805/2633 192.168.1.141:6806/2633 192.168.1.141:6807/2633 exists,up d6aec060-1a69-4d8c-9915-19097869424a
osd.4 up   in  weight 1 up_from 172 up_thru 181 down_at 156 last_clean_interval [144,155) 192.168.1.141:6800/2273 192.168.1.141:6801/2273 192.168.1.141:6802/2273 192.168.1.141:6803/2273 exists,up 60e01360-cb14-4971-9bc4-523b65bef964
osd.5 up   in  weight 1 up_from 178 up_thru 181 down_at 156 last_clean_interval [152,155) 192.168.1.141:6808/2931 192.168.1.141:6809/2931 192.168.1.141:6810/2931 192.168.1.141:6811/2931 exists,up 75bfe3a3-87aa-49dc-b0f3-c0a70d3368a4
osd.6 up   in  weight 1 up_from 160 up_thru 181 down_at 159 last_clean_interval [127,155) 192.168.1.142:6804/2509 192.168.1.142:6805/2509 192.168.1.142:6806/2509 192.168.1.142:6807/2509 exists,up 4d6d9f42-7cc9-45db-adb3-7510f73dbcc1
osd.7 up   in  weight 1 up_from 158 up_thru 181 down_at 157 last_clean_interval [130,155) 192.168.1.142:6800/2283 192.168.1.142:6801/2283 192.168.1.142:6802/2283 192.168.1.142:6803/2283 exists,up dbd4f4cc-a2e8-40a5-9d8f-2a7100a3c0e1
osd.8 up   in  weight 1 up_from 163 up_thru 181 down_at 162 last_clean_interval [132,155) 192.168.1.142:6808/3002 192.168.1.142:6809/3002 192.168.1.142:6810/3002 192.168.1.142:6811/3002 exists,up 851391b4-c258-4b4c-af62-a56319aee1f2
```

3)设置replication数为2
```
[root@node1 day0003]# ceph osd pool set web-services size 2
set pool 1 size to 2
```

可检查下是否改变：
```
[root@node1 day0003]# ceph osd dump
epoch 184
fsid cad73756-0719-4bb1-a1da-aafbde55725a
created 2015-07-26 16:58:30.595358
modified 2015-08-02 20:09:51.177796
flags
pool 0 'rbd' replicated size 3 min_size 2 crush_ruleset 0 object_hash rjenkins pg_num 64 pgp_num 64 last_change 1 flags hashpspool stripe_width 0
pool 1 'web-services' replicated size 2 min_size 2 crush_ruleset 0 object_hash rjenkins pg_num 128 pgp_num 128 last_change 183 flags hashpspool stripe_width 0
max_osd 9
osd.0 up   in  weight 1 up_from 167 up_thru 183 down_at 166 last_clean_interval [138,155) 192.168.1.140:6808/3052 192.168.1.140:6809/3052 192.168.1.140:6810/3052 192.168.1.140:6811/3052 exists,up 8ece204d-b1a9-4b34-90f7-9459d364428c
osd.1 up   in  weight 1 up_from 164 up_thru 183 down_at 163 last_clean_interval [141,155) 192.168.1.140:6804/2735 192.168.1.140:6805/2735 192.168.1.140:6806/2735 192.168.1.140:6807/2735 exists,up 539a9c0c-65cd-495f-bfe0-73855dd39fa6
osd.2 up   in  weight 1 up_from 158 up_thru 183 down_at 157 last_clean_interval [135,155) 192.168.1.140:6800/2385 192.168.1.140:6801/2385 192.168.1.140:6802/2385 192.168.1.140:6803/2385 exists,up a813f1fe-198b-4f1a-a3fb-212d36af9a06
osd.3 up   in  weight 1 up_from 175 up_thru 183 down_at 156 last_clean_interval [149,155) 192.168.1.141:6804/2633 192.168.1.141:6805/2633 192.168.1.141:6806/2633 192.168.1.141:6807/2633 exists,up d6aec060-1a69-4d8c-9915-19097869424a
osd.4 up   in  weight 1 up_from 172 up_thru 183 down_at 156 last_clean_interval [144,155) 192.168.1.141:6800/2273 192.168.1.141:6801/2273 192.168.1.141:6802/2273 192.168.1.141:6803/2273 exists,up 60e01360-cb14-4971-9bc4-523b65bef964
osd.5 up   in  weight 1 up_from 178 up_thru 183 down_at 156 last_clean_interval [152,155) 192.168.1.141:6808/2931 192.168.1.141:6809/2931 192.168.1.141:6810/2931 192.168.1.141:6811/2931 exists,up 75bfe3a3-87aa-49dc-b0f3-c0a70d3368a4
osd.6 up   in  weight 1 up_from 160 up_thru 183 down_at 159 last_clean_interval [127,155) 192.168.1.142:6804/2509 192.168.1.142:6805/2509 192.168.1.142:6806/2509 192.168.1.142:6807/2509 exists,up 4d6d9f42-7cc9-45db-adb3-7510f73dbcc1
osd.7 up   in  weight 1 up_from 158 up_thru 183 down_at 157 last_clean_interval [130,155) 192.168.1.142:6800/2283 192.168.1.142:6801/2283 192.168.1.142:6802/2283 192.168.1.142:6803/2283 exists,up dbd4f4cc-a2e8-40a5-9d8f-2a7100a3c0e1
osd.8 up   in  weight 1 up_from 163 up_thru 183 down_at 162 last_clean_interval [132,155) 192.168.1.142:6808/3002 192.168.1.142:6809/3002 192.168.1.142:6810/3002 192.168.1.142:6811/3002 exists,up 851391b4-c258-4b4c-af62-a56319aee1f2
```

4)rename pool
```
[root@node1 day0003]# ceph osd pool rename web-services frontend-services
pool 'web-services' renamed to 'frontend-services'
```

查看所有pool：
```
[root@node1 day0003]# ceph osd lspools
0 rbd,1 frontend-services,
```

5)向frontend-services pool存入一个object，做snapshot，删除原始object，用snapshot恢复

向frontend-services pool存入1个object:
```
[root@node1 day0003]# rados -p frontend-services put object1 /etc/hosts
```

查看object1:
```
[root@node1 ~]# rados -p frontend-services ls
object1
```

创建snapshot:
```
[root@node1 learning]# rados  mksnap snapshot1 -p frontend-services
created pool frontend-services snap snapshot1
```

查看snapshot:
```
[root@node1 learning]# rados lssnap -p frontend-services
1       snapshot1       2015.08.09 16:57:16
1 snaps
```

删除object1:
```
[root@node1 learning]# rados rm object1 -p frontend-services
```

查看object1是否已经被删除：
```
[root@node1 learning]# rados ls -p frontend-services
```

在snapshot里查找object1:
```
[root@node1 learning]# rados listsnaps object1 -p frontend-services
object1:
cloneid snaps   size    overlap
1       1       259     []
```

回滚object1:
```
[root@node1 learning]# rados rollback object1 snapshot1 -p frontend-services
rolled back pool frontend-services to snapshot snapshot1
```

查看object1 是否已经恢复：
```
[root@node1 learning]# rados ls -p frontend-services
object1
```

6)删除frontend-services
```
[root@node1 learning]# ceph osd pool delete frontend-services frontend-services --yes-i-really-really-mean-it
pool 'frontend-services' removed
```

###3. Ceph data management
