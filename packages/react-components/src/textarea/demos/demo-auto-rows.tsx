import React from 'react';
import { Textarea } from '@kealm/react-components';

export default () => {
    return (
        <div className='my-demo-textarea__white-box'>
            <Textarea placeholder='最大 4 行、最小 2 行' autoHeight={{ maxRows: 4, minRows: 2 }} />
        </div>
    );
};
