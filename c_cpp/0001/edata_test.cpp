#include <unistd.h>
#include <sys/mman.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <openssl/md5.h>
#include <map>
#define __STDC_FORMAT_MACROS 
#include <inttypes.h>
#include <time.h>

/* Test on CentOS 7.1
 * 
 * yum install openssl
 * yum install openssl-devel
 *
 * g++ -g -o map_test.o map_test.cpp -lcrypto
 */

extern int _edata;

#define LEN 2048
#define MAX 100000000


int main(int argc, char **argv) 
{
	char *A, *B;

    printf("-----------------------------------------------------\n");
	printf("Before malloc A:\n");
	printf("&_edata=%10p, _edata=%d\n", &_edata, _edata);
	A =  (char *) malloc(MAX);
	if(A != NULL)
	{
	    memset(A, 1, MAX);
	}
	printf("After malloc A & memset A:\n");
	printf("&_edata=%10p, _edata=%d\n", &_edata, _edata);
    
	printf("-----------------------------------------------------\n");
	printf("Before malloc B:\n");
	printf("&_edata=%10p, _edata=%d\n", &_edata, _edata);
	B =  (char *) malloc(2 * MAX);
	if(B != NULL)
	{
	    memset(B, 1, 2 * MAX);
	}
	printf("After malloc B & memset B:\n");
	printf("&_edata=%10p, _edata=%d\n", &_edata, _edata);
	printf("-----------------------------------------------------\n");
    
	return 0;
}
