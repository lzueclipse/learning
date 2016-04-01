san
vxlogcfg -a -p 51216 -o 111 -s DebugLevel=6 -s DiagnosticLevel=6
vxlogcfg -a -p 51216 -o 199 -s DebugLevel=6 -s DiagnosticLevel=6
vxlogcfg -a -p 51216 -o 200 -s DebugLevel=6 -s DiagnosticLevel=6
vxlogcfg -a -p 51216 -o 201 -s DebugLevel=6 -s DiagnosticLevel=6
 
vxlogcfg -l -o default -p NB
vxlogcfg -a -p 51216 -o ALL -s DebugLevel=0 -s DiagnosticLevel=0
vxlogcfg -p NB -o 200 -a -s De

vxlogview -o 111
vxlogview -o 199
vxlogview -o 200
vxlogview -o 201
   
oid:
http://blog.sina.com.cn/s/blog_6965d96d0101se57.html
https://www.veritas.com/support/en_US/article.000020822
    
     
/sys/module/qla2xxx/parameters
./parameters/ql2xextended_error_logging
      
lsattr -El rmt8 | egrep lun_id\|ww_name

lspci -d 1077:2532 -D -m -n
        
nbftconfig -ls -Me nbu -verbose
         
/sys/class/scsi_host/host11/device/fc_host/host11/dev_loss_tmo
/sys/class/fc_host/host11
           
            
             
