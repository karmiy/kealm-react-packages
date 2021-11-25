import React, { useState } from 'react';
import { Dialog } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Dialog</Button>
            <Dialog visible={visible} onVisibleChange={setVisible} title='系统请求使用定位信息权限'>
                为了更好的提供本地天气服务，她她圈和发现内容
            </Dialog>
        </div>
    );
};
