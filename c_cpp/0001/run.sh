CURDIR=`pwd`
export LD_PRELOAD=$CURDIR/ptmalloc2-with-debug/malloc.so

./mytest $1
