import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Textarea, PortalWrapper, Toast } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    return (
        <PortalWrapper>
            <View style={styles.wrapper}>
                <Textarea
                    style={styles.textareaWrapper}
                    value={value}
                    onChangeText={setValue}
                    placeholder='最多 40 字'
                    maxCount={40}
                    countShowThreshold={9}
                    onOverage={() => Toast.open({ content: '最多输入 40 字' })}
                />
            </View>
        </PortalWrapper>
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
