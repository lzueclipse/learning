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
1)当一个OSD挂掉后，其它OSD（后续需要明确哪些OSD，猜测是同一个Replication Placement Group内的OSD）在规定时间内没收到心跳，就通知Monitor。
  
  Monitor把这个OSD标记为Down。

2)如果挂掉的OSD在Replication Placement Group中是Primary的，那么同一Placement Group中的某个OSD会被提升为Primary

3)当挂掉的OSD在规定的时间内没恢复，为了维持Replication数满足要求，Ceph会给该Placement Group增加一个新OSD，

  Primary OSD会把相关数据Replicate到新的OSD。

###2.2. PG


###2.3. Pools

