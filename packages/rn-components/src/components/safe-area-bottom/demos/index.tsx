import React from 'react';
import { View } from 'react-native';
import { SafeAreaBottom } from '@kealm/react-components';

const list = [];

export default () => {
    return (
        <View>
            {/* 列表 */}
            {list.map(() => (
                <View>...</View>
            ))}

            {/* 底部兼容 iPhoneX 34 高 */}
            <SafeAreaBottom />
        </View>
    );
};
