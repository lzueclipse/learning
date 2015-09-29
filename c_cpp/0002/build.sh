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

echo "*****************************************"
echo "mydef=$mydef"
echo 


if [ $mydef == LINKEDLIST ]
then

    TOPDIR=`pwd`
    rm -f common.o
    rm -f libcommon*
    gcc -fPIC -c -o common.o common.c
    gcc -shared -fPIC -o libcommon.so common.o
    echo "Complile libcommon.so success"
    echo 

    cd linkedlist
    rm -f ll.o
    rm -f libll*
    gcc  -I$TOPDIR -fPIC -c -o ll.o ll.c
    gcc  -shared -fPIC -o libll.so ll.o
    echo "Complile libll.so success"
    echo 

    
    #main.c
    cd ../
    gcc -D$mydef -I./linkedlist -Wl,-rpath=./ -Wl,-rpath=./linkedlist -o mytest mytest.c  -L./ -L./linkedlist  -lcommon -lll -lcrypto
    echo "Complile mytest $mydef success"
fi


echo "*****************************************"
