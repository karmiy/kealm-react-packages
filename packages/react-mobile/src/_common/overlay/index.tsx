import React from 'react';
import { classnames } from '../../_utils/base';
import { AnimatedVisible } from '../animated-visible';
import { OverlayProps } from './types';

export const Overlay: React.FC<OverlayProps> = props => {
    const {
        className,
        visible = false,
        onOpen,
        onClose,
        afterOpen,
        afterClose,
        appear = true,
        unmountOnExit = false,
        transitionName = 'my-overlay-fade',
        duration = 150,
        ...restProps
    } = props;

    return (
        <AnimatedVisible
            visible={visible}
            onOpen={onOpen}
            onClose={onClose}
            afterOpen={afterOpen}
            afterClose={afterClose}
            appear={appear}
            unmountOnExit={unmountOnExit}
            transitionName={transitionName}
            duration={duration}
        >
            <div className={classnames('my-overlay', className)} {...restProps} />
        </AnimatedVisible>
    );
};

export * from './types';
