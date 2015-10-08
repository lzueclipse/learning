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

void* allocator_alloc(allocator_t allocator)
{
    return  NULL;
}
