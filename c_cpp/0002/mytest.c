#include "allocator.h"

#ifdef LINKEDLIST
#include "ll.h"
#endif

#ifdef BST
#include "bst.h"
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
    printf("Use slab allocator to manage memory allocation, use linked list to manage finger print\n");
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
    printf("Insert %" PRIu64 " FPs into cache, cost time = %.f seconds\n", MAXNUM, seconds);
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
    printf("Lookup %" PRIu64 " FPs in cache, cost time = %.f seconds\n", MAXNUM, seconds);
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
    

    printf("Cache dump to file dump1.txt:\n");
    cache_dump(&cache, "dump1.txt");
    printf("---------------------------------------------------------------------------------------------\n");


    my_start = time(NULL);
    for(i = 0; i < MAXNUM/2; ++i) {
        uint64_to_md5(i, &my_fp);
        cache_delete(&cache, &my_fp);
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Delete %" PRIu64 " FPs in cache, cost time = %.f seconds\n", MAXNUM/2, seconds);
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
    

    printf("Cache dump to file dump2.txt:\n");
    cache_dump(&cache, "dump2.txt");
    printf("---------------------------------------------------------------------------------------------\n");


    printf("Reclaim some slabs:\n");
    uint64_t count = 0;
    do
    {
        printf("Reclaim  slab total num = %" PRIu64 "\n", ++count);
    }while( cache_slab_reclaim(&cache, cache_relocate) == 0);
    output_top();
#endif
  
#ifdef BST
    cache_bst_node_t *node, **slot;
    ret = cache_init(&cache, 16, 2 * MEGABYTE, sizeof(cache_bst_node_t), MAXNUM + 100);
    if(ret != CACHE_INIT_OK)
    {
        printf("cache_init fails\n");

        cache_deinit(&cache);
        
        exit(-1);
    }
    printf("Use slab allocator to manage memory allocation, use binary search tree to manage finger print\n");
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
    printf("Insert %" PRIu64 " FPs into cache, cost time = %.f seconds\n", MAXNUM, seconds);
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
    printf("Lookup %" PRIu64 " FPs in cache, cost time = %.f seconds\n", MAXNUM, seconds);
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
    

    printf("Cache dump to file dump1.txt:\n");
    cache_dump(&cache, "dump1.txt");
    printf("---------------------------------------------------------------------------------------------\n");


    my_start = time(NULL);
    for(i = 0; i < MAXNUM/2; ++i) {
        uint64_to_md5(i, &my_fp);
        cache_delete(&cache, &my_fp);
    }
    my_end = time(NULL);
    seconds = difftime(my_end, my_start);
    printf("Delete %" PRIu64 " FPs in cache, cost time = %.f seconds\n", MAXNUM/2, seconds);
    output_top();
    printf("---------------------------------------------------------------------------------------------\n");
    

    printf("Cache dump to file dump2.txt:\n");
    cache_dump(&cache, "dump2.txt");
    printf("---------------------------------------------------------------------------------------------\n");


    printf("Reclaim some slabs:\n");
    uint64_t count = 0;
    do
    {
        printf("Reclaim  slab total num = %" PRIu64 "\n", ++count);
    }while( cache_slab_reclaim(&cache, cache_relocate) == 0);
    output_top();
#endif



    return 0;
}
