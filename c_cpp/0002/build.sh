#!/bin/sh
set -e


rm -f *.o
rm -f libcommon*
gcc -fPIC -c -o common.o common.c
gcc -shared -fPIC -o libcommon.so common.o
#main.c
gcc -Wl,-rpath=./ -o mytest mytest.c -L.  -lcommon -lcrypto


#cd ptmalloc2
#make shared

echo "Complile mytest success"
