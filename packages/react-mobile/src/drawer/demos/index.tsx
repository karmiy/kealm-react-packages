import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoPlacement from './demo-placement';
import DemoOffset from './demo-offset';
import DemoPop from './demo-pop';
import './style.scss';

export default () => {
    return (
        <Webview title='Drawer'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='弹出方向'>
                <DemoPlacement />
            </DemoBlock>
            <DemoBlock title='弹出位置偏移'>
                <DemoOffset />
            </DemoBlock>
            <DemoBlock title='支持 Pop 组件配置'>
                <DemoPop />
            </DemoBlock>
        </Webview>
    );
};
