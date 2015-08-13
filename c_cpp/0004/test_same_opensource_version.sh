#!/bin/sh
set -e

#remove *.o libopensource.so.*
rm -f ./*.o
rm -f ./lib*
rm -rf ./vendor1
rm -rf ./vendor2

#To generate ./vendor1/libopensource.so.1.0, libvendor1.so
#Use opensource_v1.c, vendor1.c
cp opensource_v1.c opensource.c
gcc -shared -fPIC -o vendor1.o vendor1.c
gcc -shared -fPIC -o opensource.o opensource.c
gcc -shared -fPIC -Wl,--default-symver -Wl,-soname,libopensource.so.1 -o libopensource.so.1.0 opensource.o
mkdir ./vendor1
mv opensource.o ./vendor1
mv libopensource.so.1.0 ./vendor1
cd ./vendor1
ln -s libopensource.so.1.0 libopensource.so
cd ..
gcc -Wl,-rpath=. -L. -L ./vendor1 -Wl,--default-symver -Wl,-soname,libvendor1.so -shared -o libvendor1.so vendor1.o -lopensource
rm -f *.o
rm -f ./vendor1/*.o

#To generate ./vendor2/libopensource.so.1.0, libvendor2.so
#Use opensource_v2.c, vendor2.c
cp opensource_v2.c opensource.c
gcc -shared -fPIC -o vendor2.o vendor2.c
gcc -shared -fPIC -o opensource.o opensource.c
gcc -shared -fPIC -Wl,--default-symver -Wl,-soname,libopensource.so.1 -o libopensource.so.1.0 opensource.o
mkdir ./vendor2
mv opensource.o ./vendor2
mv libopensource.so.1.0 ./vendor2
cd ./vendor2
ln -s libopensource.so.1.0 libopensource.so
cd ..
gcc -Wl,-rpath=. -L. -L ./vendor2 -Wl,--default-symver -Wl,-soname,libvendor2.so -shared -o libvendor2.so vendor2.o -lopensource
rm -f *.o
rm -f ./vendor2/*.o

#main.c
echo "success"
