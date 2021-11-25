const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

const PACKAGE_PREFIX = '@kealm';
// const BASE_PACKAGES = ['react-hooks', 'rn-components'].map(item => `${PACKAGE_PREFIX}/${item}`);
const DEPS = ['dependencies', 'devDependencies'];

const createNextVersionOptions = version => {
    const bars = version.split('.');

    return [...Array(3).keys()].reverse().map(index => {
        return bars
            .map((bar, _index) => {
                if (_index < index) return +bar;
                if (_index === index) return +bar + 1;
                if (_index > index) return 0;
            })
            .join('.');
    });
};

const updateNextVersion = (package, updatedPackage, nextVersion) => {
    const packageJsonPath = path.join(__dirname, `../packages/${package}/package.json`);
    const packageJsonConfig = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    const hasMatched = DEPS.some(dep => {
        if (!packageJsonConfig?.[dep]?.[`${PACKAGE_PREFIX}/${updatedPackage}`]) return false;

        packageJsonConfig[dep][`${PACKAGE_PREFIX}/${updatedPackage}`] = nextVersion;
        return true;
    });
    hasMatched && fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonConfig, null, 4));
};

(async () => {
    try {
        const packages = await readdir(path.resolve(__dirname, '../packages'));
        const { updatedPackage } = await inquirer.prompt([
            {
                type: 'list',
                message: 'Please select a package:',
                name: 'updatedPackage',
                default: packages[0],
                prefix: '----------',
                // suffix: '----------',
                choices: packages,
                // filter: v => v.split('/')[1],
            },
        ]);

        const packageJsonPath = path.join(__dirname, `../packages/${updatedPackage}/package.json`);
        const packageJsonConfig = JSON.parse(fs.readFileSync(packageJsonPath).toString());
        const { version } = packageJsonConfig;
        // console.warn(version, createNextVersionOptions(version));
        const nextVersionOptions = createNextVersionOptions(version);

        const { nextVersion: _nextVersion } = await inquirer.prompt([
            {
                type: 'list',
                message: `Please select a version to upgrade(current version: ${version}):`,
                name: 'nextVersion',
                default: nextVersionOptions[0],
                prefix: '----------',
                choices: [...nextVersionOptions, 'custom'],
            },
        ]);

        let nextVersion = _nextVersion;
        if (_nextVersion === 'custom') {
            // 请输入版本号
            const { customVersion } = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Please enter the version:',
                    name: 'customVersion',
                    prefix: '----------',
                },
            ]);
            nextVersion = customVersion;
        }

        // 更新该 package version
        packageJsonConfig.version = nextVersion;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonConfig, null, 4));

        // 更新其他引用该 package 的 dep
        for (const package of packages) {
            updateNextVersion(package, updatedPackage, nextVersion);
        }
        console.log('upgrade success!');
    } catch (ex) {
        console.error(`Failed to upfrade`);
        console.error(ex);
    }
})();
