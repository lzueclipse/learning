#include <unistd.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <inttypes.h>
#include <time.h>

/* Test on CentOS 7.1
 * 
 *
 * g++ -g -o edata_test.o edata_test.cpp
 */

extern unsigned long _edata;

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
