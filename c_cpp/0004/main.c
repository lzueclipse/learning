#include <stdio.h>
#include <stdlib.h>

extern void vendor1();
extern void vendor2();
int main(int argc, char **argv)
{
    if(argc != 2)
    {
       printf("%s [normal | dlopen]\n", argv[0]);
       exit(0);
    }
    
    if(strcmp(argv[1], "normal") == 0)
    {
        vendor1();
        vendor2();
    }

    if(strcmp(argv[1], "dlopen") == 0)
    {

    }
    return 0;
}
