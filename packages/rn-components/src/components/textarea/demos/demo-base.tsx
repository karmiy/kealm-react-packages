import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Textarea } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.wrapper}>
            <Textarea
                style={styles.textareaWrapper}
                value={value}
                onChangeText={setValue}
                placeholder='请输入'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    textareaWrapper: {
        flex: 1,
    },
});
