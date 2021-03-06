import React, { useState } from 'react';
import { Drawer } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Drawer</Button>
            <Drawer visible={visible} onVisibleChange={setVisible} placement='top' offset={44}>
                <div className='my-demo-drawer__box is-vertical' />
            </Drawer>
        </div>
    );
};
