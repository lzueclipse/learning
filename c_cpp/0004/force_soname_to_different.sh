#!/bin/sh
set -e

rm -f ./lib*
rm -rf ./opensource_v1
rm -rf ./opensource_v2

#To generate ./opensource_v1/libopensource.so.1.0, libvendor1.so
#Use opensource_v1.c, vendor1.c
cp opensource_v1.c opensource.c  

gcc -fPIC -c -o vendor1.o vendor1.c
gcc -fPIC -c -o opensource.o opensource.c
gcc -shared -fPIC -Wl,--default-symver -Wl,-soname,libopensource.so.1 -o libopensource.so.1.0 opensource.o

ln -s libopensource.so.1.0 libopensource.so
ln -s libopensource.so.1.0 libopensource.so.1
mkdir ./opensource_v1
mv libopensource* ./opensource_v1

gcc -Wl,-rpath=./opensource_v1 -L ./opensource_v1 -Wl,--default-symver -Wl,-soname,libvendor1.so -shared -o libvendor1.so vendor1.o -lopensource
rm -f *.o

#To generate ./opensource_v2/libopensource.so.2.0, libvendor2.so
#Use opensource_v2.c, vendor2.c
cp opensource_v2.c opensource.c

gcc -fPIC -c -o vendor2.o vendor2.c
gcc -fPIC -c -o opensource.o opensource.c
gcc -shared -fPIC -Wl,--default-symver -Wl,-soname,libopensource.so.2 -o libopensource.so.2.0 opensource.o

ln -s libopensource.so.2.0 libopensource.so
ln -s libopensource.so.2.0 libopensource.so.2
mkdir opensource_v2
mv libopensource* ./opensource_v2

gcc -Wl,-rpath=./opensource_v2 -L ./opensource_v2 -Wl,--default-symver -Wl,-soname,libvendor2.so -shared -o libvendor2.so vendor2.o -lopensource
rm -f *.o

#main.c
gcc -Wl,-rpath=./:./opensource_v1:./opensource_v2 -o main  main.c -L. -L./opensource_v1 -lvendor1 -lvendor2 -lopensource 
#gcc -Wl,-rpath=./:./opensource_v2:./opensource_v1 -o main  main.c -L. -L./opensource_v1 -lvendor1 -lvendor2 -lopensource 

echo "Complile success"
