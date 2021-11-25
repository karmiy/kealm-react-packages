import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoAnimated from './demo-animated';
import DemoCenter from './demo-center';
import DemoDuration from './demo-duration';
import DemoMaskClosable from './demo-mask-closable';
import DemoMask from './demo-mask';
import DemoHooks from './demo-hooks';
import DemoUnmountExit from './demo-unmount-exit';

export default () => {
    return (
        <Webview title='Pop'>
            <DemoBlock title='基本用法（无动画）'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='动画效果'>
                <DemoAnimated />
            </DemoBlock>
            <DemoBlock title='内容居中'>
                <DemoCenter />
            </DemoBlock>
            <DemoBlock title='自定义动画时长'>
                <DemoDuration />
            </DemoBlock>
            <DemoBlock title='点击蒙层不关闭'>
                <DemoMaskClosable />
            </DemoBlock>
            <DemoBlock title='自定义蒙层节点'>
                <DemoMask />
            </DemoBlock>
            <DemoBlock title='打开/关闭的钩子函数'>
                <DemoHooks />
            </DemoBlock>
            <DemoBlock title='关闭即销毁 children'>
                <DemoUnmountExit />
            </DemoBlock>
        </Webview>
    );
};
