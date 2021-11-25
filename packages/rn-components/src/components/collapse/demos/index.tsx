import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoDuration from './demo-duration';
import DemoCollapsedHeight from './demo-collapsed-height';

export default () => {
    return (
        <Webview title='Collapse'>
            <DemoBlock title='基本用法'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='自定义动画时长'>
                <DemoDuration />
            </DemoBlock>
            <DemoBlock title='指定折叠时的高度'>
                <DemoCollapsedHeight />
            </DemoBlock>
        </Webview>
    );
};
