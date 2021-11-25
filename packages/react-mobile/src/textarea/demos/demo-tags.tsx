import React, { useState } from 'react';
import { Textarea } from '@kealm/react-mobile';
import { Space, Radio } from 'antd';

export default () => {
    const [isTagsOut, setIsTagOunt] = useState(false);

    return (
        <Space className='my-demo-textarea__full-box' direction='vertical'>
            <Radio.Group value={isTagsOut} onChange={e => setIsTagOunt(e.target.value)}>
                <Radio value={false}>标签在内</Radio>
                <Radio value={true}>标签在外</Radio>
            </Radio.Group>
            <div className='my-demo-textarea__white-box my-demo-textarea__scale-box'>
                <Textarea
                    textareaHeight={60}
                    placeholder='请输入'
                    tags={[
                        { key: '症状描述', label: '症状描述' },
                        { key: '持续时间', label: '持续时间' },
                        { key: '检查结果', label: '检查结果' },
                        { key: '用药情况', label: '用药情况' },
                    ]}
                    grey
                    isTagsOut={isTagsOut}
                />
            </div>
        </Space>
    );
};
