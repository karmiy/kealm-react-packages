import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.wrapper}>
            <Input
                value={value}
                onChangeText={setValue}
                placeholder='请输入'
                width={240}
                height={32}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
});
