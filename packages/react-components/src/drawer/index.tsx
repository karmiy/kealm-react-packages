import React from 'react';
import Pop from '../pop';
import { classnames } from '../_utils/base';
import { useTransitionStatus } from '../_hooks';
import { DrawerProps } from './types';

const Drawer: React.FC<DrawerProps> = props => {
    const {
        className,
        style,
        transitionName = 'my-drawer-fade',
        contentClassName,
        maskStyle: _maskStyle,
        placement = 'bottom',
        offset,
        onOpen,
        afterOpen,
        onClose,
        afterClose,
        duration,
        children,
        ...restProps
    } = props;

    const wrapperClassName = classnames(
        'my-drawer',
        {
            [`is-${placement}`]: !!placement,
        },
        className,
    );

    const wrapperStyle = {
        ...style,
        [`${placement}`]: offset,
    };

    const maskStyle = {
        ..._maskStyle,
        [`${placement}`]: offset,
    };

    const {
        transitionEvents: { onEnter, onEntered, onExit, onExited },
        isTransitioning,
    } = useTransitionStatus({
        onEnter: onOpen,
        onEntered: afterOpen,
        onExit: onClose,
        onExited: afterClose,
    });

    const contentStyle = {
        ...(isTransitioning ? { transitionDuration: `${duration}ms` } : {}),
    };

    return (
        <Pop
            className={wrapperClassName}
            transitionName={transitionName}
            style={wrapperStyle}
            maskStyle={maskStyle}
            onOpen={onEnter}
            afterOpen={onEntered}
            onClose={onExit}
            afterClose={onExited}
            duration={duration}
            {...restProps}
        >
            <div className='my-drawer__wrapper'>
                <div
                    className={classnames('my-drawer__content', contentClassName)}
                    style={contentStyle}
                >
                    {children}
                </div>
            </div>
        </Pop>
    );
};

export default Drawer;

export * from './types';
