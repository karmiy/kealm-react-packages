import React, { useState } from 'react';
import { Textarea } from '@kealm/react-mobile';
import { Space, InputNumber } from 'antd';

export default () => {
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(2);

    return (
        <Space className='my-demo-textarea__full-box' direction='vertical'>
            <InputNumber min={1} value={rows} onChange={setRows} />
            <div className='my-demo-textarea__white-box'>
                <Textarea value={value} onChange={setValue} placeholder='请输入' rows={rows} />
            </div>
        </Space>
    );
};
