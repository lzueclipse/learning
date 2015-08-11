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
#define MAX 100000

void output_top()
{
    FILE *in;
    char buf[LEN];
    char cmd[LEN];
   
    memset(cmd, 0, sizeof(cmd));
    snprintf(cmd, sizeof(cmd), "top -p %d -n 1  |grep %d", getpid(), getpid());
    if(!(in = popen(cmd, "r")))
    {
        exit(1);
    }
   
    while(fgets(buf, sizeof(buf), in)!=NULL)
    {
       printf("%s", buf);
    }

    pclose(in);
}


int main(int argc, char **argv) 
{
	char *a, *b,*c;

	a =  (char *) malloc(MAX);
	printf("&_edata=%p, _edata=%d\n", &_edata, _edata);
	output_top();
	memset(a, 0, LEN);
	printf("&_edata=%p, _edata=%d\n", &_edata, _edata);
	output_top();
    return 0;
}
