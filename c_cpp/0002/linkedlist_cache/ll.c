#include "ll.h"

/* hash algorithm */
static __inline__ uint32_t get_digest_index(const cache_t *cache, const md5_digest_t *digest)
{
    return ((uint32_t)digest->digest_uchar[8]) & cache->mask;
}

/* root node's slot (pointer to location)*/
static __inline__  cache_ll_node_t** get_cache_root_slot(cache_t *cache, const md5_digest_t *digest)
{
    return  &(cache->cache_root[get_digest_index(cache, digest)]);
}

/* next root node's slot (pointer to location)*/
static __inline__ cache_ll_node_t** get_next_cache_root_slot(cache_t *cache, cache_ll_node_t **node, cache_ll_node_t **cache_root_end)
{
    for(node++; node < cache_root_end; node++)
    {
        if(*node)
            return node;
    }

    return NULL;
}

/*If the node exits, get the slot (pointer to location;
/*Else get the slot (pointer to location) to store a new node (the tail of the linked list) */
static cache_ll_node_t** get_slot_to_store(cache_ll_node_t **pn, const md5_digest_t *digest)
{
    while(*pn)
    {
        int32_t ret = md5_digest_compare( &((*pn)->digest), digest);

        if(ret == 0)
        {
            /*found*/
            break;
        }
        else
        {
            pn = &((*pn)->next);
        }
    }

    return pn;
}

int32_t cache_init(cache_t *cache, uint64_t bits, size_t slab_size, size_t block_size, size_t max_nodes)
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
    
    memset(cache, 0, sizeof(cache_t));

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
    if(slab_size < (SLAB_T_DATA_OFFSET + block_size) )
    {
        printf("slab_size < SLAB_T_DATA_OFFSET + node_size \n");
        return CACHE_INIT_ERROR;
    }
    if(block_size < sizeof(block_t))
    {
        printf("block_size < sizeof(block_t) \n");
        return CACHE_INIT_ERROR;
    }


    cache->allocator.slab_size = slab_size;
    cache->allocator.block_size = block_size;
    cache->allocator.blocks_per_slab = (slab_size - SLAB_T_DATA_OFFSET) / block_size;
    cache->allocator.slabs = NULL;
    cache->allocator.slabs_num = 0;
    cache->allocator.free_blocks = NULL;
    cache->allocator.free_blocks_num = 0;

    //printf("slab_size = %" PRIu64 ", block_size = %" PRIu64 ", blocks_per_slab = %" PRIu64 "\n", slab_size, block_size, cache->allocator.blocks_per_slab);

    return CACHE_INIT_OK;
}

void cache_deinit(cache_t *cache)
{
    if(cache == NULL)
        return;

    if(cache->cache_root)
        free(cache->cache_root);

    memset(cache, 0, sizeof(cache_t));
}

cache_ll_node_t* cache_alloc(cache_t *cache, const md5_digest_t *digest)
{
    if(cache->num_nodes < cache->max_nodes)
    {
        cache_ll_node_t *node;

        node = (cache_ll_node_t *)allocator_alloc( &(cache->allocator) );

        if(node == NULL)
            return NULL;

        node->next = NULL;
        node->digest = *digest;

        cache->num_nodes++;

        return node;
    }

    return NULL;
}

/*
 * find a slot pointer to existing node, or find a slot to store a new node
 */
cache_ll_node_t** cache_lookup_slot(cache_t *cache, const md5_digest_t *digest)
{
    return get_slot_to_store(get_cache_root_slot(cache,digest), digest);
}

cache_ll_node_t* cache_insert(cache_t *cache, const md5_digest_t *digest, uint64_t dcid)
{
    cache_ll_node_t **slot, *node;
    slot = cache_lookup_slot(cache, digest);
    node = *slot;

    if(node == NULL)
    {
        //alloc memory
        node = cache_alloc(cache, digest);
    }

    if(node == NULL)
    {
        printf("Can not insert a node\n");
        return NULL;
    }

    //update dcid
    node->dcid = dcid;

    //append the node to linked list tail
    *slot = node;
    return node;
}

static void cache_unlink_node(cache_t *cache, cache_ll_node_t *node)
{
    if(node == NULL)
        return;
    
    cache_ll_node_t **tmp = &node;
    /* tricky */
    /* "*tmp" equals with "(node's parent)->next"*/
    /* Delete "node" from the linked list */
    if(node->next)
    {
        *tmp = node->next;
    }
    else
    {
        *tmp = NULL;
    }
    node->next = NULL;
}

void cache_delete(cache_t *cache, const md5_digest_t *digest)
{
    cache_ll_node_t *node = *(cache_lookup_slot(cache, digest));

    if(node == NULL)
        return;

    cache_unlink_node(cache, node);

    allocator_free(&(cache->allocator), node);
}

void cache_relocate(const void *source, void *dest, size_t block_size, void *user_data)
{
    md5_digest_t *digest;
    cache_ll_node_t *node, **tmp;
    cache_t *cache;
 
    /*copy to "dest", include data and "next pointer" */
    memcpy(dest, source, block_size);
    
    digest = &( ((cache_ll_node_t *)source)->digest );
    cache = (cache_t *)user_data;

    node = *(cache_lookup_slot(cache, digest));

    tmp = &node;
    /* tricky */
    /* "*tmp" equals with "(node's parent)->next"*/
    /* Relocate "node" from "source memory" to "dest memory". */
    *tmp = dest;
}

size_t cache_slab_reclaim(cache_t *cache, relocator_func_t relocator, void *user_data)
{
    size_t slab_size = cache->allocator.slab_size;

    allocator_slab_reclaim(&cache->allocator, relocator, user_data);
}

cache_ll_node_t* allocator_iterator_cache_node_first(cache_allocator_iterator_t *iter, cache_t *cache)
{
    return (cache_ll_node_t *)allocator_iterator_first(&iter->allocator_iter, &cache->allocator);
}

cache_ll_node_t* allocator_iterator_cache_node_next(cache_allocator_iterator_t *iter)
{
    return (cache_ll_node_t *)allocator_iterator_next(&iter->allocator_iter);
}

cache_ll_node_t* slot_iterator_cache_node_first(cache_ll_slot_iterator_t *iter, cache_t *cache, size_t cache_root_start_index, size_t cache_root_end_index)
{
    size_t cache_root_size = ((size_t) 1) << cache->bits;
    size_t start_index = (cache_root_start_index < cache_root_size)?cache_root_start_index:cache_root_size;
    size_t end_index = (cache_root_end_index < cache_root_size)?cache_root_end_index:cache_root_size;

    iter->cache = cache;
    iter->start = cache->cache_root + start_index ;
    iter->stop = cache->cache_root + end_index;
    iter->current_deleted = 0;

    iter->current = get_next_cache_root_slot(cache, iter->start - 1 , iter->stop);


    return (iter->current)? *(iter->current):NULL;
}

cache_ll_node_t* slot_iterator_cache_node_next(cache_ll_slot_iterator_t *iter)
{
    cache_ll_node_t *node, **start;
    md5_digest_t *digest;

    if(iter->current == NULL)
        return NULL;

    if(iter->current_deleted)
    {
        iter->current_deleted = 0;
        return (*(iter->current));
    }

    node = *(iter->current);

    if(node->next)
    {
        iter->current = &(node->next);
        return (*(iter->current));
    }

    /*go down to next cache root*/
    digest = &((*(iter->current))->digest);
    start = get_cache_root_slot(iter->cache, digest);
    iter->current = get_next_cache_root_slot(iter->cache, start, iter->stop);


    return (iter->current)?*(iter->current):NULL;
}

cache_ll_node_t* slot_iterator_cache_node_current(cache_ll_slot_iterator_t *iter)
{
    if(iter->current_deleted || iter->current == NULL)
        return NULL;
    else
        return *(iter->current);
}

/* delete the node, but do not disturb the iteration */
void slot_iterator_cache_node_delete(cache_ll_slot_iterator_t *iter)
{
    cache_ll_node_t **tmp, *node;

    if(iter->current_deleted || iter->current == NULL)
        return;

    tmp = iter->current;
    node = *tmp;

    if(node->next)
    {
        /* tricky */
        /* "*tmp" equals with "(node's parent)->next"*/
        /* Delete "node" from linked list */
        *tmp = node->next;
    }
    else
    {
        /*move on the iterator */
        slot_iterator_cache_node_next(iter);
        /* tricky */
        /* "*tmp" equals with "(node's parent)->next"*/
        /* Delete "node" from linked list */
        *tmp = NULL;
    }

    iter->current_deleted = 1;

    allocator_free(&(iter->cache->allocator), node);
    iter->cache->num_nodes--;
}

static int32_t slot_iterator_cache_node_slot_index(cache_ll_slot_iterator_t *iter)
{
    if(iter->current)
    {
        return get_digest_index(iter->cache, &((*(iter->current))->digest));
    }
    else
    {
        return iter->stop - iter->cache->cache_root;
    }
}

void cache_dump(cache_t *cache)
{
    cache_allocator_iterator_t iter_alloc;
    cache_ll_slot_iterator_t iter_slot;
    uint64_t count = 0;

    cache_ll_node_t *node;

    FILE * file;
    file = fopen ("dump.txt","w");
    if(file == NULL)
    {
        printf("fopen fails\n");
        return;
    }

    fprintf(file, "Dump by slab:\n");
    for(node = allocator_iterator_cache_node_first(&iter_alloc, cache); node; node = allocator_iterator_cache_node_next(&iter_alloc))
    {
        count++;
        fprintf(file, "dcid = %" PRIu64 ", digest[8] = %u\n", node->dcid, node->digest.digest_uchar[8]);
    }
    fprintf(file, "count = %" PRIu64 "\n\n\n", count);

    count = 0;
    fprintf(file, "Dump by cache root:\n");
    for(node = slot_iterator_cache_node_first(&iter_slot, cache, 0, ((size_t)-1)); node; node = slot_iterator_cache_node_next(&iter_slot))
    {
        count++;
        fprintf(file, "dcid = %" PRIu64 ", digest[8] = %u\n", node->dcid, node->digest.digest_uchar[8]);
    }
    fprintf(file, "count = %" PRIu64 "\n", count);
                          
    fclose (file);
}
