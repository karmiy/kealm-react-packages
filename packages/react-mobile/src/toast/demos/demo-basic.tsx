import React, { useState } from 'react';
import { Toast } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Toast</Button>
            <Toast visible={visible} onVisibleChange={setVisible}>
                保存成功
            </Toast>
        </div>
    );
};
