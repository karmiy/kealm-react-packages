import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoType from './demo-type';
import DemoOpacity from './demo-opacity';
import DemoPlain from './demo-plain';
import DemoPlainBorder from './demo-plain-border';
import DemoColor from './demo-color';
import DemoDisabled from './demo-disabled';
import DemoSize from './demo-size';
import DemoRect from './demo-rect';

export default () => {
    return (
        <Webview title='Button'>
            <DemoBlock title='按钮类型'>
                <DemoType />
            </DemoBlock>
            <DemoBlock title='按下时的不透明度'>
                <DemoOpacity />
            </DemoBlock>
            <DemoBlock title='Plain 简约风格'>
                <DemoPlain />
            </DemoBlock>
            <DemoBlock title='Plain 风格无边框'>
                <DemoPlainBorder />
            </DemoBlock>
            <DemoBlock title='自定义按钮色调'>
                <DemoColor />
            </DemoBlock>
            <DemoBlock title='禁用'>
                <DemoDisabled />
            </DemoBlock>
            <DemoBlock title='按钮大小'>
                <DemoSize />
            </DemoBlock>
            <DemoBlock title='自定义按钮大小'>
                <DemoRect />
            </DemoBlock>
        </Webview>
    );
};
