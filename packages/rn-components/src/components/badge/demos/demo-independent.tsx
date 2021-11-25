import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from '@kealm/rn-components';

export default () => {
    return (
        <View style={styles.wrapper}>
            <Badge count={3} />
            <View style={styles.gap} />
            <Badge count={33} color='rgb(82, 196, 26)' />
            <View style={styles.gap} />
            <Badge dot />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gap: {
        width: 24,
    },
});
