import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Button width={290} height={32}>
                Custom Rect Button
            </Button>
            <View style={styles.spacing} />
            <Button plain width={290} height={32}>
                Custom Rect Plain Button
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
