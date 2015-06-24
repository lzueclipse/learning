Thread 151 (Thread 0x7f68e830a700 (LWP 17907)):
#0  0x00007f68e7870387 in do_sigwait () from /lib64/libpthread.so.0
#1  0x00007f68e787042d in sigwait () from /lib64/libpthread.so.0
#2  0x00000000004348a9 in __signalMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 150 (Thread 0x7f6865ae4700 (LWP 17908)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004b1188 in History::historyMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 149 (Thread 0x7f684ba35700 (LWP 17909)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000047aba4 in Cr_MemoryManager::Main(Pd_Thread<Cr_MemoryManager>*) ()
#3  0x000000000047ae00 in Pd_Thread<Cr_MemoryManager>::Run(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 148 (Thread 0x7f684b9b4700 (LWP 17911)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c1a41 in _crConfigClass::SDSleep(int) ()
#3  0x0000000000426d37 in Cr_IndexManager::ThreadMain() ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 147 (Thread 0x7f684b933700 (LWP 17912)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044e98f in _storeClassWriteMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 146 (Thread 0x7f684b8b2700 (LWP 17913)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x0000000000449ce3 in _storeClassPrefetchMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 145 (Thread 0x7f684b831700 (LWP 17914)):
#0  0x00007f68e786c879 in pthread_cond_timedwait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000046949d in _storeClassCompactMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 144 (Thread 0x7f684b7b0700 (LWP 17915)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044ed48 in WriteThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 143 (Thread 0x7f684b72f700 (LWP 17916)):
#0  0x00007f68e786c879 in pthread_cond_timedwait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00000000004832b7 in _storeClassCheckCRCMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 142 (Thread 0x7f684b6ae700 (LWP 17917)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 141 (Thread 0x7f684b22c700 (LWP 17918)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 140 (Thread 0x7f684b1ab700 (LWP 17919)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 139 (Thread 0x7f684b12a700 (LWP 17920)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 138 (Thread 0x7f684a8a7700 (LWP 17921)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 137 (Thread 0x7f684a425700 (LWP 17922)):
#0  0x00007f68e617351d in nanosleep () from /lib64/libc.so.6
#1  0x00007f68e617333c in sleep () from /lib64/libc.so.6
#2  0x000000000043ca60 in __spoolerMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 136 (Thread 0x7f684a3a4700 (LWP 17923)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 135 (Thread 0x7f6849f22700 (LWP 17924)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 134 (Thread 0x7f6849aa0700 (LWP 17925)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x0000000000443b95 in __storageclassMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 133 (Thread 0x7f6848e1c700 (LWP 17926)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 132 (Thread 0x7f6848d99700 (LWP 17927)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 131 (Thread 0x7f6848d18700 (LWP 17928)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 130 (Thread 0x7f6848c97700 (LWP 17929)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 129 (Thread 0x7f6848c16700 (LWP 17930)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 128 (Thread 0x7f6848b95700 (LWP 17931)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 127 (Thread 0x7f6848b14700 (LWP 17932)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 126 (Thread 0x7f6848a93700 (LWP 17933)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 125 (Thread 0x7f6848a12700 (LWP 17934)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 124 (Thread 0x7f6848991700 (LWP 17935)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 123 (Thread 0x7f6848910700 (LWP 17936)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 122 (Thread 0x7f684888f700 (LWP 17937)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 121 (Thread 0x7f684880e700 (LWP 17938)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 120 (Thread 0x7f684878d700 (LWP 17939)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 119 (Thread 0x7f684870c700 (LWP 17940)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 118 (Thread 0x7f684868b700 (LWP 17941)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 117 (Thread 0x7f684860a700 (LWP 17942)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 116 (Thread 0x7f6848589700 (LWP 17943)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 115 (Thread 0x7f6848508700 (LWP 17944)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 114 (Thread 0x7f6848487700 (LWP 17945)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 113 (Thread 0x7f6848406700 (LWP 17946)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 112 (Thread 0x7f6848385700 (LWP 17947)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 111 (Thread 0x7f6848304700 (LWP 17948)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 110 (Thread 0x7f6848283700 (LWP 17949)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 109 (Thread 0x7f6848202700 (LWP 17950)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 108 (Thread 0x7f6848181700 (LWP 17951)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 107 (Thread 0x7f6848100700 (LWP 17952)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 106 (Thread 0x7f6843fff700 (LWP 17953)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 105 (Thread 0x7f6843f7e700 (LWP 17954)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 104 (Thread 0x7f6843efd700 (LWP 17955)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 103 (Thread 0x7f6843e7c700 (LWP 17956)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 102 (Thread 0x7f6843dfb700 (LWP 17957)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 101 (Thread 0x7f6843d7a700 (LWP 17958)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 100 (Thread 0x7f6843cf9700 (LWP 17959)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 99 (Thread 0x7f6843c78700 (LWP 17960)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 98 (Thread 0x7f6843bf7700 (LWP 17961)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 97 (Thread 0x7f6843b76700 (LWP 17962)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 96 (Thread 0x7f6843af5700 (LWP 17963)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 95 (Thread 0x7f6843a74700 (LWP 17964)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 94 (Thread 0x7f68439f3700 (LWP 17965)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 93 (Thread 0x7f6843972700 (LWP 17966)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 92 (Thread 0x7f68438f1700 (LWP 17967)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 91 (Thread 0x7f6843870700 (LWP 17968)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 90 (Thread 0x7f68437ef700 (LWP 17969)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 89 (Thread 0x7f684376e700 (LWP 17970)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 88 (Thread 0x7f68436ed700 (LWP 17971)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 87 (Thread 0x7f684366c700 (LWP 17972)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 86 (Thread 0x7f68435eb700 (LWP 17973)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 85 (Thread 0x7f684356a700 (LWP 17974)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 84 (Thread 0x7f68434e9700 (LWP 17975)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 83 (Thread 0x7f6843468700 (LWP 17976)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 82 (Thread 0x7f68433e7700 (LWP 17977)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 81 (Thread 0x7f6843366700 (LWP 17978)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 80 (Thread 0x7f68432e5700 (LWP 17979)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 79 (Thread 0x7f6843264700 (LWP 17980)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 78 (Thread 0x7f68431e3700 (LWP 17981)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 77 (Thread 0x7f6843162700 (LWP 17982)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 76 (Thread 0x7f68430e1700 (LWP 17983)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 75 (Thread 0x7f6843060700 (LWP 17984)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 74 (Thread 0x7f6842fdf700 (LWP 17985)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 73 (Thread 0x7f6842f5e700 (LWP 17986)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 72 (Thread 0x7f6842edd700 (LWP 17987)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 71 (Thread 0x7f6842e5c700 (LWP 17988)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 70 (Thread 0x7f6842ddb700 (LWP 17989)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 69 (Thread 0x7f6842d5a700 (LWP 17990)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 68 (Thread 0x7f6842cd9700 (LWP 17991)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 67 (Thread 0x7f6842c58700 (LWP 17992)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 66 (Thread 0x7f6842bd7700 (LWP 17993)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 65 (Thread 0x7f6842b56700 (LWP 17994)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 64 (Thread 0x7f6842ad5700 (LWP 17995)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 63 (Thread 0x7f6842a54700 (LWP 17996)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 62 (Thread 0x7f68429d3700 (LWP 17997)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 61 (Thread 0x7f6842952700 (LWP 17998)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 60 (Thread 0x7f68428d1700 (LWP 17999)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 59 (Thread 0x7f6842850700 (LWP 18000)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 58 (Thread 0x7f68427cf700 (LWP 18001)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 57 (Thread 0x7f684274e700 (LWP 18002)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 56 (Thread 0x7f68426cd700 (LWP 18003)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 55 (Thread 0x7f684264c700 (LWP 18004)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 54 (Thread 0x7f68425cb700 (LWP 18005)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 53 (Thread 0x7f684254a700 (LWP 18006)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 52 (Thread 0x7f68424c9700 (LWP 18007)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 51 (Thread 0x7f6842448700 (LWP 18008)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 50 (Thread 0x7f68423c7700 (LWP 18009)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 49 (Thread 0x7f6842346700 (LWP 18010)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 48 (Thread 0x7f68422c5700 (LWP 18011)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 47 (Thread 0x7f6842244700 (LWP 18012)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 46 (Thread 0x7f68421c3700 (LWP 18013)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 45 (Thread 0x7f6842142700 (LWP 18014)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 44 (Thread 0x7f68420c1700 (LWP 18015)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 43 (Thread 0x7f6842040700 (LWP 18016)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 42 (Thread 0x7f6841fbf700 (LWP 18017)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 41 (Thread 0x7f6841f3e700 (LWP 18018)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 40 (Thread 0x7f6841ebd700 (LWP 18019)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 39 (Thread 0x7f6841e3c700 (LWP 18020)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 38 (Thread 0x7f6841dbb700 (LWP 18021)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 37 (Thread 0x7f6841d3a700 (LWP 18022)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 36 (Thread 0x7f6841cb9700 (LWP 18023)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 35 (Thread 0x7f6841c38700 (LWP 18024)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 34 (Thread 0x7f6841bb7700 (LWP 18025)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 33 (Thread 0x7f6841b36700 (LWP 18026)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 32 (Thread 0x7f6841ab5700 (LWP 18027)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 31 (Thread 0x7f6841a34700 (LWP 18028)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 30 (Thread 0x7f68419b3700 (LWP 18029)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 29 (Thread 0x7f6841932700 (LWP 18030)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 28 (Thread 0x7f68418b1700 (LWP 18031)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 27 (Thread 0x7f6841830700 (LWP 18032)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 26 (Thread 0x7f68417af700 (LWP 18033)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 25 (Thread 0x7f684172e700 (LWP 18034)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 24 (Thread 0x7f68416ad700 (LWP 18035)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 23 (Thread 0x7f684162c700 (LWP 18036)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 22 (Thread 0x7f68415ab700 (LWP 18037)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 21 (Thread 0x7f684152a700 (LWP 18038)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 20 (Thread 0x7f68414a9700 (LWP 18039)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 19 (Thread 0x7f6841428700 (LWP 18040)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 18 (Thread 0x7f68413a7700 (LWP 18041)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 17 (Thread 0x7f6841326700 (LWP 18042)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 16 (Thread 0x7f68412a5700 (LWP 18043)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 15 (Thread 0x7f6841224700 (LWP 18044)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 14 (Thread 0x7f68411a3700 (LWP 18045)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 13 (Thread 0x7f6841122700 (LWP 18046)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 12 (Thread 0x7f68410a1700 (LWP 18047)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 11 (Thread 0x7f6841020700 (LWP 18048)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 10 (Thread 0x7f6840f9f700 (LWP 18049)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 9 (Thread 0x7f6840f1e700 (LWP 18050)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 8 (Thread 0x7f6840e9d700 (LWP 18051)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 7 (Thread 0x7f6840e1c700 (LWP 18052)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 6 (Thread 0x7f6840d9b700 (LWP 18053)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 5 (Thread 0x7f6840d1a700 (LWP 18054)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e6df0c8a in Pd_Reactor::ListenerThread(Pd_Thread<Pd_Reactor>*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e6df2674 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 4 (Thread 0x7f6840c99700 (LWP 18055)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000042ee58 in __taskMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 3 (Thread 0x7f6840c18700 (LWP 18056)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c1a41 in _crConfigClass::SDSleep(int) ()
#3  0x0000000000437d3f in __monitorMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 2 (Thread 0x7f6840b97700 (LWP 18057)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c1a0f in _crConfigClass::SDSleep(int) ()
#3  0x00000000004713b6 in __syncMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 1 (Thread 0x7f68e834b700 (LWP 17906)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e7363414 in NetWaitForRemote () from /usr/openv/pdde/pdcr/../pdshared/lib/libdct.so
#2  0x00000000004290f3 in __ConnRun(_crConnectionClass*) ()
#3  0x0000000000412ac5 in __sdRun() ()
#4  0x000000000041399c in SDMain ()
#5  0x00007f68e60ecbe6 in __libc_start_main () from /lib64/libc.so.6

Thread 151 (Thread 0x7f68e830a700 (LWP 17907)):
#0  0x00007f68e7870387 in do_sigwait () from /lib64/libpthread.so.0
#1  0x00007f68e787042d in sigwait () from /lib64/libpthread.so.0
#2  0x00000000004348a9 in __signalMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 150 (Thread 0x7f6865ae4700 (LWP 17908)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004b1188 in History::historyMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 149 (Thread 0x7f684ba35700 (LWP 17909)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000047aba4 in Cr_MemoryManager::Main(Pd_Thread<Cr_MemoryManager>*) ()
#3  0x000000000047ae00 in Pd_Thread<Cr_MemoryManager>::Run(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 148 (Thread 0x7f684b9b4700 (LWP 17911)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c19da in _crConfigClass::SDSleep(int) ()
#3  0x0000000000426d37 in Cr_IndexManager::ThreadMain() ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 147 (Thread 0x7f684b933700 (LWP 17912)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044e98f in _storeClassWriteMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 146 (Thread 0x7f684b8b2700 (LWP 17913)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x0000000000449ce3 in _storeClassPrefetchMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 145 (Thread 0x7f684b831700 (LWP 17914)):
#0  0x00007f68e614ff7d in memset () from /lib64/libc.so.6
#1  0x00007f68e6aa97dc in DORecord::init(unsigned long, unsigned long, unsigned long, unsigned int, unsigned int, unsigned int, unsigned long const*, unsigned int, md5_digest_t const*, unsigned int, unsigned long const*, char const*, unsigned int const*, unsigned int, _cr_tref_t const* const*, unsigned int, unsigned char, unsigned char) () from /usr/openv/pdde/pdcr/../pdshared/lib/libsdb.so
#2  0x00007f68e6aaa45f in DORecord::DORecord(unsigned long, unsigned long, unsigned long, unsigned int, unsigned int, unsigned int, md5_digest_t const*, unsigned int, unsigned long const*, char const*, _cr_tref_t const* const*, unsigned int, unsigned char, unsigned char) () from /usr/openv/pdde/pdcr/../pdshared/lib/libsdb.so
#3  0x00000000004720f0 in DataStoreUtilDOConvert(_dc_entry const*, boost::intrusive_ptr<DORecord>*, unsigned long) ()
#4  0x0000000000465507 in _storeMarkSOCache(_crDataStoreClass*, std::map<unsigned long, boost::intrusive_ptr<CRDigestMap>, std::less<unsigned long>, std::allocator<std::pair<unsigned long const, boost::intrusive_ptr<CRDigestMap> > > >&) ()
#5  0x00000000004682ce in _storeCompactContainers(_crDataStoreClass*, std::set<unsigned long, std::less<unsigned long>, std::allocator<unsigned long> >&) ()
#6  0x0000000000468f66 in _storeClassCompactMain(void*) ()
#7  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#8  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#9  0x0000000000000000 in ?? ()
Thread 144 (Thread 0x7f684b7b0700 (LWP 17915)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044ed48 in WriteThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 143 (Thread 0x7f684b72f700 (LWP 17916)):
#0  0x00007f68e786c879 in pthread_cond_timedwait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00000000004832b7 in _storeClassCheckCRCMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 142 (Thread 0x7f684b6ae700 (LWP 17917)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 141 (Thread 0x7f684b22c700 (LWP 17918)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 140 (Thread 0x7f684b1ab700 (LWP 17919)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 139 (Thread 0x7f684b12a700 (LWP 17920)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 138 (Thread 0x7f684a8a7700 (LWP 17921)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 137 (Thread 0x7f684a425700 (LWP 17922)):
#0  0x00007f68e617351d in nanosleep () from /lib64/libc.so.6
#1  0x00007f68e617333c in sleep () from /lib64/libc.so.6
#2  0x000000000043ca60 in __spoolerMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 136 (Thread 0x7f684a3a4700 (LWP 17923)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 135 (Thread 0x7f6849f22700 (LWP 17924)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 134 (Thread 0x7f6849aa0700 (LWP 17925)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x0000000000443b95 in __storageclassMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 133 (Thread 0x7f6848e1c700 (LWP 17926)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 132 (Thread 0x7f6848d99700 (LWP 17927)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 131 (Thread 0x7f6848d18700 (LWP 17928)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 130 (Thread 0x7f6848c97700 (LWP 17929)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 129 (Thread 0x7f6848c16700 (LWP 17930)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 128 (Thread 0x7f6848b95700 (LWP 17931)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 127 (Thread 0x7f6848b14700 (LWP 17932)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 126 (Thread 0x7f6848a93700 (LWP 17933)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 125 (Thread 0x7f6848a12700 (LWP 17934)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 124 (Thread 0x7f6848991700 (LWP 17935)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 123 (Thread 0x7f6848910700 (LWP 17936)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 122 (Thread 0x7f684888f700 (LWP 17937)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 121 (Thread 0x7f684880e700 (LWP 17938)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 120 (Thread 0x7f684878d700 (LWP 17939)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 119 (Thread 0x7f684870c700 (LWP 17940)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 118 (Thread 0x7f684868b700 (LWP 17941)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 117 (Thread 0x7f684860a700 (LWP 17942)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 116 (Thread 0x7f6848589700 (LWP 17943)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 115 (Thread 0x7f6848508700 (LWP 17944)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 114 (Thread 0x7f6848487700 (LWP 17945)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 113 (Thread 0x7f6848406700 (LWP 17946)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 112 (Thread 0x7f6848385700 (LWP 17947)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 111 (Thread 0x7f6848304700 (LWP 17948)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 110 (Thread 0x7f6848283700 (LWP 17949)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 109 (Thread 0x7f6848202700 (LWP 17950)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 108 (Thread 0x7f6848181700 (LWP 17951)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 107 (Thread 0x7f6848100700 (LWP 17952)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 106 (Thread 0x7f6843fff700 (LWP 17953)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 105 (Thread 0x7f6843f7e700 (LWP 17954)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 104 (Thread 0x7f6843efd700 (LWP 17955)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 103 (Thread 0x7f6843e7c700 (LWP 17956)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 102 (Thread 0x7f6843dfb700 (LWP 17957)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 101 (Thread 0x7f6843d7a700 (LWP 17958)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 100 (Thread 0x7f6843cf9700 (LWP 17959)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 99 (Thread 0x7f6843c78700 (LWP 17960)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 98 (Thread 0x7f6843bf7700 (LWP 17961)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 97 (Thread 0x7f6843b76700 (LWP 17962)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 96 (Thread 0x7f6843af5700 (LWP 17963)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 95 (Thread 0x7f6843a74700 (LWP 17964)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 94 (Thread 0x7f68439f3700 (LWP 17965)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 93 (Thread 0x7f6843972700 (LWP 17966)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 92 (Thread 0x7f68438f1700 (LWP 17967)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 91 (Thread 0x7f6843870700 (LWP 17968)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 90 (Thread 0x7f68437ef700 (LWP 17969)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 89 (Thread 0x7f684376e700 (LWP 17970)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 88 (Thread 0x7f68436ed700 (LWP 17971)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 87 (Thread 0x7f684366c700 (LWP 17972)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 86 (Thread 0x7f68435eb700 (LWP 17973)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 85 (Thread 0x7f684356a700 (LWP 17974)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 84 (Thread 0x7f68434e9700 (LWP 17975)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 83 (Thread 0x7f6843468700 (LWP 17976)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 82 (Thread 0x7f68433e7700 (LWP 17977)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 81 (Thread 0x7f6843366700 (LWP 17978)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 80 (Thread 0x7f68432e5700 (LWP 17979)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 79 (Thread 0x7f6843264700 (LWP 17980)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 78 (Thread 0x7f68431e3700 (LWP 17981)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 77 (Thread 0x7f6843162700 (LWP 17982)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 76 (Thread 0x7f68430e1700 (LWP 17983)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 75 (Thread 0x7f6843060700 (LWP 17984)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 74 (Thread 0x7f6842fdf700 (LWP 17985)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 73 (Thread 0x7f6842f5e700 (LWP 17986)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 72 (Thread 0x7f6842edd700 (LWP 17987)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 71 (Thread 0x7f6842e5c700 (LWP 17988)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 70 (Thread 0x7f6842ddb700 (LWP 17989)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 69 (Thread 0x7f6842d5a700 (LWP 17990)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 68 (Thread 0x7f6842cd9700 (LWP 17991)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 67 (Thread 0x7f6842c58700 (LWP 17992)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 66 (Thread 0x7f6842bd7700 (LWP 17993)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 65 (Thread 0x7f6842b56700 (LWP 17994)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 64 (Thread 0x7f6842ad5700 (LWP 17995)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 63 (Thread 0x7f6842a54700 (LWP 17996)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 62 (Thread 0x7f68429d3700 (LWP 17997)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 61 (Thread 0x7f6842952700 (LWP 17998)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 60 (Thread 0x7f68428d1700 (LWP 17999)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 59 (Thread 0x7f6842850700 (LWP 18000)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 58 (Thread 0x7f68427cf700 (LWP 18001)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 57 (Thread 0x7f684274e700 (LWP 18002)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 56 (Thread 0x7f68426cd700 (LWP 18003)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 55 (Thread 0x7f684264c700 (LWP 18004)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 54 (Thread 0x7f68425cb700 (LWP 18005)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 53 (Thread 0x7f684254a700 (LWP 18006)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 52 (Thread 0x7f68424c9700 (LWP 18007)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 51 (Thread 0x7f6842448700 (LWP 18008)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 50 (Thread 0x7f68423c7700 (LWP 18009)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 49 (Thread 0x7f6842346700 (LWP 18010)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 48 (Thread 0x7f68422c5700 (LWP 18011)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 47 (Thread 0x7f6842244700 (LWP 18012)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 46 (Thread 0x7f68421c3700 (LWP 18013)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 45 (Thread 0x7f6842142700 (LWP 18014)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 44 (Thread 0x7f68420c1700 (LWP 18015)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 43 (Thread 0x7f6842040700 (LWP 18016)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 42 (Thread 0x7f6841fbf700 (LWP 18017)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 41 (Thread 0x7f6841f3e700 (LWP 18018)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 40 (Thread 0x7f6841ebd700 (LWP 18019)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 39 (Thread 0x7f6841e3c700 (LWP 18020)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 38 (Thread 0x7f6841dbb700 (LWP 18021)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 37 (Thread 0x7f6841d3a700 (LWP 18022)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 36 (Thread 0x7f6841cb9700 (LWP 18023)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 35 (Thread 0x7f6841c38700 (LWP 18024)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 34 (Thread 0x7f6841bb7700 (LWP 18025)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 33 (Thread 0x7f6841b36700 (LWP 18026)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 32 (Thread 0x7f6841ab5700 (LWP 18027)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 31 (Thread 0x7f6841a34700 (LWP 18028)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 30 (Thread 0x7f68419b3700 (LWP 18029)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 29 (Thread 0x7f6841932700 (LWP 18030)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 28 (Thread 0x7f68418b1700 (LWP 18031)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 27 (Thread 0x7f6841830700 (LWP 18032)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 26 (Thread 0x7f68417af700 (LWP 18033)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 25 (Thread 0x7f684172e700 (LWP 18034)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 24 (Thread 0x7f68416ad700 (LWP 18035)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 23 (Thread 0x7f684162c700 (LWP 18036)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 22 (Thread 0x7f68415ab700 (LWP 18037)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 21 (Thread 0x7f684152a700 (LWP 18038)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 20 (Thread 0x7f68414a9700 (LWP 18039)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 19 (Thread 0x7f6841428700 (LWP 18040)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 18 (Thread 0x7f68413a7700 (LWP 18041)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 17 (Thread 0x7f6841326700 (LWP 18042)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 16 (Thread 0x7f68412a5700 (LWP 18043)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 15 (Thread 0x7f6841224700 (LWP 18044)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 14 (Thread 0x7f68411a3700 (LWP 18045)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 13 (Thread 0x7f6841122700 (LWP 18046)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 12 (Thread 0x7f68410a1700 (LWP 18047)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 11 (Thread 0x7f6841020700 (LWP 18048)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 10 (Thread 0x7f6840f9f700 (LWP 18049)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 9 (Thread 0x7f6840f1e700 (LWP 18050)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 8 (Thread 0x7f6840e9d700 (LWP 18051)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 7 (Thread 0x7f6840e1c700 (LWP 18052)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 6 (Thread 0x7f6840d9b700 (LWP 18053)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 5 (Thread 0x7f6840d1a700 (LWP 18054)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e6df0c8a in Pd_Reactor::ListenerThread(Pd_Thread<Pd_Reactor>*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e6df2674 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 4 (Thread 0x7f6840c99700 (LWP 18055)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000042ee58 in __taskMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 3 (Thread 0x7f6840c18700 (LWP 18056)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c192d in _crConfigClass::SDSleep(int) ()
#3  0x0000000000437d3f in __monitorMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 2 (Thread 0x7f6840b97700 (LWP 18057)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c19da in _crConfigClass::SDSleep(int) ()
#3  0x00000000004713b6 in __syncMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 1 (Thread 0x7f68e834b700 (LWP 17906)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e7363414 in NetWaitForRemote () from /usr/openv/pdde/pdcr/../pdshared/lib/libdct.so
#2  0x00000000004290f3 in __ConnRun(_crConnectionClass*) ()
#3  0x0000000000412ac5 in __sdRun() ()
#4  0x000000000041399c in SDMain ()
#5  0x00007f68e60ecbe6 in __libc_start_main () from /lib64/libc.so.6

Thread 151 (Thread 0x7f68e830a700 (LWP 17907)):
#0  0x00007f68e7870387 in do_sigwait () from /lib64/libpthread.so.0
#1  0x00007f68e787042d in sigwait () from /lib64/libpthread.so.0
#2  0x00000000004348a9 in __signalMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 150 (Thread 0x7f6865ae4700 (LWP 17908)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004b1188 in History::historyMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 149 (Thread 0x7f684ba35700 (LWP 17909)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000047aba4 in Cr_MemoryManager::Main(Pd_Thread<Cr_MemoryManager>*) ()
#3  0x000000000047ae00 in Pd_Thread<Cr_MemoryManager>::Run(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 148 (Thread 0x7f684b9b4700 (LWP 17911)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c19da in _crConfigClass::SDSleep(int) ()
#3  0x0000000000426d37 in Cr_IndexManager::ThreadMain() ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 147 (Thread 0x7f684b933700 (LWP 17912)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044e98f in _storeClassWriteMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 146 (Thread 0x7f684b8b2700 (LWP 17913)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x0000000000449ce3 in _storeClassPrefetchMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 145 (Thread 0x7f684b831700 (LWP 17914)):
#0  0x00007f68e619838d in read () from /lib64/libc.so.6
#1  0x00007f68e6140721 in _IO_new_file_seekoff () from /lib64/libc.so.6
#2  0x00007f68e613cec6 in fseek () from /lib64/libc.so.6
#3  0x000000000044cffb in _dcReadIndexFileRecords2(unsigned int, _IO_FILE*, bool) ()
#4  0x0000000000463ee6 in dcDelSpaceUpdate(_crDataStoreClass*, boost::intrusive_ptr<CRDigestMap>, _dc_rec**) ()
#5  0x00000000004648cc in dcCompactContainer(_crDataStoreClass*, boost::intrusive_ptr<CRDigestMap>, unsigned int, unsigned long*) ()
#6  0x0000000000467b87 in _storeCompactContainers(_crDataStoreClass*, std::map<unsigned long, boost::intrusive_ptr<CRDigestMap>, std::less<unsigned long>, std::allocator<std::pair<unsigned long const, boost::intrusive_ptr<CRDigestMap> > > >&) ()
#7  0x00000000004682e2 in _storeCompactContainers(_crDataStoreClass*, std::set<unsigned long, std::less<unsigned long>, std::allocator<unsigned long> >&) ()
#8  0x0000000000468f66 in _storeClassCompactMain(void*) ()
#9  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#10 0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#11 0x0000000000000000 in ?? ()
Thread 144 (Thread 0x7f684b7b0700 (LWP 17915)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044ed48 in WriteThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 143 (Thread 0x7f684b72f700 (LWP 17916)):
#0  0x00007f68e786c879 in pthread_cond_timedwait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00000000004832b7 in _storeClassCheckCRCMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 142 (Thread 0x7f684b6ae700 (LWP 17917)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 141 (Thread 0x7f684b22c700 (LWP 17918)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 140 (Thread 0x7f684b1ab700 (LWP 17919)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 139 (Thread 0x7f684b12a700 (LWP 17920)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 138 (Thread 0x7f684a8a7700 (LWP 17921)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 137 (Thread 0x7f684a425700 (LWP 17922)):
#0  0x00007f68e617351d in nanosleep () from /lib64/libc.so.6
#1  0x00007f68e617333c in sleep () from /lib64/libc.so.6
#2  0x000000000043ca60 in __spoolerMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 136 (Thread 0x7f684a3a4700 (LWP 17923)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 135 (Thread 0x7f6849f22700 (LWP 17924)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x000000000044952a in PrefetchThreadMain(void*) ()
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 134 (Thread 0x7f6849aa0700 (LWP 17925)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x0000000000443b95 in __storageclassMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 133 (Thread 0x7f6848e1c700 (LWP 17926)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 132 (Thread 0x7f6848d99700 (LWP 17927)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 131 (Thread 0x7f6848d18700 (LWP 17928)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 130 (Thread 0x7f6848c97700 (LWP 17929)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 129 (Thread 0x7f6848c16700 (LWP 17930)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 128 (Thread 0x7f6848b95700 (LWP 17931)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 127 (Thread 0x7f6848b14700 (LWP 17932)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 126 (Thread 0x7f6848a93700 (LWP 17933)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 125 (Thread 0x7f6848a12700 (LWP 17934)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 124 (Thread 0x7f6848991700 (LWP 17935)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 123 (Thread 0x7f6848910700 (LWP 17936)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 122 (Thread 0x7f684888f700 (LWP 17937)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 121 (Thread 0x7f684880e700 (LWP 17938)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 120 (Thread 0x7f684878d700 (LWP 17939)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 119 (Thread 0x7f684870c700 (LWP 17940)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 118 (Thread 0x7f684868b700 (LWP 17941)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 117 (Thread 0x7f684860a700 (LWP 17942)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 116 (Thread 0x7f6848589700 (LWP 17943)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 115 (Thread 0x7f6848508700 (LWP 17944)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 114 (Thread 0x7f6848487700 (LWP 17945)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 113 (Thread 0x7f6848406700 (LWP 17946)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 112 (Thread 0x7f6848385700 (LWP 17947)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 111 (Thread 0x7f6848304700 (LWP 17948)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 110 (Thread 0x7f6848283700 (LWP 17949)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 109 (Thread 0x7f6848202700 (LWP 17950)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 108 (Thread 0x7f6848181700 (LWP 17951)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 107 (Thread 0x7f6848100700 (LWP 17952)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 106 (Thread 0x7f6843fff700 (LWP 17953)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 105 (Thread 0x7f6843f7e700 (LWP 17954)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 104 (Thread 0x7f6843efd700 (LWP 17955)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 103 (Thread 0x7f6843e7c700 (LWP 17956)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 102 (Thread 0x7f6843dfb700 (LWP 17957)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 101 (Thread 0x7f6843d7a700 (LWP 17958)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 100 (Thread 0x7f6843cf9700 (LWP 17959)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 99 (Thread 0x7f6843c78700 (LWP 17960)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 98 (Thread 0x7f6843bf7700 (LWP 17961)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 97 (Thread 0x7f6843b76700 (LWP 17962)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 96 (Thread 0x7f6843af5700 (LWP 17963)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 95 (Thread 0x7f6843a74700 (LWP 17964)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 94 (Thread 0x7f68439f3700 (LWP 17965)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 93 (Thread 0x7f6843972700 (LWP 17966)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 92 (Thread 0x7f68438f1700 (LWP 17967)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 91 (Thread 0x7f6843870700 (LWP 17968)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 90 (Thread 0x7f68437ef700 (LWP 17969)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 89 (Thread 0x7f684376e700 (LWP 17970)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 88 (Thread 0x7f68436ed700 (LWP 17971)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 87 (Thread 0x7f684366c700 (LWP 17972)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 86 (Thread 0x7f68435eb700 (LWP 17973)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 85 (Thread 0x7f684356a700 (LWP 17974)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 84 (Thread 0x7f68434e9700 (LWP 17975)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 83 (Thread 0x7f6843468700 (LWP 17976)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 82 (Thread 0x7f68433e7700 (LWP 17977)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 81 (Thread 0x7f6843366700 (LWP 17978)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 80 (Thread 0x7f68432e5700 (LWP 17979)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 79 (Thread 0x7f6843264700 (LWP 17980)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 78 (Thread 0x7f68431e3700 (LWP 17981)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 77 (Thread 0x7f6843162700 (LWP 17982)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 76 (Thread 0x7f68430e1700 (LWP 17983)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 75 (Thread 0x7f6843060700 (LWP 17984)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 74 (Thread 0x7f6842fdf700 (LWP 17985)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 73 (Thread 0x7f6842f5e700 (LWP 17986)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 72 (Thread 0x7f6842edd700 (LWP 17987)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 71 (Thread 0x7f6842e5c700 (LWP 17988)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 70 (Thread 0x7f6842ddb700 (LWP 17989)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 69 (Thread 0x7f6842d5a700 (LWP 17990)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 68 (Thread 0x7f6842cd9700 (LWP 17991)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 67 (Thread 0x7f6842c58700 (LWP 17992)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 66 (Thread 0x7f6842bd7700 (LWP 17993)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 65 (Thread 0x7f6842b56700 (LWP 17994)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 64 (Thread 0x7f6842ad5700 (LWP 17995)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 63 (Thread 0x7f6842a54700 (LWP 17996)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 62 (Thread 0x7f68429d3700 (LWP 17997)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 61 (Thread 0x7f6842952700 (LWP 17998)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 60 (Thread 0x7f68428d1700 (LWP 17999)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 59 (Thread 0x7f6842850700 (LWP 18000)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 58 (Thread 0x7f68427cf700 (LWP 18001)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 57 (Thread 0x7f684274e700 (LWP 18002)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 56 (Thread 0x7f68426cd700 (LWP 18003)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 55 (Thread 0x7f684264c700 (LWP 18004)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 54 (Thread 0x7f68425cb700 (LWP 18005)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 53 (Thread 0x7f684254a700 (LWP 18006)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 52 (Thread 0x7f68424c9700 (LWP 18007)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 51 (Thread 0x7f6842448700 (LWP 18008)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 50 (Thread 0x7f68423c7700 (LWP 18009)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 49 (Thread 0x7f6842346700 (LWP 18010)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 48 (Thread 0x7f68422c5700 (LWP 18011)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 47 (Thread 0x7f6842244700 (LWP 18012)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 46 (Thread 0x7f68421c3700 (LWP 18013)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 45 (Thread 0x7f6842142700 (LWP 18014)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 44 (Thread 0x7f68420c1700 (LWP 18015)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 43 (Thread 0x7f6842040700 (LWP 18016)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 42 (Thread 0x7f6841fbf700 (LWP 18017)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 41 (Thread 0x7f6841f3e700 (LWP 18018)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 40 (Thread 0x7f6841ebd700 (LWP 18019)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 39 (Thread 0x7f6841e3c700 (LWP 18020)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 38 (Thread 0x7f6841dbb700 (LWP 18021)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 37 (Thread 0x7f6841d3a700 (LWP 18022)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 36 (Thread 0x7f6841cb9700 (LWP 18023)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 35 (Thread 0x7f6841c38700 (LWP 18024)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 34 (Thread 0x7f6841bb7700 (LWP 18025)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 33 (Thread 0x7f6841b36700 (LWP 18026)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 32 (Thread 0x7f6841ab5700 (LWP 18027)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 31 (Thread 0x7f6841a34700 (LWP 18028)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 30 (Thread 0x7f68419b3700 (LWP 18029)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 29 (Thread 0x7f6841932700 (LWP 18030)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 28 (Thread 0x7f68418b1700 (LWP 18031)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 27 (Thread 0x7f6841830700 (LWP 18032)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 26 (Thread 0x7f68417af700 (LWP 18033)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 25 (Thread 0x7f684172e700 (LWP 18034)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 24 (Thread 0x7f68416ad700 (LWP 18035)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 23 (Thread 0x7f684162c700 (LWP 18036)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 22 (Thread 0x7f68415ab700 (LWP 18037)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 21 (Thread 0x7f684152a700 (LWP 18038)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 20 (Thread 0x7f68414a9700 (LWP 18039)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 19 (Thread 0x7f6841428700 (LWP 18040)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 18 (Thread 0x7f68413a7700 (LWP 18041)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 17 (Thread 0x7f6841326700 (LWP 18042)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 16 (Thread 0x7f68412a5700 (LWP 18043)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 15 (Thread 0x7f6841224700 (LWP 18044)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 14 (Thread 0x7f68411a3700 (LWP 18045)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 13 (Thread 0x7f6841122700 (LWP 18046)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 12 (Thread 0x7f68410a1700 (LWP 18047)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 11 (Thread 0x7f6841020700 (LWP 18048)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 10 (Thread 0x7f6840f9f700 (LWP 18049)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 9 (Thread 0x7f6840f1e700 (LWP 18050)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 8 (Thread 0x7f6840e9d700 (LWP 18051)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 7 (Thread 0x7f6840e1c700 (LWP 18052)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 6 (Thread 0x7f6840d9b700 (LWP 18053)):
#0  0x00007f68e786c50c in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f68e6df2636 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#4  0x0000000000000000 in ?? ()
Thread 5 (Thread 0x7f6840d1a700 (LWP 18054)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e6df0c8a in Pd_Reactor::ListenerThread(Pd_Thread<Pd_Reactor>*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#2  0x00007f68e6df2674 in Pd_Thread<Pd_Reactor>::Run(void*) () from /usr/openv/pdde/pdcr/../pdshared/lib/libpdshared.so
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 4 (Thread 0x7f6840c99700 (LWP 18055)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x000000000042ee58 in __taskMain(void*) ()
#3  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#4  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#5  0x0000000000000000 in ?? ()
Thread 3 (Thread 0x7f6840c18700 (LWP 18056)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c19da in _crConfigClass::SDSleep(int) ()
#3  0x0000000000437d3f in __monitorMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 2 (Thread 0x7f6840b97700 (LWP 18057)):
#0  0x00007f68e619efd3 in select () from /lib64/libc.so.6
#1  0x00000000004b1daa in SDSleep ()
#2  0x00000000004c1a70 in _crConfigClass::SDSleep(int) ()
#3  0x00000000004713b6 in __syncMain(void*) ()
#4  0x00007f68e78686a6 in start_thread () from /lib64/libpthread.so.0
#5  0x00007f68e61a5ccd in clone () from /lib64/libc.so.6
#6  0x0000000000000000 in ?? ()
Thread 1 (Thread 0x7f68e834b700 (LWP 17906)):
#0  0x00007f68e619c806 in poll () from /lib64/libc.so.6
#1  0x00007f68e7363414 in NetWaitForRemote () from /usr/openv/pdde/pdcr/../pdshared/lib/libdct.so
#2  0x00000000004290f3 in __ConnRun(_crConnectionClass*) ()
#3  0x0000000000412ac5 in __sdRun() ()
#4  0x000000000041399c in SDMain ()
#5  0x00007f68e60ecbe6 in __libc_start_main () from /lib64/libc.so.6
