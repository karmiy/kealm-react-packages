import React from 'react';
import ReactDOM from 'react-dom';
import { getTargetElement } from '../../_utils/dom';
import { PortalProps } from './types';

export const Portal: React.FC<PortalProps> = props => {
    const { children, visible = true, getContainer } = props;

    if (!children) return null;

    return visible
        ? ReactDOM.createPortal(children, getTargetElement(getContainer) ?? document.body)
        : null;
};

export * from './types';
