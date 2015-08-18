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








#if 0
cache_t* cache_create(uint32_t area_size, uint32_t root_bits)
{
    cache_t *cache;

    if((cache = (pd_cache_t*)malloc(sizeof(struct _pd_cache_t))) == NULL)
    {
        pd_errno = CRMapError(__FILE__, __LINE__);
        return(NULL);
    }

    memset((void*)cache, 0, sizeof(struct _pd_cache_t));

    cache->area_size = area_size;
    cache->bits      = root_bits;
    cache->may_lock  = may_lock;
    cache->dtor      = dtor;
    cache->user_data = user_data;

    cacheInit(cache);

    return(cache);
}
#endif
