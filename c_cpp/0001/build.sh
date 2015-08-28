#!/bin/sh
set -e


rm -f *.o
rm -f libcommon*
g++ -fPIC -c -o common.o common.cpp
g++ -shared -fPIC -o libcommon.so common.o
#main.c
g++ -Wl,-rpath=./ -o mytest mytest.cpp -L.  -lcommon -lcrypto


cd ptmalloc2
make shared

echo "Complile mytest success"
