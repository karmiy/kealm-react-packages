import React, { useMemo } from 'react';
import { classnames } from '../../utils/base';
import { BlockquoteProps } from './types';
import './style.scss';

export const Blockquote: React.FC<BlockquoteProps> = props => {
    const { type = 'tip', title, children } = props;

    const wrapperClassName = useMemo(
        () => classnames('my-blockquote', `my-blockquote--${type}`),
        [type],
    );

    return (
        <div className={wrapperClassName}>
            {title ? <div className='my-blockquote__title'>{title}</div> : null}
            <div className='my-blockquote__content'>{children}</div>
        </div>
    );
};

export * from './types';
