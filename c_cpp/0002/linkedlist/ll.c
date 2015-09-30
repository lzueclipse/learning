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

int32_t cache_init(cache_t *cache, uint64_t bits, size_t slab_size, size_t node_size, size_t max_nodes)
{
    if(cache == NULL)
    {
        printf("cache is NULL pointer\n");
        return CACHE_INIT_ERROR;
    }

    if(bits >= 32)
    {
        printf("cache bits larger than 32\n");
        return CACHE_INIT_ERROR;
    }

    cache->bits = bits;
    while(1)
    {
        cache->cache_root = (cache_ll_node_t **) malloc( (1ULL << cache->bits) * sizeof(cache_ll_node_t *) );

        if(cache->cache_root)
            break;

        if(cache->bits > 0)
        {
            cache->bits -= 1;
            printf("cache->bits = %" PRIu64 "\n", cache->bits);

        }
        else
        {
            printf("cache->bits is 0\n");
            return CACHE_INIT_ERROR;
        }
    }

    cache->mask = (1ULL << cache->bits) - 1;
    cache->max_nodes = max_nodes;
    memset(cache->cache_root, 0, (1ULL << cache->bits) * sizeof(cache_ll_node_t *));

    //printf("SLAB_T_DATA_OFFSET = %" PRIu64 "\n", SLAB_T_DATA_OFFSET);
    if(slab_size < (SLAB_T_DATA_OFFSET + node_size) )
    {
        printf("slab_size < SLAB_T_DATA_OFFSET + node_size \n");
        return CACHE_INIT_ERROR;
    }

    cache->allocator.slab_size = slab_size;
    cache->allocator.block_size = node_size;

    return CACHE_INIT_OK;
}
