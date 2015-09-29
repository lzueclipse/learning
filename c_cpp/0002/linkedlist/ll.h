#ifndef __LINKEDLIST__
#define __LINKEDLIST__

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
    
    uint32_t bits;
    uint32_t mask;
    
    size_t max_nodes;
    size_t num_nodes;
} cache_t;

#endif
