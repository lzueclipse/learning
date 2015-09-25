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


int main(int argc, char **argv) 
{
    set_stack_limit();


    return 0;
}
