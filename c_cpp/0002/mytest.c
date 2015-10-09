#include "allocator.h"

#ifdef LINKEDLIST
#include "ll.h"
#endif

int main(int argc, char **argv) 
{
    int32_t ret = 0;
    
    set_stack_limit();

    cache_t cache;

#ifdef LINKEDLIST
    ret = cache_init(&cache, 16, 2 * MEGABYTE, sizeof(cache_ll_node_t), MAXNUM + 100);
    if(ret != CACHE_INIT_OK)
    {
        printf("cache_init fails\n");

        cache_deinit(&cache);
        
        exit(-1);
    }
    printf("*************************************************************************************************\n");
    printf("After init:\n");
    output_top();
#endif
    

    return 0;
}
