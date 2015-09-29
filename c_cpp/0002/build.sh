#!/bin/sh
set -e

mydef=LINKEDLIST

if [ "n$1" = "nbst" ]
then
    mydef=BST
else
    mydef=LINKEDLIST
fi

echo "mydef=$mydef"

rm -f *.o
rm -f libcommon*
gcc -D$mydef -fPIC -c -o common.o common.c
gcc -D$mydef -shared -fPIC -o libcommon.so common.o
#main.c
gcc -D$mydef -Wl,-rpath=./ -o mytest mytest.c -L.  -lcommon -lcrypto


#cd ptmalloc2
#make shared

echo "Complile mytest success"
