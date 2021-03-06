import React, { useState } from 'react';
import { Textarea } from '@kealm/react-mobile';

export default () => {
    const [value, setValue] = useState('');

    return (
        <div className='my-demo-textarea__white-box'>
            <Textarea value={value} onChange={setValue} placeholder='请输入' autoHeight />
        </div>
    );
};
