#include <unistd.h>
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
 * g++ -g -o malloc_test.o malloc_test.cpp -lcrypto
 */

#define LEN 2048
#define MAXNUM 50000000
#define SLEEP 60

typedef struct
{
    union
    {
        unsigned char digest_uchar[16];
        uint32_t digest_uint[4];
    };
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

void print_md5(md5_digest_t fp)
{
    int i;
    char buf[33]={'\0'};
    char tmp[3]={'\0'};

    for( i=0; i<16; i++ ){
        snprintf(tmp, sizeof(tmp), "%02x", fp.digest_uchar[i]);
        strcat(buf,tmp);
    }
    printf("%s\n",buf);
}

void int_to_md5(uint64_t input, md5_digest_t &output )
{
    char data[LEN] = {'\0'};
    snprintf(data, sizeof(data), "%" PRIu64, input);
    
    MD5_CTX ctx;
    MD5_Init(&ctx);
    
    MD5_Update(&ctx,data,strlen(data));
    
    MD5_Final(output.digest_uchar,&ctx);
}

struct md5_less : public std::less<md5_digest_t>
{
    bool operator()(const md5_digest_t& a, const md5_digest_t& b) const
    {
        if(a.digest_uint[0] < b.digest_uint[0])
        {
            return true;
        }
        else if(a.digest_uint[1] < b.digest_uint[1])
        {
            return true;
        }
        else if(a.digest_uint[2] < b.digest_uint[2])
        {
            return true;
        }
        else if(a.digest_uint[3] < b.digest_uint[3])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
};

void test_map()
{
    uint64_t i = 0;
    std::map< md5_digest_t, uint64_t, md5_less> my_map;
    md5_digest_t my_fp;
    time_t my_end;
    double seconds;
    
    time_t my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        int_to_md5(i, my_fp);
        //print_md5(my_fp);
        my_map[my_fp] = i;
    }

    my_end = time(NULL);
    seconds = difftime(my_start, my_end);

    printf("-------------------------------------------------------------------------------------\n");
    printf("Insert (%" PRIu64  ") FPs into std::map, cost (%.f) seconds, output of 'top':\n", my_map.size(), seconds);
    output_top();
  
    printf("-------------------------------------------------------------------------------------\n");
  
    my_map.clear();
    sleep(SLEEP);
    printf("Delete (%" PRIu64 ") FPs from std::map, sleep (%u)seconds, output of 'top':\n", my_map.size(), SLEEP);
    printf("-------------------------------------------------------------------------------------\n");
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
