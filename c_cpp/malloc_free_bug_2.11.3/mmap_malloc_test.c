#include <stdlib.h>
#include <stdio.h>
#include <sys/mman.h>
#include <unistd.h>

int main()
{
    size_t cnt = 0;
    FILE *f = fopen("/proc/sys/vm/max_map_count", "rb");
    if (f) 
    {
        fscanf(f, "%zu", &cnt);
    }
    size_t ps = sysconf(_SC_PAGESIZE);
    printf("cnt=%u, ps=%u\n", cnt, ps);
    
    char *x = mmap(0, ps*cnt, PROT_NONE, MAP_ANON|MAP_PRIVATE, -1, 0);
    printf(".........\n");
    system("pmap `pidof a.out` > pmap1.txt");
    system("pmap `pidof a.out` | egrep -e \"...p \" | wc -l");
    
    char *y;
    y = malloc(500000);
    printf(".........\n");
    system("pmap `pidof a.out` > pmap2.txt");
    system("pmap `pidof a.out` | egrep -e \"...p \" | wc -l");
    malloc(500000);
    printf(".........\n");
    system("pmap `pidof a.out` > pmap3.txt");
    system("pmap `pidof a.out` | egrep -e \"...p \" | wc -l");
    
    int i;
    for (i=0; i<cnt/2; i++)
    {
        mprotect(x+2*i*ps, ps, PROT_READ|PROT_WRITE);
    }
    printf(".........\n");
    system("pmap `pidof a.out` > pmap4.txt");
    system("pmap `pidof a.out` | egrep -e \"...p \" | wc -l");
    
    //2.11.x glibc will assert, it is fix in 2.15 and newer 
    free(y);

    printf(".........\n");
    printf("end!!!\n");
}
