import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.wrapper}>
            <Input
                style={styles.inputWrapper}
                value={value}
                onChangeText={setValue}
                placeholder='请输入'
                disabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    inputWrapper: {
        flex: 1,
    },
});
