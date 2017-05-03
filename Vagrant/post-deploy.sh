#!/bin/bash
value=$( grep -ic "entry" /etc/hosts )
if [ $value -eq 0 ]
then
echo "
################ host entry ############

192.168.40.101 client-node1
192.168.40.102 server-node1

######################################################
" > /etc/hosts
fi


ip addr |grep "^3:" |awk -F':' '{print $2}' | xargs ifup

if [ -e /etc/redhat-release ]
then

yum install -y epel-release
yum install -y ntp
yum install -y ntpdate
yum install -y traceroute
yum install -y iperf3
yum install -y iftop
yum install -y pcp-import-iostat2pcp.x86_64
yum groupinstall -y "Development Tools"
yum install -y tcpdump
yum install -y vim-enhanced
yum install -y coreutils
yum install -y kernel-devel
yum install -y kernel-headers
yum install -y crash
yum install -y libpcap-devel.x86_64
yum install -y hwloc

systemctl stop ntpd
systemctl stop ntpdate
ntpdate 0.centos.pool.ntp.org > /dev/null 2> /dev/null
systemctl start ntpdate
systemctl start ntpd


fi
