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

cd $SRCDIR
wget http://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
tar -zxvf glibc-2.17.tar.gz

cd $BUILDDIR
$SRCDIR/glibc-2.17/configure --prefix=/usr
make -j 4
make install DESTDIR=${DESTDIR}
