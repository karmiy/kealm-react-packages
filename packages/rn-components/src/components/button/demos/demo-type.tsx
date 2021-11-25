import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Button type='primary'>Primary</Button>
            <View style={styles.spacing} />
            <Button type='regular'>Regular</Button>
            <View style={styles.spacing} />
            <Button type='info'>Info</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
