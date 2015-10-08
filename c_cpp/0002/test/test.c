#include <unistd.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <inttypes.h>
#include <time.h>
#include <assert.h>
#include <errno.h>
#include <mcheck.h>
#include <sys/resource.h>

typedef struct linked_list
{
    int32_t member;
    struct linked_list *next;
}linked_list_t;

int main()
{

    return 0;
}
