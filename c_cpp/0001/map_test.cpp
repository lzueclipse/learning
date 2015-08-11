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

#define LEN 2048
#define MAXNUM 50000000
#define SLEEP 20

typedef struct
{
    union
    {
        unsigned char digest_uchar[16];
        uint32_t digest_uint[4];
    };
}md5_digest_t;

void display_mallinfo()
{
    struct mallinfo mi;

    mi = mallinfo();

    printf("Malloc debug info:\n");
    printf("Total non-mmapped bytes (arena),         (Bytes):  %u\n", mi.arena);
    printf("Number of free chunks (ordblks),        (Number):  %u\n", mi.ordblks);
    printf("Number of free fastbin blocks (smblks), (Number):  %u\n", mi.smblks);
    printf("Number of mapped regions (hblks),       (Number):  %u\n", mi.hblks);
    printf("Bytes in mapped regions (hblkhd),        (Bytes):  %u\n", mi.hblkhd);
    printf("Max. total allocated space (usmblks),    (Bytes):  %u\n", mi.usmblks);
    printf("Free bytes held in fastbins (fsmblks),   (Bytes):  %u\n", mi.fsmblks);
    printf("Total allocated space (uordblks),        (Bytes):  %u\n", mi.uordblks);
    printf("Total free space (fordblks),             (Bytes):  %u\n", mi.fordblks);
    printf("Topmost releasable block (keepcost),     (Bytes):  %u\n", mi.keepcost);
                                                        
    //printf("\nmalloc_stats: \n");
    //malloc_stats(); 
}

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
    
    printf("-------------------------------------------------------------------------------------\n");
    printf("At the beginning, map.size=%" PRIu64 "\n", my_map.size());
    display_mallinfo();
    time_t my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        int_to_md5(i, my_fp);
        my_map[my_fp] = i;
    }

    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    

    printf("-------------------------------------------------------------------------------------\n");
    printf("Insert all FPs into std::map, map.size=%" PRIu64 "\n", my_map.size());
    printf("Cost %.f seconds, output of 'top':\n", seconds);
    output_top();
    display_mallinfo();
  
    printf("-------------------------------------------------------------------------------------\n");
  
    my_map.clear();
    printf("Delete all FPs from std::map, map.size=%" PRIu64 "\n", my_map.size());
    /* sleep and monitor */
    printf("Sleep %u seconds, ", SLEEP); 
    sleep(SLEEP);
    printf("output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("-------------------------------------------------------------------------------------\n");
}

int main(int argc, char **argv) 
{
    test_map();
    return 0;
}
