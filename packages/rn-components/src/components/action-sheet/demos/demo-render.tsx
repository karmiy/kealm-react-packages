import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, ActionSheet, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open ActionSheet
            </Button>
            <ActionSheet
                visible={visible}
                onVisibleChange={setVisible}
                actions={[
                    { label: '满意' },
                    { label: '还行' },
                    { label: '一般' },
                    {
                        // 自定义 render 内容
                        render() {
                            return (
                                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                                    <View style={styles.actionWrapper}>
                                        <Text style={styles.actionTitle}>不满意</Text>
                                        <Text style={styles.actionLabel}>吐槽一下</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        },
                    },
                ]}
            />
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    actionWrapper: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    actionTitle: {
        marginBottom: 8,
        fontSize: 18,
    },
    actionLabel: {
        fontSize: 12,
        color: '#999',
    },
});
