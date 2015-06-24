# System Performance, tools and test

##Day one
[gstack and flame graph](./gstack_flamegraph/) 
采用gstack每分钟取样一次，输出到test.gs中。
利用cat test.gs |./stackcollapse-gstack.pl |./flamegraph.pl > test.svg
生成火焰图。
关于火焰图，请参考：
[http://www.brendangregg.com/flamegraphs.html](http://www.brendangregg.com/flamegraphs.html "Brendan Gregg")
[https://github.com/brendangregg/FlameGraph/](https://github.com/brendangregg/FlameGraph/ "QQ空间")
