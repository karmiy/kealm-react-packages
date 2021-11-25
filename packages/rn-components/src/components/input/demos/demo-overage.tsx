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
                    maxCount={10}
                    onOverage={() => Toast.open({ content: '最多10字' })}
                    clipEndEditing={false}
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
