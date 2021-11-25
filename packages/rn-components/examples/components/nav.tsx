import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { px } from '@utils/styles';
import { SafeAreaBar } from '@';

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        height: px(44),
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e8e8e8',
    },
});

const Nav: FC = ({ children }) => {
    return (
        <View>
            <SafeAreaBar />
            <View style={[styles.body, styles.borderBottom]}>{children}</View>
        </View>
    );
};

export default Nav;
