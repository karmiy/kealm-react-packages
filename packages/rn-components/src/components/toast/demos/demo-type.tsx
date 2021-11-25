import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Toast, PortalWrapper, ToastProps } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<ToastProps['type']>('loading');

    useEffect(() => {
        if (!visible) return;

        setTimeout(() => setVisible(false), 2000);
    }, [visible]);

    return (
        <PortalWrapper>
            <Button
                plain
                onPress={() => {
                    setVisible(true);
                    setType('loading');
                }}
            >
                Open Type: loading
            </Button>
            <View style={styles.spacing} />
            <Button
                plain
                onPress={() => {
                    setVisible(true);
                    setType('success');
                }}
            >
                Open Type: success
            </Button>
            <View style={styles.spacing} />
            <Button
                plain
                onPress={() => {
                    setVisible(true);
                    setType('warning');
                }}
            >
                Open Type: warning
            </Button>
            <Toast visible={visible} onVisibleChange={setVisible} type={type}>
                保存成功
            </Toast>
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
});
