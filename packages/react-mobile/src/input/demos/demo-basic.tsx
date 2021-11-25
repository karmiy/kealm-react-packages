import React, { useState } from 'react';
import { Input } from '@kealm/react-mobile';

export default () => {
    const [value, setValue] = useState('');

    return <Input value={value} onChange={setValue} placeholder='请输入' />;
};
