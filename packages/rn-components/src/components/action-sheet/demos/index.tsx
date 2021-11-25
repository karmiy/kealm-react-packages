import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoDisabled from './demo-disabled';
import DemoTitle from './demo-title';
import DemoRender from './demo-render';
import DemoDrawer from './demo-drawer';

export default () => {
    return (
        <Webview title='ActionSheet'>
            <DemoBlock title='基本用法'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='禁用项'>
                <DemoDisabled />
            </DemoBlock>
            <DemoBlock title='自定义标题'>
                <DemoTitle />
            </DemoBlock>
            <DemoBlock title='自定义 render 项'>
                <DemoRender />
            </DemoBlock>
            <DemoBlock title='支持 Drawer 组件配置'>
                <DemoDrawer />
            </DemoBlock>
        </Webview>
    );
};
