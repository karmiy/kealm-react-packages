import React from 'react';
import { Webview, DemoBlock } from '@kealm/react-packages';
import DemoBase from './demo-base';
import DemoType from './demo-type';
import DemoFunc from './demo-func';
import DemoActionable from './demo-actionable';
import DemoPop from './demo-pop';

export default () => {
    return (
        <Webview title='Toast'>
            <DemoBlock title='基本用法'>
                <DemoBase />
            </DemoBlock>
            <DemoBlock title='提示类型'>
                <DemoType />
            </DemoBlock>
            <DemoBlock title='函数式调用（2s 后更新为 success 状态显示 “加载成功” => 3s 后销毁组件）'>
                <DemoFunc />
            </DemoBlock>
            <DemoBlock title='提示期间不可操作界面'>
                <DemoActionable />
            </DemoBlock>
            <DemoBlock title='支持 Pop 组件配置'>
                <DemoPop />
            </DemoBlock>
        </Webview>
    );
};
