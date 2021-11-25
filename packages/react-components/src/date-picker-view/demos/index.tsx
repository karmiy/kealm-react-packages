import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoClamp from './demo-clamp';
import DemoType from './demo-type';
import DemoUnit from './demo-unit';
import DemoPickerView from './demo-picker-view';

export default () => {
    return (
        <Webview title='DatePickerView'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='最大、最小日期'>
                <DemoClamp />
            </DemoBlock>
            <DemoBlock title='日期选择类型'>
                <DemoType />
            </DemoBlock>
            <DemoBlock title='自定义单位名称'>
                <DemoUnit />
            </DemoBlock>
            <DemoBlock title='支持 PickerView 组件配置（itemHeight: 44）'>
                <DemoPickerView />
            </DemoBlock>
        </Webview>
    );
};
