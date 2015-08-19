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
    md5_digest_t my_fp;
    time_t my_end;
    double seconds;
    
    printf("-------------------------------------------------------------------------------------\n");
    printf("At the beginning, map.size=%" PRIu64 "\n", my_map.size());
    printf("Output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("-------------------------------------------------------------------------------------\n");
    
	time_t my_start = time(NULL);
    for(i = 0; i < MAXNUM; ++i) {
        uint64_to_md5(i, my_fp);
        my_map[my_fp] = i;
    }

    my_end = time(NULL);
    seconds = difftime(my_end, my_start);

    printf("Insert all FPs into std::map, map.size=%" PRIu64 "\n", my_map.size());
    printf("Cost %.f seconds, output of 'top':\n", seconds);
    output_top();
    display_mallinfo();
    printf("-------------------------------------------------------------------------------------\n");
  
    my_map.clear();
    printf("Delete all FPs from std::map, map.size=%" PRIu64 "\n", my_map.size());
    /* sleep and monitor */
    printf("Sleep %u seconds, ", SLEEP); 
    sleep(SLEEP);
    printf("output of 'top':\n");
    output_top();
    display_mallinfo();
    printf("-------------------------------------------------------------------------------------\n");
    
	printf("Malloc_trim(0), ret=%d\n", malloc_trim(0));
    /* sleep and monitor */
    printf("Sleep %u seconds, ", SLEEP); 
    sleep(SLEEP);
    printf("output of 'top':\n");
    output_top();
    display_mallinfo();
	printf("-------------------------------------------------------------------------------------\n");
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
    }
    else
    {
        printf("usage: %s [map|cache] \n", argv[0]);
        exit(-1);
    }
    return 0;
}
