const chalk = require('chalk');

const { log } = console;

const logInfo = (msg) => log(chalk.whiteBright(msg));
const logSuccess = (msg) => log(chalk.greenBright(msg));
const logHint = (msg) => log(chalk.blueBright(msg));
const logWarn = (msg) => log(chalk.rgb(230, 162, 60)(msg));
const logError = (msg) => log(chalk.redBright(msg));

module.exports = {
    logInfo,
    logWarn,
    logHint,
    logSuccess,
    logError,
};
