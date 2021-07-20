const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeFileTree(dir, files) {
    Object.keys(files).forEach((filePath) => {
        const targetPath = path.join(dir, filePath);
        fs.ensureDirSync(path.dirname(targetPath));
        fs.writeFileSync(targetPath, files[filePath]);
    });
};
