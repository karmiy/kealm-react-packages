import React from 'react';
import { SafeAreaBottom } from '@kealm/react-mobile';

const list = [];

export default () => {
    return (
        <div>
            {/* 列表 */}
            {list.map(() => (
                <div>...</div>
            ))}

            {/* 底部兼容 iPhoneX 34 高 */}
            <SafeAreaBottom />
        </div>
    );
};
