import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoDefault from './demo-default';
import DemoTitle from './demo-title';
import DemoBtnText from './demo-btn-text';
import DemoDatePickerView from './demo-date-picker-view';
import DemoDrawer from './demo-drawer';

export default () => {
    return (
        <Webview title='DatePicker'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='默认选择日期'>
                <DemoDefault />
            </DemoBlock>
            <DemoBlock title='自定义标题'>
                <DemoTitle />
            </DemoBlock>
            <DemoBlock title='取消、确定按钮文本'>
                <DemoBtnText />
            </DemoBlock>
            <DemoBlock title='支持 DatePickerView 组件配置'>
                <DemoDatePickerView />
            </DemoBlock>
            <DemoBlock title='支持 Drawer 组件配置'>
                <DemoDrawer />
            </DemoBlock>
        </Webview>
    );
};
