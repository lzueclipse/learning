#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <arpa/inet.h>
#include <string.h>
#include <signal.h>
#include <time.h>


/*
 * Display the usage.
 */
void showUsage()
{
    printf(
    "Usage:  server  -p <port number> ... \n"
    "  -p <port number>  = listen or target TCP port number, required.\n"
    );
    exit(0);
}

int main(int argc, char *argv[])
{
    int server_port = 0;

    int lsock = -1;	// Listen socket.
    int csock = -1;	// Connection socket.
    socklen_t clen;
    struct sockaddr_in client_addr, server_addr;
    struct linger so_linger;
    int ret = 0;
    int arg_flag;
 

    if(argc < 2) 
        showUsage();
    
    while (( arg_flag = getopt(argc, argv, "p:")) != -1 ) {
        switch (arg_flag) {
        case 'p':
            server_port = atoi(optarg);
            break;
        case ':':   
            fprintf(stderr,
                   "Option -%c requires an operand\n", optopt);
            showUsage();
            exit(1);
        case '?':
            fprintf(stderr, "ERR: %c: bad flag!\n", optopt);
            showUsage();
            exit(1);
        }
    }


    fprintf(stdout, "Binding TCP socket ...\n");
    if( (lsock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP)) < 0 ) {
        perror("Socket error:");
        exit(1);
    }

    clen = sizeof(client_addr);
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    server_addr.sin_port = htons(server_port);

    if ( bind(lsock, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0){
        perror("Bind error");
        exit(1);
    }

    if ( listen(lsock, 8) < 0 ) {
        perror("Listen error:");
        exit(1);
    }

    fprintf(stdout, "Listening on ANY:%d ...\n", server_port);

    while (1)
    {
        csock = accept(lsock, (struct sockaddr *)&client_addr, &clen);
        if (csock < 0) {
            perror("Acceptccept error:");
            exit(1);
        }
    }

    return 0;

}
