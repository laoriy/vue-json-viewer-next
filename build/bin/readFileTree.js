const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

// glob matching
// https://github.com/sindresorhus/globby#readme
const globby = require('globby');

// detects if a file is binary
// https://github.com/gjtorikian/isBinaryFile#readme
const { isBinaryFileSync } = require('isbinaryfile');
const normalizeFilePaths = require('./normalizeFilePaths');

module.exports = async function readFiles(context, addtion = {}, ejsOption = {}) {
    const filePaths = await globby(['**'], {
        cwd: context,
        onlyFiles: true,
        gitignore: true,
        dot: true,
        ignore: ['**/node_modules/**', '**/.git/**', 'package-lock.json'],
    });
    const res = {};
    for (const filePath of filePaths) {
        const currPath = path.resolve(context, filePath);
        if (isBinaryFileSync(currPath)) {
            // like img files、**.eot file, etc
            res[filePath] = fs.readFileSync(currPath);
        } else {
            const templ = fs.readFileSync(currPath, 'utf-8');
            res[filePath] = ejs.render(templ, { options: addtion }, ejsOption);
        }
    }
    return normalizeFilePaths(res);
};
