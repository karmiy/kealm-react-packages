import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { classnames } from '../../utils/base';
import { WebviewProps } from './types';
import './style.scss';

export const Webview: React.FC<WebviewProps> = ({ grey = true, title, children }) => {
    return (
        <div className={classnames('my-webview', { 'is-grey': grey })}>
            {title && (
                <div className='my-webview__header'>
                    <LeftOutlined className='my-webview__header-arrow' />
                    {title}
                </div>
            )}
            <div className='my-webview__content scroll-hidden'>{children}</div>
        </div>
    );
};

export * from './types';
