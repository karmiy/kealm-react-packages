import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Collapse } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(true);

    return (
        <View>
            <Button plain onPress={() => setVisible(v => !v)}>
                {visible ? '收起' : '展开'}
            </Button>
            <View style={styles.spacing} />
            <Collapse visible={visible} duration={1000}>
                <View style={[styles.item, styles.item1]} />
                <View style={[styles.item, styles.item2]} />
            </Collapse>
        </View>
    );
};

const styles = StyleSheet.create({
    spacing: {
        height: 8,
    },
    item: {
        height: 50,
    },
    item1: {
        backgroundColor: '#99ffcc',
    },
    item2: {
        backgroundColor: '#99ccff',
    },
});
