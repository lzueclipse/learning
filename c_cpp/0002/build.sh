#!/bin/sh

##should run on the top directory of this project

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

rm -f common.o
rm -f libcommon*
gcc -fPIC -c -o common.o common.c
gcc -shared -fPIC -o libcommon.so common.o
echo "Complile libcommon.so success"
echo 

if [ $mydef == LINKEDLIST ]
then
    cd linkedlist
    rm -f ll.o
    rm -f libll*
    gcc  -I../ -fPIC -c -o ll.o ll.c
    gcc  -shared -fPIC -o libll.so ll.o
    echo "Complile libll.so success"
    echo 
    
    #main.c
    cd ../
    gcc -D$mydef -I./ -I./linkedlist -Wl,-rpath=./ -Wl,-rpath=./linkedlist -o mytest mytest.c  -L./ -L./linkedlist  -lcommon -lll -lcrypto
    echo "Complile mytest $mydef success"
fi


echo "*****************************************"
