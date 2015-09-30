#ifndef __LINKEDLIST__
#define __LINKEDLIST__

#include "common.h"

/*
 * linked list node
 */
typedef struct cache_ll_node
{
    struct cache_ll_node *next;
    md5_digest_t digest;
    uint64_t flag:8;
    uint64_t dcid:56;
} cache_ll_node_t;


/*
 * linked list node cache
 */
typedef struct cache
{
    cache_ll_node_t **cache_root;
    allocator_t allocator;
    
    uint64_t bits;
    uint64_t mask;
    
    size_t max_nodes;
    size_t num_nodes;
} cache_t;

extern int32_t cache_init(cache_t *cache, uint64_t bits, size_t slab_size, size_t node_size, size_t max_nodes);


#endif
