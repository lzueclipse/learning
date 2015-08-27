#!/bin/sh
set -e


rm -f *.o
rm -f libcommon*
g++ -fPIC -c -o common.o common.cpp
g++ -shared -fPIC -o libcommon.so common.o
#main.c
g++ -Wl,-rpath=./ -o mytest mytest.cpp -L.  -lcommon -lcrypto

#ptmalloc2
cd ptmalloc2-with-debug
make shared


echo "Complile mytest.cpp and ptmalloc2 success"
