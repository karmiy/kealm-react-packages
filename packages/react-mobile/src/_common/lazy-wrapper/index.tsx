import React from 'react';
import { LazyWrapperProps } from './types';
import { RenderWrapper } from '../render-wrapper';
import { useLazyStatus } from '../../_hooks';

export const LazyWrapper: React.FC<LazyWrapperProps> = props => {
    const { children, visible } = props;

    const isMounted = useLazyStatus(visible);

    return (
        <RenderWrapper visible={visible} unmountOnExit={!isMounted}>
            {children}
        </RenderWrapper>
    );
};

export * from './types';
