#include "common.h"

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
    printf("At the beginning, map.size=%" PRIu64 "\n", my_map.size());
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("----------------------------------------------------------------------------------------------\n");
    

	my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        my_map[my_fp] = i;
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Insert all FPs into std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
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
    printf("Lookup all FPs from std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    printf("-----------------------------------------------------------------------------------------------\n");


	my_start = time(NULL);
    my_map.clear();
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Delete all FPs from std::map, map.size=%" PRIu64 ", cost time = %.f seconds\n", my_map.size(), seconds);
    /* sleep and monitor */
    printf("Sleep %u seconds\n", SLEEP); 
    sleep(SLEEP);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("-----------------------------------------------------------------------------------------------\n");
    

	my_start = time(NULL);
    ret = malloc_trim(0);
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
	printf("Malloc_trim(0), ret=%d, cost time = %.f seconds\n", ret, seconds);
    /* sleep and monitor */
    printf("Sleep %u seconds\n", SLEEP); 
    sleep(SLEEP);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
	printf("-----------------------------------------------------------------------------------------------\n");
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
    printf("At the beginning, cache.size=%" PRIu64 "\n", cache->nitems);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("---------------------------------------------------------------------------------------------\n");
	

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        cache_add(cache, my_fp, i);
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Insert all FPs into cache, cache.size=%" PRIu64 ", cost time = %.f seconds\n", cache->nitems, seconds);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
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
    printf("Lookup all FPs from cache, cache.size=%" PRIu64 ", cost time = %.f seconds\n", cache->nitems, seconds);
    printf("---------------------------------------------------------------------------------------------\n");


	my_start = time(NULL);
    cache_destroy(cache);
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Delete all FPs from cache, cost time = %.f seconds\n", seconds);
    /* sleep and monitor */
    printf("Sleep %u seconds\n", SLEEP); 
    sleep(SLEEP);
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("---------------------------------------------------------------------------------------------\n");

}

int main(int argc, char **argv) 
{
    if(argc != 2 )
    {
        printf("usage: %s [map|cache] \n", argv[0]);
        exit(-1);
    }
    
    if(strcmp (argv[1], "map") == 0 )
    {
            test_map();
    }
    else if(strcmp (argv[1], "cache") == 0 )
    {
        while(1)
            test_cache();
    }
    else
    {
        printf("usage: %s [map|cache] \n", argv[0]);
        exit(-1);
    }
    return 0;
}
