import React from 'react';
import { SafeAreaBar } from '@kealm/react-mobile';

const Nav: React.FC = props => {
    return (
        <div>
            {/* 填充状态栏高度 */}
            <SafeAreaBar />
            <div>
                {/* ... */}
                <div>{props.children}</div>
                {/* ... */}
            </div>
        </div>
    );
};

export default () => {
    return (
        <div>
            <Nav>首页</Nav>
            {/* ... */}
        </div>
    );
};
