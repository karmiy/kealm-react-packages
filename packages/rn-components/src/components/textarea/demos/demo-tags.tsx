import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { Textarea } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');
    const [isTagsOut, setIsTagsOut] = useState(false);

    return (
        <View style={styles.wrapper}>
            <Switch value={isTagsOut} onValueChange={setIsTagsOut} />
            <View style={styles.spacing} />
            <Textarea
                style={styles.textareaWrapper}
                value={value}
                onChangeText={setValue}
                placeholder='请输入'
                grey
                tags={[
                    { key: '症状描述', label: '症状描述' },
                    { key: '持续时间', label: '持续时间' },
                    { key: '检查结果', label: '检查结果' },
                    { key: '用药情况', label: '用药情况' },
                ]}
                isTagsOut={isTagsOut}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        marginHorizontal: -16,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    spacing: {
        height: 8,
    },
    textareaWrapper: {
        flex: 1,
    },
});
