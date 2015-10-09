#ifndef __LINKEDLIST__
#define __LINKEDLIST__

#include "allocator.h"

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

typedef struct cache_allocator_iterator
{
    allocator_iterator_t allocator_iter;
}cache_allocator_iterator_t;

typedef struct cache_ll_node_iterator
{
    cache_ll_node_t *start;
    cache_ll_node_t *stop;
    cache_ll_node_t *current;

    uint64_t current_deleted;
}cache_ll_node_iterator_t;

typedef void (*relocator_func_t) (const void *source, void *dst, size_t block_size, void *user_data);

extern int32_t cache_init(cache_t *cache, uint64_t bits, size_t slab_size, size_t node_size, size_t max_nodes);
extern void cache_deinit(cache_t *cache);


#endif
