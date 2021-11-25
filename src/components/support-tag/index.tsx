import React from 'react';
import { Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { SupportTagProps } from './types';

const DEFAULT_TAGS = ['React native', 'React'];

export const SupportTag: React.FC<SupportTagProps> = ({ tags = DEFAULT_TAGS }) => {
    return (
        <div className='my-support-tag'>
            {tags.map(tag => (
                <Tag key={tag} icon={<CheckOutlined />} color='gold'>
                    {tag}
                </Tag>
            ))}
        </div>
    );
};

export * from './types';
