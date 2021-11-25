import React, { useState } from 'react';
import { Pop } from '@kealm/react-mobile';
import { Button, message } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Pop</Button>
            <Pop
                visible={visible}
                onVisibleChange={setVisible}
                isCenter
                onOpen={() => message.success('onOpen')}
                afterOpen={() => message.success('afterOpen')}
                onClose={() => message.success('onClose')}
                afterClose={() => message.success('afterClose')}
            >
                <div className='my-demo-pop__box' />
            </Pop>
        </div>
    );
};
