import React, { useState } from 'react';
import { Drawer } from '@kealm/react-mobile';
import { Button, message } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Drawer</Button>
            <Drawer
                visible={visible}
                onVisibleChange={setVisible}
                onOpen={() => message.success('onOpen')}
                afterOpen={() => message.success('afterOpen')}
                onClose={() => message.success('onClose')}
                afterClose={() => message.success('afterClose')}
            >
                <div className='my-demo-drawer__box is-vertical' />
            </Drawer>
        </div>
    );
};
