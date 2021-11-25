import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Button disabled>Disabled</Button>
            <View style={styles.spacing} />
            <Button disabled type='regular' plain>
                Disabled Plain
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
