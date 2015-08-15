#include <stdio.h>
#include <stdlib.h>
#include <dlfcn.h>

extern void vendor1();
extern void vendor2();
int main(int argc, char **argv)
{
    
    if(argc != 2)
    {
       printf("%s [normal | dlopen]\n", argv[0]);
       exit(-1);
    }
    
    if(strcmp(argv[1], "normal") == 0)
    {
        vendor1();
        vendor2();
    }

    if(strcmp(argv[1], "dlopen") == 0)
    {
        void *handle;
        char *error;
        void (*vendor1_p) ();
        void (*vendor2_p) ();

        /*call vendor1() */
        handle = dlopen ("./libvendor1.so", RTLD_LAZY);
        if (!handle) 
        {
            printf("%s\n", dlerror());
            exit(-1);
        }

        viendor1_p = dlsym(handle, "vendor1");

        if ((error = dlerror()) != NULL)  
        {
            printf ("%s\n", error);
            exit(-1);
        }
         
        vendor1_p();
        dlclose(handle);
                            
        /*call vendor2() */
        handle = dlopen ("./libvendor2.so", RTLD_LAZY);
        if (!handle) 
        {
            printf("%s\n", dlerror());
            exit(-1);
        }

        viendor2_p = dlsym(handle, "vendor2");

        if ((error = dlerror()) != NULL)  
        {
            printf ("%s\n", error);
            exit(-1);
        }
         
        vendor2_p();
        dlclose(handle);

    }
    return 0;
}
