#include <unistd.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/types.h>
#include <string.h>
#include <malloc.h>
#include <list>

#define LEN 2048
#define MAXNUM 50000000
#define SLEEP 20

void output_top()
{
   FILE *in;
   char buf[LEN];
   char cmd[LEN];
   
   memset(cmd, 0, sizeof(cmd));
   snprintf(cmd, sizeof(cmd), "top -p %d -n 1  |grep %d", getpid(), getpid());
   if(!(in = popen(cmd, "r"))){
     exit(1);
   }
   
   while(fgets(buf, sizeof(buf), in)!=NULL){
     printf("%s", buf);
   }

   pclose(in);
}

void test_map()
{
  uint64_t i = 0;
  std::list<uint64_t> my_list;
  for(i = 0; i < MAXNUM; ++i) {
    my_list.push_back(i);
  }
  printf("Insert data into std::map, output of 'top':\n");
  output_top();
  
  printf("-------------------------------------------------------------------------------------\n");
  
  my_list.clear();
  sleep(SLEEP);
  printf("Delete data from std::map, sleep ( %u )seconds, output of 'top':\n", SLEEP);
  output_top();
}

void test_mycache()
{
}

void usage(char *prog)
{
	printf("Usage: %s [test_map | test_mycache]\n", prog);
	exit(-1);
}

int main(int argc, char **argv) 
{
    if(argc != 2)
    {
		usage(argv[0]);
    }

    if(strcmp(argv[1], "test_map") == 0)
    {
	    test_map();
    }
    else if(strcmp(argv[1], "test_mycache") == 0)
    {
	    test_mycache();
    }
    else
    {
	    usage(argv[0]);
    }

  return 0;
}
