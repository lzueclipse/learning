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


typedef struct cache
{
    cache_nodePtr *cache_root;        /* tree entry points            */
    pd_cnodePtr  default_root;      /* default root node            */
    uint32_t mask;                  /* crfp digest mask              */

    pd_cnode_t *free_list;          /* free node list               */

    /* cache page memory management */
    pd_cache_page *all_pages;       /* start of page list           */
    pd_cache_page *last_page;       /* last added page              */
    pd_cnode_t *area_ptr;           /* current entry in pool area   */

    uint32_t no_log;                /* control error message display*/

    uint32_t npages;                /* no of pages                  */
    uint32_t node_avail;            /* nodes available last_page    */
    uint64_t nfree;                 /* nodes available on free_list */
    
    /* cache configuration */
    uint32_t may_lock;              /* lock pages?                  */
    uint32_t area_size;             /* current area size            */
    uint32_t bits;                  /* number of bits in the mask   */

    /* stats */
    uint64_t cache_size;            /* total cache memory size      */
    uint64_t cache_items;           /* total items cached           */
    uint64_t nhits;                 /* no of cache hits             */
    uint64_t nmiss;                 /* no of cache misses           */

    void *user_data;                /* user_data, unused internally */
    pd_cache_dtor_fn dtor;          /* node destructor              */
};
