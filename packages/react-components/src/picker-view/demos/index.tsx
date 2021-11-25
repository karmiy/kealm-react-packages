import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBasic from './demo-basic';
import DemoItemCount from './demo-item-count';
import DemoItemHeight from './demo-item-height';

export default () => {
    return (
        <Webview title='PickerView'>
            <DemoBlock title='基本用法'>
                <DemoBasic />
            </DemoBlock>
            <DemoBlock title='视图区域显示数量（6）'>
                <DemoItemCount />
            </DemoBlock>
            <DemoBlock title='选项高度（3rem）'>
                <DemoItemHeight />
            </DemoBlock>
        </Webview>
    );
};
