import React, { ReactElement } from 'react';
import { classnames } from '../../_utils/base';
import { CssWrapperProps } from './types';

export const CssWrapper: React.FC<CssWrapperProps> = props => {
    const { className, style, children } = props;

    const child = React.Children.only(children) as ReactElement;
    const { className: _className, style: _style } = child.props;

    return React.cloneElement(child, {
        className: classnames(_className, className),
        style: {
            ..._style,
            ...style,
        },
    });
};

export * from './types';
