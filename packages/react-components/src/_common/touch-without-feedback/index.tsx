import React, { useCallback, ReactElement } from 'react';
import { TouchWithoutFeedbackProps } from './types';

export const TouchWithoutFeedback: React.FC<TouchWithoutFeedbackProps> = props => {
    const { disabled = false, onClick, children } = props;

    const child = React.Children.only(children) as ReactElement;
    const { onClick: _onClick } = child.props;

    const onPress = useCallback(
        (e: React.MouseEvent) => {
            if (disabled) return;

            _onClick?.(e);
            onClick?.(e);
        },
        [disabled, _onClick, onClick],
    );

    return React.cloneElement(child, {
        onClick: onPress,
    });
};

export * from './types';
