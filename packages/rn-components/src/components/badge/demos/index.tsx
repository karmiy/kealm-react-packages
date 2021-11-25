import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoDot from './demo-dot';
import DemoOffset from './demo-offset';
import DemoColor from './demo-color';
import DemoIndependent from './demo-independent';

export default () => {
    return (
        <Webview title='Badge'>
            <DemoBlock title='基本用法'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='小红点'>
                <DemoDot />
            </DemoBlock>
            <DemoBlock title='自定义偏移量'>
                <DemoOffset />
            </DemoBlock>
            <DemoBlock title='徽标色'>
                <DemoColor />
            </DemoBlock>
            <DemoBlock title='独立使用'>
                <DemoIndependent />
            </DemoBlock>
        </Webview>
    );
};
