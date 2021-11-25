import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoGrey from './demo-grey';
import DemoSize from './demo-size';
import DemoHeight from './demo-height';
import DemoDisabled from './demo-disabled';
import DemoRadius from './demo-radius';
import DemoRows from './demo-rows';
import DemoOverage from './demo-overage';
import DemoTags from './demo-tags';

export default () => {
    return (
        <Webview title='Textarea'>
            <DemoBlock title='基本用法'>
                <DemoBase />
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
            <DemoBlock title='固定行数'>
                <DemoRows />
            </DemoBlock>
            <DemoBlock title='最大字数、字数上限倒计'>
                <DemoOverage />
            </DemoBlock>
            <DemoBlock title='带快捷标签'>
                <DemoTags />
            </DemoBlock>
        </Webview>
    );
};
