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

#define LEN 2048
#define MAXNUM 20000000
#define SLEEP 20
#define CACHE_MAGIC 0x1234567890

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

/*
 * md5 compare
 */
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

void display_mallinfo();
void output_top();
void int_to_md5(uint64_t input, md5_digest_t &output );




/******************************************cache********************************************/

typedef struct cache_node
{
    md5_digest_t digest;
    struct cache_node *left;
    struct cache_node *right;
    uint64_t dcid;
    size_t ref;
}cache_node_t;

typedef struct cache_page
{
    size_t page_size;
    uint32_t page_locked;
    uint32_t node_avail;
    struct cache_page *prev;
    struct cache_page *next;
    
    union
    {
        void *tail;                
        unsigned char pad0[8];
    }end;

    size_t pad1;

}cache_page_t;

typedef struct cache
{
    uint64_t magic;                 
    uint32_t iter_lock; 

    cache_node_t **cache_root; 
    cache_node_t  *default_root; 
    uint32_t mask; 

    cache_node_t *free_list;

    /* cache page memory management */
    cache_page_t *start_page;
    cache_page_t *last_page;
    cache_node_t *area_ptr;

    uint32_t npages; 
    uint32_t node_avail;
    uint64_t nfree;
    
    /* cache configuration */
    uint32_t area_size;
    uint32_t bits; 

    /* stats */
    uint64_t cache_size;
    uint64_t cache_items;
    uint64_t nhits;
    uint64_t nmiss;

}cache_t;
