#Ceph internals/Ceph essentials

##1. Object

Ceph的底层就是一个Object Store，所有数据均以Object存放。

唯一标示一个Object的是OID（Object ID）。

##2.数据布局

####2.1 CRUSH算法

全称是Controlled Replication Under Scalable Hash。

1)伪随机分布算法
 
2)可以基于Rule配置
  可以调整Replication count；可以调整Topology（如机房，机柜，服务器等信息）；可以调整权重等。

####2.2
