import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Textarea, Stepper } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(2);

    return (
        <View>
            <Stepper min={2} value={rows} onChange={setRows} />
            <View style={styles.wrapper}>
                <Textarea
                    style={styles.textareaWrapper}
                    value={value}
                    onChangeText={setValue}
                    placeholder='请输入'
                    rows={rows}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 8,
        backgroundColor: '#fff',
    },
    textareaWrapper: {
        flex: 1,
    },
});
