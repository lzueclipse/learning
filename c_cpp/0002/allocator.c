#include "allocator.h"

/*
 * top -p <my pid> -n -1 
 */
void output_top()
{
    FILE *in;
    char buf[LEN];
    char cmd[LEN];
   
    memset(cmd, 0, sizeof(cmd));
    snprintf(cmd, sizeof(cmd), "top -p %d -n 1  |grep %d", getpid(), getpid());
    if(!(in = popen(cmd, "r")))
    {
        printf("%s: popen fails, %s\n", __FUNCTION__, strerror(errno));
        return;
    }
   
    while(fgets(buf, sizeof(buf), in)!=NULL)
    {
       printf("%s", buf);
    }

    pclose(in);
}


/*
 * uint64   --md5-->   128bits md5sum
 */
void uint64_to_md5(uint64_t input, md5_digest_t *output )
{
    char data[LEN] = {'\0'};
    snprintf(data, sizeof(data), "%" PRIu64, input);
    
    MD5_CTX ctx;
    MD5_Init(&ctx);
    
    MD5_Update(&ctx,data,strlen(data));
    
    MD5_Final(output->digest_uchar,&ctx);
}


/*
 * 0  -- equal
 * >0 -- more than
 * <0 -- less than
 */
int32_t md5_digest_compare(const md5_digest_t *a, const md5_digest_t *b)
{
    int32_t res = 0;

    if(a->digest_uint[0] != b->digest_uint[0])
    {
        res = (int32_t)a->digest_uint[0] - (int32_t)b->digest_uint[0];
    }
    else if(a->digest_uint[1] != b->digest_uint[1])
    {
        res = (int32_t)a->digest_uint[1] - (int32_t)b->digest_uint[1];
    }
    else if(a->digest_uint[2] != b->digest_uint[2])
    {
        res = (int32_t)a->digest_uint[2] - (int32_t)b->digest_uint[2];
    }
    else if(a->digest_uint[3] != b->digest_uint[3])
    {
        res = (int32_t)a->digest_uint[3] - (int32_t)b->digest_uint[3];
    }
    
    return res;
}

void set_stack_limit()
{
    const rlim_t stack_size = 128L * 1024L * 1024L;   // min stack size = 128MB
    struct rlimit rl;
    int32_t result;

    result = getrlimit(RLIMIT_STACK, &rl);
    if (result == 0)
    {
        if(rl.rlim_cur < stack_size)
        {
            rl.rlim_cur = stack_size;
            result = setrlimit(RLIMIT_STACK, &rl);
            if (result != 0)
            {
                printf("setrlimit failed\n");
            }
        }
    }
    else
    {
        printf("getrlimit failed\n");
    }
}

__inline__ void align_to_pow2(uint64_t *size, uint64_t pow2)
{
    pow2--;
    *size =((*size) + pow2) & (~pow2);
}

void allocator_slab_to_free_blocks(allocator_t *allocator, slab_t *slab)
{
    block_t *block;
    char *p, *block_char;

    if(allocator == NULL || slab == NULL)
        return;

    block_char = (char *)slab + allocator->slab_size - allocator->block_size;
    block = allocator->free_blocks;

    if(block)
        block->prev = (block_t *)block_char;

    for(p = block_char; p >= (char *)slab->data;)
    {
        ((block_t *)p)->free_block_marker = FREE_BLOCK_MARKER;
        
        /*next block */
        block_char = p - allocator->block_size;
     
        ((block_t *)p)->next = (block_t *)block;
        ((block_t *)p)->prev = (block_t *)block_char;

        block = (block_t *)p;
        p = block_char;
    }

    block->prev = NULL;
    allocator->free_blocks = block;
    allocator->free_blocks_num += allocator->blocks_per_slab;
}

int32_t allocator_slab_add(allocator_t *allocator)
{
    slab_t *slab;
    if(allocator == NULL)
        return -1;

    slab = (slab_t *)mmap(NULL, allocator->slab_size, PROT_READ|PROT_WRITE, MAP_ANON|MAP_PRIVATE, -1, 0);

    if(slab != MAP_FAILED)
    {
        memset(slab, 0, sizeof(*slab));
    }
    else
    {
        slab = (slab_t *)malloc(allocator->slab_size);
        if(slab != NULL)
        {
            memset(slab, 0, sizeof(*slab));
            slab->flags = MALLOCED_FLAG;
        }
        else
        {
            printf("Both mmap and malloc failed\n");
            return -1;
        }
    }

    mlock(slab, allocator->slab_size);

    slab->next = allocator->slabs;
    allocator->slabs = slab;
    allocator->slabs_num++;

    allocator_slab_to_free_blocks(allocator, slab);
    return 0;
}

void allocator_slab_delete(allocator_t *allocator, slab_t *slab)
{
    if(allocator == NULL || slab == NULL)
        return;
    
    munlock(slab, allocator->slab_size);

    if(slab->flags == MALLOCED_FLAG)
        free(slab);
    else
        munmap(slab, allocator->slab_size);
}

void* allocator_alloc(allocator_t *allocator)
{
    block_t *block;

    if(allocator == NULL)
        return  NULL;

    if(allocator->free_blocks == NULL)
    {
        allocator_slab_add(allocator);
        if(allocator->free_blocks == NULL)
        {
            printf("Could not alloca memory\n");
            return NULL;
        }
    }

    block = allocator->free_blocks;
    if(block->next)
        block->next->prev = NULL;

    allocator->free_blocks = block->next;
    allocator->free_blocks_num--;

    /*-1 to 0 */
    (*((char *)(block->free_block_marker)))++;

    return block;
}

void allocator_free(allocator_t *allocator, void *block)
{
    if(allocator == NULL || block == NULL)
        return;

    block_t *my_block = (block_t *)block;

    my_block->free_block_marker = FREE_BLOCK_MARKER;
    my_block->prev = NULL;
    my_block->next = allocator->free_blocks;
    
    if(my_block->next != NULL)
        my_block->next->prev = my_block;

    allocator->free_blocks = my_block;
    allocator->free_blocks_num++;
}

void allocator_block_reclaim(allocator_t *allocator, block_t *block)
{
    if(allocator == NULL || block == NULL)
        return;

    if(block->prev || block->next)
    {
        if(block->prev)
            block->prev->next = block->next;
        else
            allocator->free_blocks = block->next;

        if(block->next)
            block->next->prev = block->prev;

        allocator->free_blocks_num--;
    }
    else if(allocator->free_blocks == block)
    {
        allocator->free_blocks = NULL;
        allocator->free_blocks_num = 0;
    }
}

size_t allocator_slab_reclaim(allocator_t *allocator, 
        void (*relocate) (const void *source, void * dst, size_t block_size, void *user_data),
        void *user_data)
{
    return 0;
}

void* allocator_iterator_first(allocator_iterator_t *iter, allocator_t *allocator)
{
    return NULL;
}

void* allocator_iterator_next(allocator_iterator_t *iter)
{
    return NULL;
}
