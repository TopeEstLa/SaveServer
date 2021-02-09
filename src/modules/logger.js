const chalk = require("chalk");
const moment = require("moment");

const timestamp = `| ${moment().format("DD-MM-YY | H:m:s")} |`;

module.exports = class Logger {
    static log (content, type = "log") {
        switch (type) {
            case "log":
                return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} | ${content} `);

            case 'warn':
                return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} | ${content} `);

            case 'error':
                return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} | ${content} `);

            case 'debug':
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} | ${content} `);

            case 'mysql':
                return console.log(`${timestamp} ${chalk.redBright("SaveServer-Mysql")} | ${content} `);

            case 'server':
                return console.log(`${timestamp} ${chalk.green("SaveServer")} | ${content} `);

            default: throw new TypeError("Bonsoir, non");
        }
    }
};