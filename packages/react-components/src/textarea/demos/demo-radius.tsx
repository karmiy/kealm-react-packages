import React from 'react';
import { Textarea } from '@kealm/react-components';

export default () => {
    return (
        <div className='my-demo-textarea__white-box my-demo-textarea__scale-box'>
            <Textarea defaultValue='圆角 24' placeholder='请输入' grey radius={24} />
        </div>
    );
};
