#include <sys/types.h>
#include <dirent.h>
#include <unistd.h>
#include <stdio.h>
void main()
{
    DIR * dir;
    struct dirent * ptr;
    int i;
    dir = opendir("/usr/openv/lib/ost-plugins/");
    if(dir == NULL)
    {
        printf("opendir error\n");
    }
    while((ptr = readdir(dir)) != NULL)
    {
         printf("d_name : %s\n", ptr->d_name);
    }
    closedir(dir);
}
