const cp = require('child_process');
const { promisify } = require('util');

const exec = promisify(cp.exec);

/* 执行命令 */
const call = cmd => {
    console.log(`exec: ${cmd}`);
    return exec(cmd);
};

/* 上传资源 */
async function uploadAssets() {
    await call(`ossutil cp -r ./docs-dist oss://front-static/kealm-react-packages --update`);
}

/* 构建 */
async function release() {
    // await uploadAssets();
}

release().catch(err => {
    console.log('err');
    console.log(err);
});
