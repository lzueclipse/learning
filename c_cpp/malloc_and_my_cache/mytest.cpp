#include "common.h"

bool should_top_chunk = false;
bool should_mtrim = false;

void test_malloc_free()
{
    int i;
    
    printf("----------------------------------------------------------------------------------------------\n");
    printf("test_malloc_free 1\n\n");
    printf("At the beginning:\n");
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
    
    char * ptrs[MAXNUM]; //500000 * 8, about 4MB on stack
    for(i = 0; i < MAXNUM; ++i) {
        ptrs[i] = (char *) malloc(1* 1024 ) ;
        memset( ptrs[i], 0, 1 * 1024);
    }
    if(should_top_chunk)
    {
        char *tmp1 = (char *) malloc(1); //never free，only 1B memory leak, what it will impact to the system?
        memset( tmp1, 0, 1);
    }
    printf("test_malloc_free 2\n\n");
    printf("Malloc: number = %u\n", i);
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");


    for(i = 0; i < MAXNUM; ++i) {
        free(ptrs[i]);
    }
    printf("test_malloc_free 3\n\n");
    printf("Free: number = %u\n", i);
    /* sleep and monitor */
    printf("Sleep %u seconds, ", SLEEP); 
    sleep(SLEEP);
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
    
}

void test_lazy_allocation()
{
    printf("----------------------------------------------------------------------------------------------\n");
    printf("At the beginning:\n");
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
 
    printf("Malloc:\nOutput of 'top':\n");
    char *ptr = (char *) malloc(1024 * 1024 * 256);
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");

    printf("Free:\nOutput of 'top':\n");
    free(ptr);
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
}

/*
 * md5 compare
 */
struct md5_less : public std::less<md5_digest_t>
{
    bool operator()(const md5_digest_t& a, const md5_digest_t& b) const
    {
        return md5_digest_compare(a,b) < 0;
    }

};

void test_map()
{
    uint64_t i = 0;
    std::map< md5_digest_t, uint64_t, md5_less> my_map;
    std::map< md5_digest_t, uint64_t, md5_less>::iterator iter;
    md5_digest_t my_fp;
    time_t my_start, my_end;
    double seconds;
    int ret;
    
    printf("----------------------------------------------------------------------------------------------\n");
    printf("test_map() 1\n\n");
    printf("At the beginning, map.size=%" PRIu64 "\n", my_map.size());
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
    

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        my_map[my_fp] = i;
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_map() 2\n\n");
    printf("Insert all FPs into std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    printf("Output of 'top':\n");
    output_top();
    printf("-------------------------------------------------------------------------------------------------\n");
  

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        iter = my_map.find(my_fp);
        if (iter == my_map.end())
        {
            printf("i = %" PRIu64 ", FP not found\n", i);
        }
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_map() 3\n\n");
    printf("Lookup all FPs from std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    printf("-----------------------------------------------------------------------------------------------\n");

    
    my_start = time(NULL);
    my_map.clear();
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_map() 4\n\n");
    printf("Delete all FPs from std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    /* sleep and monitor */
    printf("Sleep %u seconds, ", SLEEP); 
    sleep(SLEEP);
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
    
    printf("test_map() 5\n\n");
}


void test_cache()
{
    //printf("cache_node_t size = %u B, cache_page_t = %u B\n", sizeof(cache_node_t), sizeof(cache_page_t));
    uint64_t i = 0;
    md5_digest_t my_fp;
    time_t my_start, my_end;
    double seconds;
    const uint64_t areaSize = 1<<12;
    const uint64_t bits = 16;
    uint64_t dcid;
     
    cache_t *cache = cache_create(areaSize, bits);
    if(cache == NULL)
    {
        printf("Alloc cache fail\n");
        return;
    }
    
    printf("---------------------------------------------------------------------------------------------\n");
    printf("test_cache 1\n\n");
    printf("At the beginning, cache.size=%" PRIu64 "\n", cache->nitems);
    printf("Output of 'top':\n");
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
	

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        cache_add(cache, my_fp, i);
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_cache 2\n\n");
    printf("Insert all FPs into cache, cache.size=%" PRIu64 ", cost time = %.f seconds\n", cache->nitems, seconds);
    printf("Output of 'top':\n");
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
  
    
    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        if (cache_exists(cache, my_fp, dcid) != CACHE_OK)
        {
            printf("i = %" PRIu64 ", FP not found\n", i);
        }
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_cache 3\n\n");
    printf("Lookup all FPs from cache, cache.size=%" PRIu64 ", cost time = %.f seconds\n", cache->nitems, seconds);
    printf("---------------------------------------------------------------------------------------------\n");


    my_start = time(NULL);
    cache_destroy(cache);
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("test_cache 4\n\n");
    printf("Delete all FPs from cache, cost time = %.f seconds\n", seconds);
    printf("Output of 'top':\n");
    output_top();
    printf("----------------------------------------------------------------------------------------------\n");
    
    printf("test_cache 5\n\n");

}

int main(int argc, char **argv) 
{
    if(argc != 2 )
    {
        printf("usage: %s [map|cache|malloc-free|malloc-free-opt|malloc-free-top-chunk|malloc-free-top-chunk-mtrim|lazy-allocation] \n", argv[0]);
        exit(-1);
    }
    
    set_stack_limit();

    if(strcmp (argv[1], "map") == 0 )
    {
        test_map();
    }
    else if(strcmp (argv[1], "cache") == 0 )
    {
        test_cache();
    }
    else if(strcmp (argv[1], "malloc-free") == 0 )
    {
        test_malloc_free();
    }
    else if(strcmp (argv[1], "malloc-free-opt") == 0)
    {
        mallopt(M_MMAP_THRESHOLD, sizeof(1 * 1024)); 
        mallopt(M_MMAP_MAX, MAXNUM);
        //mallopt(M_TRIM_THRESHOLD, 0);
        test_malloc_free();
    }
    else if(strcmp (argv[1], "malloc-free-top-chunk") == 0 )
    {
        should_top_chunk = true;
        test_malloc_free();
    }
    else if(strcmp (argv[1], "malloc-free-top-chunk-mtrim") == 0 )
    {
        should_top_chunk = true;
        should_mtrim = true;
        test_malloc_free();
    }
    else if(strcmp (argv[1], "lazy-allocation") == 0 )
    {
        test_lazy_allocation();
    }
    else
    {
        printf("usage: %s [map|cache|malloc-free|malloc-free-opt|malloc-free-top-chunk|malloc-free-top-chunk-mtrim|lazy-allocation] \n", argv[0]);
        exit(-1);
    }

    printf("Now the process wil exit and die:\n");
    printf("Output of 'top':\n");
    output_top();
    printf("-----------------------------------------------------------------------------------------------\n");
    
    if(should_mtrim)
    {
        int ret = malloc_trim(0);
        printf("Malloc_trim(0), ret=%d\n", ret);
        printf("Output of 'top':\n");
        output_top();
    }

    return 0;
}
