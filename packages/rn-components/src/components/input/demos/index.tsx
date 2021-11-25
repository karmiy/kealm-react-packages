import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoDisabled from './demo-disabled';
import DemoSize from './demo-size';
import DemoRect from './demo-rect';
import DemoFontSize from './demo-font-size';
import DemoRadius from './demo-radius';
import DemoGrey from './demo-grey';
import DemoLabel from './demo-label';
import DemoClearable from './demo-clearable';
import DemoOverage from './demo-overage';

export default () => {
    return (
        <Webview title='Input'>
            <DemoBlock title='基本用法'>
                <DemoBase />
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
            <DemoBlock title='自定义字体大小'>
                <DemoFontSize />
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
                <DemoClearable />
            </DemoBlock>
            <DemoBlock title='字数限制'>
                <DemoOverage />
            </DemoBlock>
        </Webview>
    );
};
