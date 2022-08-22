@ECHO OFF
:: This batch file makes a backup of a mongoDB database.

TITLE Database Backup

set CUR_YYYY=%date:~10,4%
set CUR_MM=%date:~4,2%
set CUR_DD=%date:~7,2%

set BackupName=Backup_%CUR_YYYY%%CUR_MM%%CUR_DD%

cd ./Backups

mkdir %BackupName%

mongodump --uri="mongodb://localhost/TwitchChat" -o %BackupName%

pause