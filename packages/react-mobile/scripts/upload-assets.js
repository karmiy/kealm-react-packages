const cp = require('child_process');
const { promisify } = require('util'); // 转 promise

const exec = promisify(cp.exec);

/* 执行命令 */
const call = cmd => {
    console.log(`exec: ${cmd}`);
    return exec(cmd);
};

/* 上传图片资源 */
async function uploadImages() {
    await call(`ossutil cp -r ./src/_images oss://front-static/kealm-react-mobile --update`);
}

(async () => {
    await uploadImages();
})()
    .catch(ex => console.error(ex))
    .then(() => console.log('upload success!'));
