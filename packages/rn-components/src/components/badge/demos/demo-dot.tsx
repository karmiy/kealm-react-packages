import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from '@kealm/rn-components';

export default () => {
    return (
        <View style={styles.wrapper}>
            <Badge dot>
                <View style={styles.box} />
            </Badge>
            <View style={styles.gap} />
            <Badge dot visible={false}>
                <View style={styles.box} />
            </Badge>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    box: {
        width: 40,
        height: 40,
        backgroundColor: '#ebebeb',
    },
    gap: {
        width: 24,
    },
});
