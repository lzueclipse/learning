#include <stdio.h>
#include <stdlib.h>
#include <dlfcn.h>

extern void vendor1();
extern void vendor2();
int main(int argc, char **argv)
{
    
    if(argc != 2)
    {
       printf("%s [general | dlopen]\n", argv[0]);
       exit(-1);
    }
    
    if(strcmp(argv[1], "general") == 0)
    {
        printf("-----------------------general--------------------\n");
        vendor1();
        vendor2();
    }
    else if(strcmp(argv[1], "dlopen") == 0)
    {
        void *handle;
        char *error;
        void (*vendor1_p) ();
        void (*vendor2_p) ();
        
        printf("----------------------dlopen----------------------\n");

        /*call vendor1() */
        handle = dlopen ("./libvendor1.so", RTLD_NOW|RTLD_LOCAL);
        //handle = dlopen ("./libvendor1.so", RTLD_LAZY);
        if (!handle) 
        {
            printf("%s\n", dlerror());
            exit(-1);
        }

        vendor1_p = dlsym(handle, "vendor1");

        if ((error = dlerror()) != NULL)  
        {
            printf ("%s\n", error);
            exit(-1);
        }
         
        vendor1_p();
        dlclose(handle);
                            
        /*call vendor2() */
        handle = dlopen ("./libvendor2.so", RTLD_NOW|RTLD_LOCAL);
        //handle = dlopen ("./libvendor2.so", RTLD_LAZY);
        if (!handle) 
        {
            printf("%s\n", dlerror());
            exit(-1);
        }

        vendor2_p = dlsym(handle, "vendor2");

        if ((error = dlerror()) != NULL)  
        {
            printf ("%s\n", error);
            exit(-1);
        }
         
        vendor2_p();
        dlclose(handle);

    }
    else
    {
       printf("%s [general | dlopen]\n", argv[0]);
       exit(-1);
    }
    return 0;
}
