import React, { useState } from 'react';
import { Input } from '@kealm/react-mobile';
import { message } from 'antd';

export default () => {
    const [value, setValue] = useState('');

    return (
        <Input
            value={value}
            onChange={setValue}
            allowClear
            placeholder='请输入'
            onClear={() => message.success('clear')}
        />
    );
};
