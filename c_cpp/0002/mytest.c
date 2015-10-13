#include "allocator.h"

#ifdef LINKEDLIST
#include "ll.h"
#endif

int main(int argc, char **argv) 
{
    int32_t ret = 0;
    uint64_t i = 0;
    md5_digest_t my_fp;
    time_t my_start, my_end;
    double seconds;
    uint64_t dcid;
    
    set_stack_limit();

    cache_t cache;

#ifdef LINKEDLIST
    cache_ll_node_t *node, **slot;
    ret = cache_init(&cache, 16, 2 * MEGABYTE, sizeof(cache_ll_node_t), MAXNUM + 100);
    if(ret != CACHE_INIT_OK)
    {
        printf("cache_init fails\n");

        cache_deinit(&cache);
        
        exit(-1);
    }
    printf("---------------------------------------------------------------------------------------------\n");
    printf("After cache_init:\n");
    printf("Output of 'top':\n");
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, &my_fp);
        cache_insert(&cache, &my_fp, i);
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Insert all FPs into cache, cost time = %.f seconds\n", seconds);
    printf("Output of 'top':\n");
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");

    my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, &my_fp);
        slot = cache_lookup_slot(&cache, &my_fp);
        node = *slot;

        if(node != NULL)
        {
            if(i != node->dcid)
                 printf("Not found in cache, i = %" PRIu64 ", node->dcid = %" PRIu64 "\n", i, node->dcid);
        }
        else
        {
            printf("Not found in cache, i = %" PRIu64 "\n", i);
        }
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Lookup all FPs in cache, cost time = %.f seconds\n", seconds);
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
    
    printf("Cache dump to file dump.txt:\n");
    cache_dump(&cache);
    printf("---------------------------------------------------------------------------------------------\n");

#endif
    

    return 0;
}
