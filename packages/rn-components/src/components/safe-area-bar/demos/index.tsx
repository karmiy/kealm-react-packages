import React from 'react';
import { View } from 'react-native';
import { SafeAreaBar, Text } from '@kealm/rn-components';

const Nav: React.FC = props => {
    return (
        <View>
            {/* 填充状态栏高度 */}
            <SafeAreaBar />
            <View>
                {/* ... */}
                <Text>{props.children}</Text>
                {/* ... */}
            </View>
        </View>
    );
};

export default () => {
    return (
        <View>
            <Nav>首页</Nav>
            {/* ... */}
        </View>
    );
};
