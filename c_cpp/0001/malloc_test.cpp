#include <unistd.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <openssl/md5.h>
#include <list>
#define __STDC_FORMAT_MACROS 
#include <inttypes.h>

/* Test on CentOS 7.1
 * 
 * yum install openssl
 * yum install openssl-devel
 *
 * g++ -g -o malloc_test.o malloc_test.cpp -lcrypto
 */

#define LEN 2048
#define MAXNUM 200
//50000000
#define SLEEP 20

typedef struct
{
	unsigned char digest[16];
}md5_digest_t;

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

void print_md5(FP fp)
{
	int i;
	char buf[33]={'\0'};
	char tmp[3]={'\0'};

	for( i=0; i<16; i++ ){
		snprintf(tmp, sizeof(tmp), "%02x", fp.inside_uchar[i]);
		strcat(buf,tmp);
	}
	printf("%s\n",buf);
}

void int_to_md5(uint64_t input, FP &output )
{
	char data[LEN] = {'\0'};
    snprintf(data, sizeof(data), "%" PRIu64, input);
	
	MD5_CTX ctx;
	MD5_Init(&ctx);
	
	MD5_Update(&ctx,data,strlen(data));
	
	MD5_Final(output.inside_uchar,&ctx);

	print_md5(output);
}

void test_map()
{
  uint64_t i = 0;
  std::list<uint64_t> my_list;
  FP my_fp;
  for(i = 0; i < MAXNUM; ++i) {
	  int_to_md5(i, my_fp);
	  print_md5(my_fp);
  }
  printf("Insert data into std::map, output of 'top':\n");
  output_top();
  
  printf("-------------------------------------------------------------------------------------\n");
  
  my_list.clear();
  sleep(SLEEP);
  printf("Delete data from std::map, sleep ( %u )seconds, output of 'top':\n", SLEEP);
  output_top();
}

void test_mycache()
{
}

void usage(char *prog)
{
	printf("Usage: %s [test_map | test_mycache]\n", prog);
	exit(-1);
}

int main(int argc, char **argv) 
{
    if(argc != 2)
    {
		usage(argv[0]);
    }

    if(strcmp(argv[1], "test_map") == 0)
    {
	    test_map();
    }
    else if(strcmp(argv[1], "test_mycache") == 0)
    {
	    test_mycache();
    }
    else
    {
	    usage(argv[0]);
    }

  return 0;
}
