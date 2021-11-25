import React from 'react';
import { DemoBlockProps } from './types';
import './style.scss';

export const DemoBlock: React.FC<DemoBlockProps> = ({ title, children }) => {
    return (
        <div className='my-demo-block'>
            <div className='my-demo-block__title'>{title}</div>
            <div className='my-demo-block__body'>{children}</div>
        </div>
    );
};

export * from './types';
