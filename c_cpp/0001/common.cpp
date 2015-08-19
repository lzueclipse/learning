#include "common.h"

/*
 * Display malloc info
 */
void display_mallinfo()
{
    struct mallinfo mi;

    mi = mallinfo();

    printf("Malloc debug info:\n");
    printf("Total non-mmapped bytes (arena),         (Bytes):  %u\n", mi.arena);
    printf("Number of free chunks (ordblks),        (Number):  %u\n", mi.ordblks);
    printf("Number of free fastbin blocks (smblks), (Number):  %u\n", mi.smblks);
    printf("Number of mapped regions (hblks),       (Number):  %u\n", mi.hblks);
    printf("Bytes in mapped regions (hblkhd),        (Bytes):  %u\n", mi.hblkhd);
    printf("Max. total allocated space (usmblks),    (Bytes):  %u\n", mi.usmblks);
    printf("Free bytes held in fastbins (fsmblks),   (Bytes):  %u\n", mi.fsmblks);
    printf("Total allocated space (uordblks),        (Bytes):  %u\n", mi.uordblks);
    printf("Total free space (fordblks),             (Bytes):  %u\n", mi.fordblks);
    printf("Topmost releasable block (keepcost),     (Bytes):  %u\n", mi.keepcost);
                                                        
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

static __inline__ uint32_t get_digest_index(cache_t *cache, const md5_digest_t *digest)
{
    return *((uint32_t*)(&(digest->digest_uchar[12]))) & cache->mask;
}

static __inline__ cache_node_t* get_root_node(cache_t *cache, const md5_digest_t *digest)
{
    uint32_t index = get_digest_index(cache, digest);
    return cache->cache_root[index];
}


void cache_init(cache_t *cache)
{
    uint64_t page_size;
    uint64_t area_size;
    uint64_t count;

    if(cache == NULL)
    {
        printf("%s:cache is NULL\n", __FUNCTION__);
        return;
    }

    page_size = cache->area_size * sizeof(cache_node_t);
    printf("%s:Before align, page_size = %u\n",__FUNCTION__, page_size);
    align_to_pow2(&page_size, PAGE_SIZE);
    printf("%s:After align, page_size = %u\n",__FUNCTION__, page_size);

    area_size = page_size / sizeof(cache_node_t);
    if(area_size < CACHE_AREA_SIZE_MIN)
    {
        area_size = CACHE_AREA_SIZE_MIN;
    }

    printf("%s:cache->area_szie, changes from %u to %u\n",__FUNCTION__, cache->area_size, page_size);
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
        return;
    }

    /* clear the root array */
    count = (1 << cache->bits);
    memset(cache->cache_root, 0, sizeof(cache_node *) * count);
    cache->mask = count - 1;
    printf("%s:cache->bits = %u, cache->mask = %u\n",__FUNCTION__, cache->bits, cache->mask);
}

cache_t* cache_create(uint64_t area_size, uint64_t root_bits)
{
    cache_t *cache;

    cache = (cache_t*) malloc(sizeof(cache_t));
    if (cache == NULL)
    {
        printf("%s:Malloc cache_t fails\n",__FUNCTION__);
        return(NULL);
    }

    memset(cache, 0, sizeof(cache_t));

    cache->area_size = area_size;
    cache->bits      = root_bits;
    cache->magic      = CACHE_MAGIC;
    
    cache_init(cache);

    return cache;
}

int32_t cache_add(cache_t *cache, const md5_digest_t *digest, uint32_t dcid)
{
    int32_t compare;
    cache_node_t *node;
    int32_t status;

    if(cache == NULL || cache->magic != CACHE_MAGIC)
    {
        status = -1;
        return status;
    }

    node = get_root_node(cache,digest);

}
