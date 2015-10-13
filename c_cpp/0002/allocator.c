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

static void allocator_slab_to_free_blocks(allocator_t *allocator, slab_t *slab)
{
    block_t *next;
    char *p, *prev;

    if(allocator == NULL || slab == NULL)
        return;

    prev = (char *)slab + allocator->slab_size - allocator->block_size;
    next = allocator->free_blocks;

    if(next)
        next->prev = (block_t *)prev;

    for(p = prev; p >= (char *)slab->data;)
    {
        ((block_t *)p)->free_block_marker = FREE_BLOCK_MARKER;
        
        /*next block */
        prev = p - allocator->block_size;
     
        ((block_t *)p)->next = (block_t *)next;
        ((block_t *)p)->prev = (block_t *)prev;

        next = (block_t *)p;
        p = prev;
    }

    next->prev = NULL;
    allocator->free_blocks = next;
    allocator->free_blocks_num += allocator->blocks_per_slab;
}

/*
 * -1 ----fail
 * 0 -----success
 */
static int32_t allocator_slab_add(allocator_t *allocator)
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

static void allocator_slab_delete(allocator_t *allocator, slab_t *slab)
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
    //(*((char **) &(block->free_block_marker)))++;

    /*-1 to -2 */
    block->free_block_marker = NOT_FREE_BLOCK_MARKER;
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

static void allocator_block_reclaim(allocator_t *allocator, block_t *block)
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

/* -1 ---no need to reclaim
 * 0 ----success
 */
int32_t allocator_slab_reclaim(allocator_t *allocator, 
        void (*relocate) (const void *source, void * dst, size_t block_size, void *user_data),
        void *user_data)
{
    slab_t *slab;
    char *p, *slab_end_char;

    if(allocator == NULL || user_data == NULL)
    {
        return -1;
    }

    if(allocator->slabs == NULL)
    {
        printf("No slabs left to reclaim\n");
        return -1;
    }

    if(allocator->free_blocks_num < allocator->blocks_per_slab)
    {
        /*
         * not engough free blocks, no need to reclaim
         */
        return -1;
    }

    slab = allocator->slabs;
    allocator->slabs = slab->next;
    allocator->slabs_num--;

    slab_end_char = (char *)slab + allocator->slab_size;

    for(p = slab_end_char - allocator->block_size; p >= (char *)slab->data; p -= allocator->block_size)
    {
        block_t *source = (block_t *) p;

        if(source->free_block_marker = FREE_BLOCK_MARKER)
        {
            /*
             * the block is not used, just need to reclaim this block
             */
            allocator_block_reclaim(allocator, source);
        }
        else
        {
            block_t *dest;

            /*
             * until we find a "dest" block in different slab
             */
            while(1)
            {
                dest = (block_t *)allocator_alloc(allocator);

                if(dest == NULL)
                {
                    return -1;
                }

                if((char *)dest < (char *)slab || (char *)dest >= slab_end_char)
                {
                    //"dest" block in different slab
                    break;
                }

                //"dest" block is in same slab, mark it as not used, the slab which "source" in will be freed soon
                dest->free_block_marker = FREE_BLOCK_MARKER;
                dest->next = NULL;
                dest->prev = NULL;
            }
            
            //the slab which "source" in will be freed soon, so no need to update "source"
            move(source, dest, allocator->block_size, user_data);
        }
    }

    allocator_slab_delete(allocator, slab);

    return 0;
}

void* allocator_iterator_first(allocator_iterator_t *iter, allocator_t *allocator)
{
    if(iter == NULL || allocator == NULL)
        return NULL;

    iter->allocator = allocator;
    iter->slab = allocator->slabs;

    if(iter->slab)
    {
        iter->block = (char *)(iter->slab) + allocator->slab_size - allocator->block_size;
        if( ((block_t *)iter->block)->free_block_marker == FREE_BLOCK_MARKER )
        {
            return allocator_iterator_next(iter);
        }
    }
    else
    {
        iter->block = NULL;
    }

    return iter->block;
}

void* allocator_iterator_next(allocator_iterator_t *iter)
{
    if(iter == NULL)
        return NULL;

    if(iter->block == NULL)
        return NULL;

    do
    {
        iter->block = (char *)(iter->block) - iter->allocator->block_size;

        if( (char *)(iter->block) < (char *)(((slab_t *)(iter->slab))->data) )
        {
            //next slab
            iter->slab = ((slab_t *)(iter->slab))->next;

            if(iter->slab)
                iter->block = (char *)iter->slab + iter->allocator->slab_size - iter->allocator->block_size;
            else
            {
                iter->block = NULL;
                break;
            }
        }
    }while( ((block_t *)(iter->block))->free_block_marker == FREE_BLOCK_MARKER );

    return iter->block;
}
