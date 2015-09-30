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

rm -f allocator.o
rm -f liballocator*
gcc -fPIC -c -o allocator.o allocator.c
gcc -shared -fPIC -o liballocator.so allocator.o
echo "Complile liballocator.so success"
echo 

if [ $mydef == LINKEDLIST ]
then
    cd linkedlist_cache
    rm -f ll.o
    rm -f libll*
    gcc  -I../ -fPIC -c -o ll.o ll.c
    gcc  -shared -fPIC -o libll.so ll.o
    echo "Complile libll.so success"
    echo 
    
    #main.c
    cd ../
    gcc -D$mydef -I./ -I./linkedlist_cache -Wl,-rpath=./ -Wl,-rpath=./linkedlist_cache -o mytest mytest.c  -L./ -L./linkedlist_cache  -lallocator -lll -lcrypto
    echo "Complile mytest $mydef success"
fi


echo "*****************************************"
