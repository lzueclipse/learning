#include "common.h"

/*
 * Display malloc info
 */
void display_mallinfo()
{
    struct mallinfo mi;

    mi = mallinfo();

    printf("Malloc debug info:\n");
    printf("................................................................\n");
    printf("Total non-mmapped bytes (arena),             (Bytes):  %u\n", mi.arena);
    printf("    Number of free chunks (ordblks),        (Number):  %u\n", mi.ordblks);
    printf("    Total allocated space (uordblks),        (Bytes):  %u\n", mi.uordblks);
    printf("    Total free space (fordblks),             (Bytes):  %u\n", mi.fordblks);
    printf("...............................................................\n");
    printf("Number of free fastbin blocks (smblks),     (Number):  %u\n", mi.smblks);
    printf("Free bytes held in fastbins (fsmblks),       (Bytes):  %u\n", mi.fsmblks);
    printf("..............................,................................\n");
    printf("Number of mapped regions (hblks),           (Number):  %u\n", mi.hblks);
    printf("Bytes in mapped regions (hblkhd),            (Bytes):  %u\n", mi.hblkhd);
    printf("...............................................................\n");
    printf("Topmost releasable block (keepcost),         (Bytes):  %u\n", mi.keepcost);
    
    //usmblks is always 0
    //printf("Max. total allocated space (usmblks),    (Bytes):  %u\n", mi.usmblks);
    

    //printf("\nmalloc_stats: \n");
    //malloc_stats(); 
}

/*
 * top -p <my pid> -n -1 
 */
void output_top()
{
    FILE *in;
    char buf[LEN];
    char cmd[LEN];
   
    memset(cmd, 0, sizeof(cmd));
    snprintf(cmd, sizeof(cmd), "top -p %d -n 1  |grep %d", getpid(), getpid());
    if(!(in = popen(cmd, "r")))
    {
        exit(1);
    }
   
    while(fgets(buf, sizeof(buf), in)!=NULL)
    {
       printf("%s", buf);
    }

    pclose(in);
}


/*
 * uint64   --md5-->   128bits md5sum
 */
void uint64_to_md5(uint64_t input, md5_digest_t &output )
{
    char data[LEN] = {'\0'};
    snprintf(data, sizeof(data), "%" PRIu64, input);
    
    MD5_CTX ctx;
    MD5_Init(&ctx);
    
    MD5_Update(&ctx,data,strlen(data));
    
    MD5_Final(output.digest_uchar,&ctx);
}


int32_t md5_digest_compare(const md5_digest_t &a, const md5_digest_t &b)
{
    int32_t res = 0;

    if(a.digest_uint[0] != b.digest_uint[0])
    {
        res = (int32_t)a.digest_uint[0] - (int32_t)b.digest_uint[0];
    }
    else if(a.digest_uint[1] != b.digest_uint[1])
    {
        res = (int32_t)a.digest_uint[1] - (int32_t)b.digest_uint[1];
    }
    else if(a.digest_uint[2] != b.digest_uint[2])
    {
        res = (int32_t)a.digest_uint[2] - (int32_t)b.digest_uint[2];
    }
    else if(a.digest_uint[3] != b.digest_uint[3])
    {
        res = (int32_t)a.digest_uint[3] - (int32_t)b.digest_uint[3];
    }
    
    return res;
}


static __inline__ void align_to_pow2(uint64_t *size, uint64_t pow2)
{
    pow2--;
    *size =((*size) + pow2) & (~pow2);
}

static __inline__ uint64_t get_digest_index(cache_t *cache, const md5_digest_t& digest)
{
    return digest.digest_uchar[12] & cache->mask;
}

static __inline__ cache_node_t* get_root_node(cache_t *cache, const md5_digest_t& digest)
{
    uint64_t index = get_digest_index(cache, digest);
    return cache->cache_root[index];
}

static __inline__ void * page_ctor(uint64_t nitems, uint64_t size)
{
    /*
    * Use mmap, the big advantage of using mmap'd memory is that
    * it will be returned to the OS once mmap'd memory is freed.
    */
    void *ptr;

    if((ptr = mmap(NULL, nitems * size, PROT_READ|PROT_WRITE, MAP_ANON|MAP_PRIVATE, -1, 0)) != MAP_FAILED)
    {
        return ptr;
    }

    return NULL;
}

static __inline__ void page_dtor(void *address, uint64_t size)
{
    if(address == NULL)
        return;

    (void)munmap(address, size);
}

static cache_node_t* new_node(cache_t *cache, const md5_digest_t& digest, const uint64_t dcid)
{
    cache_node_t *node;

    if(cache->node_avail == 0)
    {
        cache_page_t *page;
        uint64_t size = cache->area_size * sizeof(cache_node_t);

        /* alloc a new pool */
        page = (cache_page_t*)page_ctor(cache->area_size, sizeof(cache_node_t));

        /* hmm, this item won't be cached... */
        if(page == NULL)
        {
            printf("%s: Mmap failed for %" PRIu64 " bytes, current cache = %" PRIu64 " MB, page num = %" PRIu64 , __FUNCTION__, cache->area_size * sizeof(cache_node_t), cache->cache_size / MEGABYTE, cache->npages);
            return NULL;
        }

        /* enter details */
        page->page_size   = size;
        page->node_avail  = cache->area_size - 1;
        page->end.tail    = page + cache->area_size;
        
        //printf("%s:page_size = %" PRIu64 "\n", __FUNCTION__, page->page_size );

        if(cache->all_pages == NULL)
        {
            /* this is the head of the page list */
            cache->all_pages = cache->last_page = page;
        }
        else
        {
            /* append at end of list */
            page->prev = cache->last_page;
            cache->last_page->next = page;
            cache->last_page = page;
        }

        /*
        * first node in pool is used for housekeeping so the first
        * available node is the second element.
        * (and in case you hadn't noticed it yet, this is the cool stuff)
        */
        cache->area_ptr    = (cache_node_t*)++page;
        cache->node_avail  = cache->area_size - 1;
        cache->cache_size += size;
        cache->npages++;
        //printf("%s: Mmap new pages, current cache = %" PRIu64 " MB, active pages = %" PRIu64 ", area_size = %" PRIu64 "\n",__FUNCTION__, cache->cache_size/MEGABYTE, cache->npages, cache->area_size);
    }

    cache->last_page->node_avail--;
    cache->node_avail--;
    cache->nitems++;
    node = cache->area_ptr++; 

    //printf("%s: node_avail = %" PRIu64 "\n", __FUNCTION__, cache->node_avail);

    assert( node < (cache_node_t*)cache->last_page->end.tail);

    /* copy digest value */
    node->digest = digest;
    node->dcid  = dcid;
    
    node->ref   = 1;
    node->left  = NULL;
    node->right = NULL;
    
    return node;
}

static int32_t cache_init(cache_t *cache)
{
    uint64_t page_size;
    uint64_t area_size;
    uint64_t count;

    if(cache == NULL)
    {
        printf("%s:cache is NULL\n", __FUNCTION__);
        return CACHE_NULL_POINTER;
    }

    page_size = cache->area_size * sizeof(cache_node_t);
    //printf("%s:Before align, page_size = %u\n",__FUNCTION__, page_size);
    align_to_pow2(&page_size, PAGE_SIZE);
    //printf("%s:After align, page_size = %u\n",__FUNCTION__, page_size);

    area_size = page_size / sizeof(cache_node_t);
    if(area_size < CACHE_AREA_SIZE_MIN)
    {
        area_size = CACHE_AREA_SIZE_MIN;
    }

    //printf("%s:cache->area_szie, changes from %u to %u\n",__FUNCTION__, cache->area_size, area_size);
    cache->area_size = area_size;

    /* Initialize the root array */
    for(;;)
    {
        count = (1 << cache->bits);

        cache->cache_root = (cache_node_t **)malloc( sizeof(cache_node_t *) * count);

        if(cache->cache_root == NULL && cache->bits > 0)
        {
            printf("%s:Malloc fails, cache->bits=%u\n",__FUNCTION__, cache->bits);
            cache->bits -= 1;
        }
        else
        {
            /* malloc succeeded OR can't reduce bits anymore */
            break;
        }
    }

    if(cache->cache_root == NULL || cache->bits == 0)
    {
        printf("%s: cache_root is NULL, or bits is 0, bits=%u\n", __FUNCTION__, cache->bits);
        return CACHE_NULL_POINTER;
    }

    /* clear the root array */
    count = (1 << cache->bits);
    memset(cache->cache_root, 0, sizeof(cache_node *) * count);
    cache->mask = count - 1;
    //printf("%s:cache->bits = %u, cache->mask = %u\n",__FUNCTION__, cache->bits, cache->mask);

    return CACHE_OK;
}

cache_t* cache_create(uint64_t area_size, uint64_t root_bits)
{
    cache_t *cache;

    cache = (cache_t*) malloc(sizeof(cache_t));
    if (cache == NULL)
    {
        printf("%s:Malloc cache_t fails\n",__FUNCTION__);
        return NULL;
    }

    memset(cache, 0, sizeof(cache_t));

    cache->area_size = area_size;
    cache->bits      = root_bits;
    cache->magic      = CACHE_MAGIC;
    
    if (cache_init(cache) != CACHE_OK)
    {
        free(cache);
        cache = NULL;
    }

    return cache;
}

static void cache_release(cache_t *cache, cache_page_t *page)
{
    cache_page_t *next;

    /* now release them */
    while(page != NULL)
    {
        next = page->next;

        /* release the page itself */
        page_dtor((void*)page, page->page_size);
        page = next;
    }
}

void cache_destroy(cache_t *cache)
{
    if(cache == NULL)
        return;

    cache_release(cache, cache->all_pages);
    
    /* Clear the root node array */
    if(cache->cache_root)
        free(cache->cache_root);

    /* and release the cache instance */
    free(cache);
}


int32_t cache_add(cache_t *cache, const md5_digest_t& digest, uint64_t dcid)
{
    int32_t compare;
    cache_node_t *node;
    int32_t status = CACHE_OK;

    if(cache == NULL || cache->magic != CACHE_MAGIC)
    {
        return CACHE_NULL_POINTER;
    }

    node = get_root_node(cache,digest);

    if(node == NULL)
    {
        uint32_t index = get_digest_index(cache, digest);
        node = new_node(cache, digest, dcid);
        cache->cache_root[index] = node;

        if(node == NULL)
        {
            printf("%s: Allocate memory fails\n", __FUNCTION__);
            return CACHE_NO_MEM;
        }
    }
    else
    {
        /* non-recursive tree insert */
        for(;;)
        {
            compare = md5_digest_compare(node->digest, digest);

            if(compare == 0)
            {
                node->ref++;
                break;
            }
            else if(compare < 0)
            {
                if(node->left == NULL)
                {
                    node->left = new_node(cache, digest, dcid);
                    if(node->left == NULL)
                    {
                        printf("%s: Allocate memory fails\n", __FUNCTION__);
                        status = CACHE_NO_MEM;
                    }
                    break;
                }
                else
                    node = node->left;
            }
            else
            {
                if(node->right == NULL)
                {
                    node->right = new_node(cache, digest, dcid);
                    if(node->right == NULL)
                    {
                        printf("%s: Allocate memory fails\n", __FUNCTION__);
                        status = CACHE_NO_MEM;
                    }
                    break;
                }
                else
                    node = node->right;
            }
        }
    }
    return status;
}

int32_t cache_exists(cache_t *cache, const md5_digest_t digest, uint64_t &dcid)
{
    int32_t compare;
    cache_node_t *node;

    if(cache == NULL || cache->magic != CACHE_MAGIC)
    {
        return CACHE_NULL_POINTER;
    }

    node = get_root_node(cache, digest);

    /* non-recursive tree search */
    while (node != NULL)
    {
        compare = md5_digest_compare(node->digest, digest);

        if(compare == 0)
        {
            dcid = node->dcid;

            return(CACHE_OK);
        }
        else if(compare < 0)
            node = node->left;
        else
            node = node->right;
    }


    return CACHE_FP_NOT_FOUND;
}
