import React from 'react';
import { Textarea } from '@kealm/react-components';
import { message } from 'antd';

export default () => {
    return (
        <div className='my-demo-textarea__white-box'>
            <Textarea
                textareaHeight={100}
                placeholder='最多 40 字'
                maxCount={40}
                countShowThreshold={9}
                onOverage={() => message.warning('最多输入 40 字')}
            />
        </div>
    );
};
