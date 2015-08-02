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

###2.3. Pools

