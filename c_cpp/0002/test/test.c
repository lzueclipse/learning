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
    linked_list_t *a, *b, *c;

    a = (linked_list_t *) malloc(sizeof(linked_list_t));
    b = (linked_list_t *) malloc(sizeof(linked_list_t));
    c = (linked_list_t *) malloc(sizeof(linked_list_t));

    a->member = 1;
    b->member = 2;
    c->member = 3;

    a->next = b;
    b->next = c;
    c->next = NULL;

    linked_list_t **tmp = &b;

    printf("a->next = %p, *tmp is = %p\n", a->next, *tmp);

    free(a);
    free(b);
    free(c);
    return 0;
}
