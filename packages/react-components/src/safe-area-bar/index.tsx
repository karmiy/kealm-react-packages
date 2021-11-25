import React from 'react';
import { SafeAreaBarProps } from './types';
import { classnames } from '../_utils/base';
import { isFs } from '../_utils/screen';

const SafeAreaBar: React.FC<SafeAreaBarProps> = props => {
    const { className, ...restProps } = props;

    return (
        <div
            className={classnames('my-safe-area-bar', { 'is-fs': isFs }, className)}
            {...restProps}
        />
    );
};

export default SafeAreaBar;
export * from './types';
