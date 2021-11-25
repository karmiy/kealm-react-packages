const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const copyImages = () => {
    const filePath = path.join(__dirname, '../src/images');
    const targetPath = path.join(__dirname, '../lib/images');
    fsExtra.copy(filePath, targetPath);
};

const createPackageJson = () => {
    const filePath = path.join(__dirname, '../package.json');
    const targetPath = path.join(__dirname, '../lib/package.json');

    fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
            console.log('load failed package.json', readErr);
            return;
        }
        const config = JSON.parse(data.toString());
        // 删除scripts
        delete config.scripts;
        // 删除devDependencies
        delete config.devDependencies;
        // 删除 @kealm 包
        delete config.dependencies['@kealm/react-hooks'];
        fs.writeFile(targetPath, JSON.stringify(config, null, 4), writeErr => {
            if (writeErr) {
                console.log('write failed package.json', writeErr);
            }
        });
    });
};

const copyReadme = () => {
    const filePath = path.join(__dirname, '../README.md');
    const targetPath = path.join(__dirname, '../lib/README.md');

    fs.writeFileSync(targetPath, fs.readFileSync(filePath));
};

copyImages();
createPackageJson();
// copyReadme();
