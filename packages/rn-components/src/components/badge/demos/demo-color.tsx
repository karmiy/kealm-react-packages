import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from '@kealm/rn-components';

export default () => {
    return (
        <View style={styles.wrapper}>
            <Badge count={3} color='rgb(82, 196, 26)'>
                <View style={styles.box} />
            </Badge>
            <View style={styles.gap} />
            <Badge count={33} color='rgb(82, 196, 26)'>
                <View style={styles.box} />
            </Badge>
            <View style={styles.gap} />
            <Badge count={3} dot color='rgb(82, 196, 26)'>
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
