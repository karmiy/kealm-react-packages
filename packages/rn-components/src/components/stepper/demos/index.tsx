import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoPlain from './demo-plain';
import DemoDisabled from './demo-disabled';
import DemoEditable from './demo-editable';
import DemoRect from './demo-rect';
import DemoClamp from './demo-clamp';
import DemoStep from './demo-step';
import DemoPrecision from './demo-precision';
import DemoFormatter from './demo-formatter';

export default () => {
    return (
        <Webview title='Textarea'>
            <DemoBlock title='基本用法'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='Plain 简约风格'>
                <DemoPlain />
            </DemoBlock>
            <DemoBlock title='禁用状态'>
                <DemoDisabled />
            </DemoBlock>
            <DemoBlock title='不可编辑'>
                <DemoEditable />
            </DemoBlock>
            <DemoBlock title='自定义宽高'>
                <DemoRect />
            </DemoBlock>
            <DemoBlock title='最大/小值'>
                <DemoClamp />
            </DemoBlock>
            <DemoBlock title='步数'>
                <DemoStep />
            </DemoBlock>
            <DemoBlock title='精度'>
                <DemoPrecision />
            </DemoBlock>
            <DemoBlock title='格式化展示'>
                <DemoFormatter />
            </DemoBlock>
        </Webview>
    );
};
