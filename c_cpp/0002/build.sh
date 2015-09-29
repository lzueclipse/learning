#!/bin/sh
set -e

mydef=LINKEDLIST

if [ "n$1" = "nbst" ]
then
    mydef=BST
elif [ "n$1" = "nskiplist" ]
then
    mydef=SKIPLIST
else
    mydef=LINKEDLIST
fi

echo "mydef=$mydef"


if [ $mydef == LINKEDLIST ]
then
    cd linkedlist
    rm -f common.o
    rm -f libcommon*

    gcc -D$mydef -fPIC -c -o common.o common.c
    gcc -D$mydef -shared -fPIC -o libcommon.so common.o
    
    #main.c
    cd ../
    gcc -D$mydef -Wl,-rpath=./ -o mytest mytest.c -L./linkedlist  -lcommon -lcrypto
    echo "Complile mytest $mydef success"
fi


