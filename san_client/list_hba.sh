for SCSI in `ls -d /sys/class/scsi_host/host*`;
do
    #Qlogic is not the same as Emulex...
    [ -e ${SCSI}/model_name ] && echo -n 'Model Name ' && cat ${SCSI}/model_name;
    [ -e ${SCSI}/fw_version ] && echo -n 'Firmware Version ' && cat ${SCSI}/fw_version;
    [ -e ${SCSI}/driver_version ] && echo -n 'Driver Version ' && cat ${SCSI}/driver_version;
    
    #Emulex is not the same as Qlogic...
    [ -e ${SCSI}/modelname ] && echo -n 'Model Name ' && cat ${SCSI}/modelname;
    [ -e ${SCSI}/fwrev ] && echo -n 'Firmware Version ' && cat ${SCSI}/fwrev;
    [ -e ${SCSI}/lpfc_drvr_version ] && echo -n 'Driver Version ' && cat ${SCSI}/lpfc_drvr_version;
done
