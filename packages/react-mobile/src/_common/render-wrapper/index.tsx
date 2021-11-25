import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { RenderWrapperProps } from './types';
/**
 * @description 是否 DOM 节点
 * @param node
 */
function isHTMLElement(node: any): node is HTMLElement {
    return node instanceof HTMLElement;
}

export class RenderWrapper extends Component<RenderWrapperProps> {
    private display = '';

    public componentDidMount() {
        this.nodeControl(true);
    }

    public componentDidUpdate() {
        this.nodeControl();
    }

    /**
     * @param mount 是否是初始化挂载元素
     */
    public nodeControl(mount = false) {
        const { visible, unmountOnExit = false } = this.props;
        if (unmountOnExit) return;

        const node = ReactDOM.findDOMNode(this as any);
        // 保存原 display 样式
        if (mount && isHTMLElement(node)) this.display = node.style.display || '';

        isHTMLElement(node) && (node.style.display = visible ? this.display || '' : 'none');
    }

    public render() {
        const { visible, unmountOnExit = false, children } = this.props;

        if (!visible && unmountOnExit) return null;

        if (!unmountOnExit && React.Children.count(children) !== 1) {
            throw new Error('There can only be one child when unmountOnExit is false');
        }

        return children;
    }
}

export * from './types';
