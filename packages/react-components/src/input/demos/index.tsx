import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoDisabled from './demo-disabled';
import DemoSize from './demo-size';
import DemoRect from './demo-rect';
import DemoRadius from './demo-radius';
import DemoGrey from './demo-grey';
import DemoLabel from './demo-label';
import DemoClear from './demo-clear';
import DemoOverage from './demo-overage';
import './style.scss';

export default () => {
    return (
        <Webview title='Input'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='禁用'>
                <DemoDisabled />
            </DemoBlock>
            <DemoBlock title='输入框大小'>
                <DemoSize />
            </DemoBlock>
            <DemoBlock title='自定义宽高'>
                <DemoRect />
            </DemoBlock>
            <DemoBlock title='自定义圆角大小'>
                <DemoRadius />
            </DemoBlock>
            <DemoBlock title='灰底'>
                <DemoGrey />
            </DemoBlock>
            <DemoBlock title='带 label 的输入框'>
                <DemoLabel />
            </DemoBlock>
            <DemoBlock title='可清空'>
                <DemoClear />
            </DemoBlock>
            <DemoBlock title='字数限制（10）'>
                <DemoOverage />
            </DemoBlock>
        </Webview>
    );
};
