#!/bin/sh

##should run on the top directory of this project

##sh build.sh linkedlist
##sh build.sh bst
##sh build.sh skiplist

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
    
##allocator.c
rm -f liballocator*
gcc -fPIC -c -g -o allocator.o allocator.c
gcc -shared -fPIC -g -o liballocator.so allocator.o
rm -f allocator.o
echo "Complile liballocator.so success"
echo 


if [ $mydef == LINKEDLIST ]
then
    ##ll.c
    cd linkedlist_cache
    rm -f libll*
    gcc  -I../ -fPIC -c -g -o ll.o ll.c
    gcc  -shared -fPIC -g -o libll.so ll.o
    rm -f ll.o
    echo "Complile libll.so success"
    echo 
    
    #main.c
    cd ../
    gcc -D$mydef -I./ -I./linkedlist_cache -Wl,-rpath=./ -Wl,-rpath=./linkedlist_cache -g -o mytest mytest.c  -L./ -L./linkedlist_cache  -lallocator -lll -lcrypto
    echo "Complile mytest $mydef success"
fi

echo "*****************************************"
