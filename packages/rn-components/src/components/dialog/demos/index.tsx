import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoFunc from './demo-func';
import DemoPromise from './demo-promise';
import DemoBtnText from './demo-btn-text';
import DemoMaskClosable from './demo-mask-closable';
import DemoPop from './demo-pop';

export default () => {
    return (
        <Webview title='Dialog'>
            <DemoBlock title='基本用法（不常用）'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='函数式调用（2s 后更新标题 => 3s 后销毁组件）'>
                <DemoFunc />
            </DemoBlock>
            <DemoBlock title='函数式调用 Promise 回调'>
                <DemoPromise />
            </DemoBlock>
            <DemoBlock title='取消、确定按钮文本'>
                <DemoBtnText />
            </DemoBlock>
            <DemoBlock title='点击蒙层不关闭'>
                <DemoMaskClosable />
            </DemoBlock>
            <DemoBlock title='支持 Pop 组件配置'>
                <DemoPop />
            </DemoBlock>
        </Webview>
    );
};
