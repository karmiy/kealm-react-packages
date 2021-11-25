import React, { useState } from 'react';
import { Input } from '@kealm/react-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <div className='my-demo-input__white_box'>
            <Input value={value} onChange={setValue} placeholder='请输入' grey />
        </div>
    );
};
