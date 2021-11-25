import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoGrey from './demo-grey';
import DemoSize from './demo-size';
import DemoHeight from './demo-height';
import DemoDisabled from './demo-disabled';
import DemoRadius from './demo-radius';
import DemoAutoHeight from './demo-auto-height';
import DemoAutoRows from './demo-auto-rows';
import DemoRows from './demo-rows';
import DemoMaxCount from './demo-max-count';
import DemoTags from './demo-tags';
import './style.scss';

export default () => {
    return (
        <Webview title='Textarea'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='灰底'>
                <DemoGrey />
            </DemoBlock>
            <DemoBlock title='大小'>
                <DemoSize />
            </DemoBlock>
            <DemoBlock title='固定高'>
                <DemoHeight />
            </DemoBlock>
            <DemoBlock title='禁用'>
                <DemoDisabled />
            </DemoBlock>
            <DemoBlock title='自定义圆角大小'>
                <DemoRadius />
            </DemoBlock>
            <DemoBlock title='自适应高度'>
                <DemoAutoHeight />
            </DemoBlock>
            <DemoBlock title='最大、最小行数'>
                <DemoAutoRows />
            </DemoBlock>
            <DemoBlock title='固定行数'>
                <DemoRows />
            </DemoBlock>
            <DemoBlock title='最大字数、字数上限倒计'>
                <DemoMaxCount />
            </DemoBlock>
            <DemoBlock title='带快捷标签'>
                <DemoTags />
            </DemoBlock>
        </Webview>
    );
};
