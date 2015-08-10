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

void output_ps()
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

int main() {
  uint64_t i = 0;
  std::list<uint64_t> my_list;
  for(i = 0; i < MAXNUM; ++i) {
    my_list.push_back(i);
  }
  printf("After pushing data, output of 'top'\n");
  output_ps();
  
  my_list.clear();
  sleep(2);
  printf("After clearing data and sleep 2s, output of 'top'\n");
  output_ps();

  return 0;
}
