#include "common.h"
#include "ll.h"

static __inline__ uint32_t get_digest_index(const cache_t *cache, const md5_digest_t *digest)
{
    return ((uint32_t)digest->digest_uchar[8]) & cache->mask;
}



static __inline__  cache_ll_node_t* get_root_node_slot(cache_t *cache, const md5_digest_t *digest)
{
    return cache->cache_root[get_digest_index(cache, digest)];
}

static __inline__ cache_ll_node_t* get_node_under_slot(cache_ll_node_t *pn, const md5_digest_t *digest)
{
    while(pn)
    {
        int32_t ret = md5_digest_compare(&pn->digest, digest);

        if(ret == 0)
        {
            /*found*/
            break;
        }
        else
        {
            pn = pn->next;
        }
    }

    return pn;
}
