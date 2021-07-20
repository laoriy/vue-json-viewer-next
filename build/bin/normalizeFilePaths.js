// Convert Windows backslash paths to slash paths
// https://github.com/sindresorhus/slash#readme
const slash = require('slash');

module.exports = (files) => {
    Object.keys(files).forEach((filePath) => {
        const normalized = slash(filePath);
        if (filePath !== normalized) {
            files[normalized] = files[filePath];
            delete files[filePath];
        }
    });
    return files;
};
