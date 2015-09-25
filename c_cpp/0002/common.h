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
#include <assert.h>
#include <errno.h>
#include <mcheck.h>
#include <sys/resource.h>

#ifndef __COMMON__
#define __COMMON__

#define LEN 2048
#define MAXNUM 50000000
#define SLEEP 15
#define CACHE_MAGIC 0x12345678
#define PAGE_SIZE 4096
#define CACHE_AREA_SIZE_MIN  1024
#define MEGABYTE (1024 * 1024)

#define CACHE_OK 0
#define CACHE_NO_MEM -1
#define CACHE_NULL_POINTER -2
#define CACHE_FP_NOT_FOUND -3

/*
 * 128 bits md5sum
 */
typedef struct
{
    union
    {
        unsigned char digest_uchar[16];
        uint32_t digest_uint[4];
    };
}md5_digest_t;

extern void display_mallinfo();
extern void output_top();
extern void uint64_to_md5(uint64_t input, md5_digest_t &output );
extern int32_t md5_digest_compare(const md5_digest_t &a, const md5_digest_t &b);
extern void set_stack_limit();


#endif
