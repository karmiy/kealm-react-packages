const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');

// input-clear.png => INPUT_CLEAR_ICON
const renameConstant = file => {
    const fileName = file.split('.')[0];

    return (
        fileName
            .split('-')
            .map(item => item.toUpperCase())
            .join('_') + '_ICON'
    );
};

const dir = path.join(__dirname, '../src/_images');
const files = fs.readdirSync(dir);
const imageMaps = files.reduce((store, file) => {
    if (file === 'base64.ts') return store;

    const buffer = fs.readFileSync(path.join(dir, file));
    const base64 = 'data:image/png;base64,' + Buffer.from(buffer, 'binary').toString('base64');
    store[renameConstant(file)] = base64;

    return store;
}, {});

const fileContent = Object.keys(imageMaps).reduce((str, variant) => {
    return (str += `export const ${variant} = '${imageMaps[variant]}'; \n\n`);
}, '');

prettier.resolveConfig(path.join(__dirname, '../../../.prettierrc.js')).then(options => {
    fs.writeFile(
        path.join(__dirname, '../src/_images/base64.ts'),
        prettier.format(fileContent, { ...options, parser: 'babel' }),
        err => {
            if (err) {
                console.log('write base64.ts error');
            }
        },
    );
});
