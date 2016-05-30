create table EMM_FatClient 
(
FatClientMachineKey  integer                        not null,
MasterServerKey      integer                        not null,
ServiceName          varchar(256)                   not null default '',
Version              varchar(64)                    not null default '',
State                integer                        not null default 0,
SupportDeviceScan    smallint                       not null default 0,
CreatedDateTime      timestamp                      not null ,
LastModifiedDateTime timestamp                      not null ,
constraint PK_EMM_FATCLIENT primary key (FatClientMachineKey)
);

create table EMM_FatInitiatorDevice 
(
FatInitiatorDeviceKey integer                        not null ,
FatClientMachineKey   integer                        not null,
FatTargetDeviceKey    integer                        not null,
State                 integer                        not null default 0,
HBA_Port              integer                        not null,
HBA_PortWWN           varchar(32)                    not null default '',
HBA_Vendor            varchar(64)                    not null default '',
HBA_Model             varchar(64)                    not null default '',
CreatedDateTime       timestamp                      not null  ,
LastModifiedDateTime  timestamp                      not null  ,
constraint PK_EMM_FATINITIATORDEVICE primary key (FatInitiatorDeviceKey),
constraint AK_AK_FATINITIATORDEV_EMM_FATI unique (FatClientMachineKey, FatTargetDeviceKey, HBA_Port)
);

create table EMM_FatPipe 
(
FatPipeKey           integer                        not null ,
FatServerMachineKey  integer                        not null,
PipeId               integer                        not null,
FatTargetDeviceKey   integer                        not null default 0, 
FatInitiatorDeviceKey integer                       not null default 0,
State                integer                        not null default 0,
Direction            integer                        not null default 3,
JobId                varchar(128)                   not null default '',
JobGroupId           varchar(128)                   not null default '',
CreatedDateTime      timestamp                      not null ,
LastModifiedDateTime timestamp                      not null ,
constraint PK_EMM_FATPIPE primary key (FatPipeKey),
constraint AK_AK_FATPIPE_EMM_FATP unique (FatServerMachineKey, PipeId)
);

create table EMM_FatServer 
(
FatServerMachineKey  integer                        not null,
ServiceName          varchar(256)                   not null default '',
Version              varchar(64)                    not null default '',
State                integer                        not null default 0,
PipeLimit            integer                        not null default -1,
RecommendedPipeLimit int                            not null default -1,
MaxPipeLimit         integer                        not null default -1,
MaxLunLimit          integer                        not null default -1,
MaxPortLimit         integer                        not null default -1,
CreatedDateTime      timestamp                      not null ,
LastModifiedDateTime timestamp                      not null ,
constraint PK_EMM_FATSERVER primary key (FatServerMachineKey)
);

create table EMM_FatTargetDevice 
(
FatTargetDeviceKey   integer                        not null,
FatServerMachineKey  integer                        not null,
Inquiry              varchar(320)                   not null,
Lun                  integer                        not null default -1,
State                integer                        not null default 0,
HBA_Port             integer                        not null default 0,
HBA_PortWWN          varchar(32)                    not null default '',
HBA_PortMode         integer                        not null default 2,
HBA_Vendor           varchar(64)                    not null default 'QLogic Corporation',
HBA_Model            varchar(64)                    not null default 'QLA234x',
HBA_Speed            integer                        not null default 0,
CreatedDateTime      timestamp                      not null,
LastModifiedDateTime timestamp                      not null,
constraint PK_EMM_FATTARGETDEVICE primary key (FatTargetDeviceKey),
constraint AK_AK_FATTARGETDEVICE_EMM_FATT unique (FatServerMachineKey, Inquiry)
);

/**********************************************************************************************************************/
alter table EMM_FatInitiatorDevice
add constraint FK_EMM_FATI_R_FATCLIE_EMM_FATC foreign key (FatClientMachineKey)
references EMM_FatClient (FatClientMachineKey)
on update restrict
on delete restrict;

alter table EMM_FatInitiatorDevice
add constraint FK_EMM_FATI_R_FATTARG_EMM_FATT foreign key (FatTargetDeviceKey)
references EMM_FatTargetDevice (FatTargetDeviceKey)
on update restrict
on delete restrict;

alter table EMM_FatPipe
add constraint FK_EMM_FATP_R_FATSERV_EMM_FATS foreign key (FatServerMachineKey)
references EMM_FatServer (FatServerMachineKey)
on update restrict
on delete restrict;

alter table EMM_FatTargetDevice
add constraint FK_EMM_FATT_R_FATSERV_EMM_FATS foreign key (FatServerMachineKey)
references EMM_FatServer (FatServerMachineKey)
on update restrict
on delete restrict;
