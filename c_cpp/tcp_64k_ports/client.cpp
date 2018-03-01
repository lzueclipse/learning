#include <stdio.h>
#include <unistd.h>
#include <inttypes.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <arpa/inet.h>
#include <string.h>
#include <signal.h>
#include <vector>

std::vector<int> socks_vec;

/*
 * Display the usage.
 */
void showUsage()
{
    printf(
    "Usage:  client -s <server IP>  -p <port number> -n <connection number>... \n"
    "  -s <server IP>  = Sever IP address to connect.\n"
    "  -p <port number>  = Server port number to connect.\n"
    "  -n <connection number>  = Connection number you want.\n"
    );
    exit(0);
}

/*
 *return 0 -- connect succeed
 *return -1 -- connect fail
 */
int myconnect(char *server_ip, int server_port)
{
    int sock;
    socklen_t clen;
    struct sockaddr_in client_addr;
    struct sockaddr_in server_addr;

    if(server_ip == NULL)
        return -1;
    
    if((sock=socket(AF_INET,SOCK_STREAM,IPPROTO_TCP))<0)
    {
        perror("Socket error:");
        return -1 ;
    }

    clen = sizeof(server_addr);
    memset(&server_addr,0,sizeof(server_addr));
    server_addr.sin_family     =AF_INET;
    server_addr.sin_addr.s_addr=inet_addr(server_ip);
    server_addr.sin_port       =htons(server_port);

    if(connect(sock,(struct sockaddr *)&server_addr,clen)<0)
    {
        perror("Connect error:");
        return -1;
    }
    
    socks_vec.push_back(sock);
    return 0;
}

void myclose()
{
    for (std::vector<int>::iterator it = socks_vec.begin() ; it != socks_vec.end(); ++it)
    {
        close(*it);
    }
}

int main(int argc, char **argv)
{
    int arg_flag = 0;
    char *server_ip;
    int server_port = 0;
    int conn_num = 0;
    char *reuse_addr;
    
    if(argc < 4) 
        showUsage();
    
    while (( arg_flag = getopt(argc, argv, "s:p:n:")) != -1 ) {
        switch (arg_flag) {
        case 's':
            server_ip = optarg;
            break;
        case 'p':
            server_port = atoi(optarg);
            break;
        case 'n':
            conn_num  = atoi(optarg);
            break;
        case ':':   
            fprintf(stderr,
                   "Option -%c requires an operand\n", optopt);
            showUsage();
        case '?':
            fprintf(stderr, "ERR: %c: bad flag!\n", optopt);
            showUsage();
        }
    }
    

    for(int i = 0; i < conn_num; i++)
    {
        if(myconnect(server_ip, server_port) == -1)
        {
            break;
        }
    }

    printf("Connection Number: %" PRIu64 "\n", socks_vec.size());
    
    sleep(120);

    myclose();
    
    return 0;
}
