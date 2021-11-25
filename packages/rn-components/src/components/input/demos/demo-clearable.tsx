import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, PortalWrapper, Toast } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <PortalWrapper>
            <View style={styles.wrapper}>
                <Input
                    style={styles.inputWrapper}
                    value={value}
                    onChangeText={setValue}
                    placeholder='请输入'
                    allowClear
                    onClear={() => Toast.open({ content: '被清空了' })}
                />
            </View>
        </PortalWrapper>
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
