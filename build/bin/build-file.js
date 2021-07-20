const path = require('path');
const fs = require('fs-extra');
const readFiles = require('./readFileTree');
const writeFileTree = require('./writeFileTree');

const { logError, logHint, logSuccess } = require('../log');

class Creator {
    constructor(fileDir) {
        this.dir = fileDir;
        this.srcFileMiddlewares = [];
        this.subFileMiddlewares = [];
    }

    async create() {
        const fileDir = path.resolve(__dirname, '../../src');
        const isExist = fs.existsSync(fileDir);

        if (isExist) {
            logHint(`Start writing all files of '${fileDir}', it will take a while.`);

            await this.setFileMiddleware(fileDir);

            // write src fileMiddleware
            for (const file of this.srcFileMiddlewares) {
                // eslint-disable-next-line no-await-in-loop
                await writeFileTree(this.dir, file);
            }

            // write sub fileMiddleware
            for (const file of this.subFileMiddlewares) {
                // eslint-disable-next-line no-await-in-loop
                await writeFileTree(this.dir.replace('src', ''), file);
            }

            logSuccess('\nWrited successfully.');
        } else {
            logError(`The '${fileDir}' folder is not exist, please check it.`);
        }
    }

    async setFileMiddleware(fileDir, addtion = {}) {
        const files = await readFiles(fileDir, addtion);
        Object.keys(files).forEach((filePath) => {
            const isSubFile =
                ['package.json', 'README.md'].includes(filePath) || filePath.indexOf('types/') > -1;

            if (isSubFile) {
                this.subFileMiddlewares.push({ [filePath]: files[filePath] });
            } else {
                this.srcFileMiddlewares.push({ [filePath]: files[filePath] });
            }
        });
    }
}

new Creator(path.resolve(__dirname, '../../dist/src')).create();
