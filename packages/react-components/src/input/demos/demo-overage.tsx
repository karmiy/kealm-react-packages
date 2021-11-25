import React, { useState } from 'react';
import { Input } from '@kealm/react-components';
import { message } from 'antd';

export default () => {
    const [value, setValue] = useState('');

    return (
        <Input
            value={value}
            onChange={setValue}
            placeholder='最多 10 字'
            maxCount={10}
            onOverage={() => message.warning('最多输入 10 字')}
            specialCharCount
        />
    );
};
