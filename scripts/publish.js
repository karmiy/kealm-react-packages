const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { promisify } = require('util');

const exec = promisify(cp.exec);

const call = cmd => {
    console.log(`exec: ${cmd}`);
    return exec(cmd);
};

const readdir = promisify(fs.readdir);
const packagesDir = path.resolve(__dirname, '../packages');
// 其他包需要依赖 react-hooks，需要先执行
const packages = ['react-hooks', 'react-components', 'rn-components', 'rn-sdk'];

(async () => {
    // for (const dir of await readdir(packagesDir)) {
    for (const dir of packages) {
        const pkgDirectory = path.resolve(packagesDir, dir);

        try {
            await call(`cd ${pkgDirectory} && npm run publish`);
        } catch (ex) {
            console.error(`Failed to publish module ${dir}`);
            console.error(ex);
        }
    }
})()
    .then(() => console.error('publish success!'))
    .catch(ex => console.error(ex));
