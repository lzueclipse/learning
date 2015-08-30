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

#ifndef __COMMON__
#define __COMMON__

#define LEN 2048
#define MAXNUM 10000000 //1.2TB
#define SLEEP 15
#define CACHE_MAGIC 0x12345678
#define PAGE_SIZE 4096
#define CACHE_AREA_SIZE_MIN  1024
#define MEGABYTE (1024 * 1024)

#define CACHE_OK 0
#define CACHE_NO_MEM -1
#define CACHE_NULL_POINTER -2
#define CACHE_FP_NOT_FOUND -3

extern bool should_mallinfo;

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

typedef struct cache_node
{
    md5_digest_t digest;
    struct cache_node *left;
    struct cache_node *right;
    uint64_t dcid;
    uint64_t ref;
}cache_node_t;

typedef struct cache_page
{
    uint64_t page_size;
    uint64_t node_avail;
    struct cache_page *prev;
    struct cache_page *next;
    
    union
    {
        void *tail;                
        unsigned char pad0[8];
    }end;

    uint64_t pad1;

}cache_page_t;

typedef struct cache
{
    uint32_t magic;                 

    cache_node_t **cache_root; 
    uint64_t mask; 

    /* cache page memory management */
    cache_page_t *all_pages;
    cache_page_t *last_page;
    cache_node_t *area_ptr;

    uint32_t npages; 
    uint32_t node_avail;
    
    /* cache configuration */
    uint64_t area_size;
    uint64_t bits; 

    /* stats */
    uint64_t cache_size;
    uint64_t nitems;
}cache_t;

extern void display_mallinfo();
extern void output_top();
extern void uint64_to_md5(uint64_t input, md5_digest_t &output );
extern int32_t md5_digest_compare(const md5_digest_t &a, const md5_digest_t &b);

extern cache_t* cache_create(uint64_t area_size, uint64_t root_bits);
extern void cache_destroy(cache_t *cache);
extern int32_t cache_add(cache_t *cache, const md5_digest_t& digest, uint64_t dcid);
extern int32_t cache_exists(cache_t *cache, const md5_digest_t digest, uint64_t &dcid);

#endif
