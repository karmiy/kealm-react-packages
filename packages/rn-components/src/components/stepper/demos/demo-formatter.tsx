import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stepper } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Stepper
                width={150}
                defaultValue={1000}
                formatter={v => `$ ${v}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
                parser={v => v.replace(/\$\s?|(,*)/g, '')}
            />
            <View style={styles.spacing} />
            <Stepper
                width={150}
                defaultValue={1000}
                formatter={v => `${v}%`}
                parser={v => v.replace('%', '')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
