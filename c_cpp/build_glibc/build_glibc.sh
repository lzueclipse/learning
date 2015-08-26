#!/bin/sh

set -e

SRCDIR=$HOME/glibc/src
DESTDIR=$HOME/glibc/dest
BUILDDIR=$HOME/glibc/build

rm -rf $SRCDIR
rm -rf $DESTDIR
rm -rf $BUILDDIR

mkdir -p $SRCDIR
mkdir -p $DESTDIR
mkdir -p $BUILDDIR

##Get source code, and extract
cd $SRCDIR
wget http://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
tar -zxvf glibc-2.17.tar.gz

##Glibc build bug, Endless loop building misc/bits/syscall.d in glibc 2.17
##https://sourceware.org/bugzilla/show_bug.cgi?id=15711
cd $SRCDIR/glibc-2.17
sed "798 itouch -d '0.5 seconds ago' \$\@" -i Makerules

cd $BUILDDIR
$SRCDIR/glibc-2.17/configure --prefix=/usr
sed "5 iPARALLELMFLAGS = -j 4" -i Makefile
make 
make install DESTDIR=${DESTDIR}
