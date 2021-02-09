const date = require('date-and-time');
const logger = require('./logger')
const schedule = require('node-schedule');
const fs = require('fs-extra')
const config = require('../../ressource/config/config.json')
const now = new Date();
const { exec, cd } = require('shelljs');

class Backup {

    createSave = async (directoryToBackup, directoryOfBackup, nameOfBackup) => {
        logger.log("beginnings of a backup", 'warn')
        fs.copy(directoryToBackup, config.directoryOfBackup + "/" + config.nameOfBackup + "-" + date.format(now, 'YYYY-MM-DD_HH:mm'), err => {
            if (err) {
                logger.log("An error occurred when creating the backup", 'error')
            }else {
                logger.log("the backup was performed successfully", 'warn')
                cd('/home/pi')
                console.log(`zip -r ${nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}.zip ${directoryToBackup}${nameOfBackup}${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
                exec(`zip -r ${nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}.zip ${directoryToBackup}${nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
                exec(`rm -fr ${directoryToBackup}${nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
            }
        })
    };

    scheduleSave = async () => {
        schedule.scheduleJob('0 8 * * *', function() {
            logger.log("beginnings of a backup", 'warn')
            fs.copy(config.directoryToBackup, config.directoryOfBackup + "/" + config.nameOfBackup + "-" + date.format(now, 'YYYY-MM-DD_HH:mm'), err => {
                if (err) {
                    logger.log("An error occurred when creating the backup", 'error')
                }else {
                    logger.log("the backup was performed successfully", 'warn')
                    cd('/home/pi')
                    console.log(`zip -r ${config.nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}.zip ${config.directoryOfBackup}${config.nameOfBackup}${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
                    exec(`zip -r ${config.nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}.zip ${config.directoryOfBackup}${config.nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
                    exec(`rm -fr ${config.directoryOfBackup}${config.nameOfBackup}-${date.format(now, 'YYYY-MM-DD_HH:mm')}`)
                }
            })
        });
    };

}
module.exports = Backup;