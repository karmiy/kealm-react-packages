import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Button type='primary' plain>
                Primary Plain
            </Button>
            <View style={styles.spacing} />
            <Button type='info' plain>
                Info Plain
            </Button>
            <View style={styles.spacing} />
            <Button type='regular' plain>
                Regular Plain
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
