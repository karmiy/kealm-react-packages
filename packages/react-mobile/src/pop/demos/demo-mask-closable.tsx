import React, { useState } from 'react';
import { Pop } from '@kealm/react-mobile';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Pop</Button>
            <Pop visible={visible} onVisibleChange={setVisible} isCenter maskClosable={false}>
                <div className='my-demo-pop__box'>
                    <CloseOutlined className='close' onClick={() => setVisible(false)} />
                </div>
            </Pop>
        </div>
    );
};
