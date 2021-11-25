import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Button color='yellowgreen'>Custom Color</Button>
            <View style={styles.spacing} />
            <Button color='yellowgreen' plain>
                Custom Color with Plain
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
