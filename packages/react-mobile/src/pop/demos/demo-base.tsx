import React, { useState } from 'react';
import { Pop } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Pop</Button>
            <Pop visible={visible} onVisibleChange={setVisible}>
                <div className='my-demo-pop__box' />
            </Pop>
        </div>
    );
};
