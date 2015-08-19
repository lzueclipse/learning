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
 * int   --md5-->   128bits md5sum
 */
void int_to_md5(uint64_t input, md5_digest_t &output )
{
    char data[LEN] = {'\0'};
    snprintf(data, sizeof(data), "%" PRIu64, input);
    
    MD5_CTX ctx;
    MD5_Init(&ctx);
    
    MD5_Update(&ctx,data,strlen(data));
    
    MD5_Final(output.digest_uchar,&ctx);
}



/*********************************cache*********************************/


void cache_init(cache_t *cache)
{
    size_t page_size;
    uint32_t count;

    if(cache == NULL)
    {
        printf("%s:cache is NULL\n", __FUNCTION__);
        return;
    }

    /* Initial page size using provided area size */
    page_size = cache->area_size * sizeof(cache_node_t);

    /* now round to nearest page size */
    //ALIGN_TO_PAGE(page_size);

    /* this becomes the number of nodes to allocate in one area */
    page_size /= sizeof(cache_node_t);

    if(page_size < CACHE_AREA_SIZE_MIN)
    {
        page_size = CACHE_AREA_SIZE_MIN;
    }

    cache->area_size = (uint32_t) page_size;

    /* Initialize the root array */
    for(;;)
    {
        uint32_t size;
        
        count = (1 << cache->bits);
        size = sizeof(cache_node_t *) * count;	/* @64-bit truncation possible */

        cache->cache_root = (cache_node_t **)malloc(size);

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
        printf("%s: cache_root is NULL, or bits is 0, bits=%u\n", cache->bits);
    }

    /* clear the root array */
    count = (1 << cache->bits);
    memset(cache->cache_root, 0, sizeof(cache_node *) * count);
    cache->mask = count - 1;
}

cache_t* cache_create(uint32_t area_size, uint32_t root_bits)
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
