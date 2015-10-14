#ifndef __BST__
#define __BST__

#include "allocator.h"

/*
 * bst node
 */
typedef struct cache_bst_node
{
    struct cache_bst_node *left;
    struct cache_bst_node *right;
    md5_digest_t digest;
    uint64_t dcid;
} cache_bst_node_t;


/*
 * linked list node cache
 */
typedef struct cache
{
    cache_bst_node_t **cache_root;
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

typedef struct cache_ll_slot_iterator
{
    cache_t *cache;
    cache_bst_node_t **start;
    cache_bst_node_t **stop;
    cache_bst_node_t **current;

    uint64_t current_deleted;
}cache_bst_slot_iterator_t;

typedef void (*relocator_func_t) (const void *source, void *dst, size_t block_size, void *user_data);

extern int32_t cache_init(cache_t *cache, uint64_t bits, size_t slab_size, size_t node_size, size_t max_nodes);
extern void cache_deinit(cache_t *cache);

extern cache_bst_node_t* cache_alloc(cache_t *cache, const md5_digest_t *digest);
extern cache_bst_node_t** cache_lookup_slot(cache_t *cache, const md5_digest_t *digest);
extern cache_bst_node_t* cache_insert(cache_t *cache, const md5_digest_t *digest, uint64_t dcid);
extern void cache_delete(cache_t *cache, const md5_digest_t *digest);

extern void cache_relocate(const void *source, void *dest, size_t block_size, void *user_data);
extern int32_t cache_slab_reclaim(cache_t *cache, relocator_func_t relocator);

extern cache_bst_node_t* allocator_iterator_cache_node_first(cache_allocator_iterator_t *iter, cache_t *cache);
extern cache_bst_node_t* allocator_iterator_cache_node_next(cache_allocator_iterator_t *iter);

extern void cache_dump(cache_t *cache, const char *file_name);

#endif
