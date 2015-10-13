#ifndef __COMMON__
#define __COMMON__
#include <unistd.h>
#include <sys/mman.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <openssl/md5.h>
#include <inttypes.h>
#include <time.h>
#include <assert.h>
#include <errno.h>
#include <mcheck.h>
#include <sys/resource.h>

#define LEN 2048
#define MAXNUM 400000
#define SLEEP 15

#define MEGABYTE ( 16 * 1024)

#define CACHE_INIT_OK 0
#define CACHE_INIT_ERROR -1

#define FREE_BLOCK_MARKER ((void *) -1)
#define NOT_FREE_BLOCK_MARKER ((void *) -2)

#define MALLOCED_FLAG 1

/*
 * 128 bits md5sum
 */
typedef struct
{
    union
    {
        unsigned char digest_uchar[16];
        uint32_t digest_uint[4];
    };
}md5_digest_t;

typedef struct block
{
    void *free_block_marker;
    struct block *prev, *next;
}block_t;

typedef struct slab
{
    struct slab *next;
    uint32_t flags;

    /*The data blocks */
    char data[0];
}slab_t;

typedef struct allocator
{
    size_t block_size;
    size_t blocks_per_slab;
    size_t slab_size;

    /*slabs*/
    slab_t *slabs;
    size_t slabs_num;

    /*free blocks */
    block_t *free_blocks;
    size_t free_blocks_num;

}allocator_t;

typedef struct allocator_iterator
{
    allocator_t *allocator;
    void *slab;
    void *block;
}allocator_iterator_t;

#define SLAB_T_DATA_OFFSET ( (size_t) (((slab_t *)(NULL))->data) )

extern void output_top();
extern void uint64_to_md5(uint64_t input, md5_digest_t *output );
extern int32_t md5_digest_compare(const md5_digest_t *a, const md5_digest_t *b);
extern void set_stack_limit();
extern void align_to_pow2(uint64_t *size, uint64_t pow2);

extern void* allocator_alloc(allocator_t *allocator);
extern void allocator_free(allocator_t *allocator, void *block);

extern int32_t allocator_slab_reclaim(allocator_t *allocator, 
        void (*relocate) (const void *source, void * dst, size_t block_size, void *user_data),
        void *user_data);

extern void* allocator_iterator_first(allocator_iterator_t *iter, allocator_t *allocator);
extern void* allocator_iterator_next(allocator_iterator_t *iter);

#endif
