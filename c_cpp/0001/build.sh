#!/bin/sh
set -e

rm -f *.o
rm -f libcommon*

g++ -fPIC -c -o common.o common.cpp
g++ -shared -fPIC -o libcommon.so common.o
#g++ -shared -fPIC -Wl,-soname,libcommon.so -o libcommon.so common.o

#main.c
g++ -Wl,-rpath=./ -o mytest mytest.cpp -L. -L$HOME/glibc/dest/lib64/  -lcommon -lcrypto

echo "Complile success"
