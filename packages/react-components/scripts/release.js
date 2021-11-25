const path = require('path');
const fsExtra = require('fs-extra');

const copyImages = () => {
    const filePath = path.join(__dirname, '../src/_images');
    const targetPath = path.join(__dirname, '../lib/_images');
    fsExtra.copy(filePath, targetPath);
};

copyImages();
