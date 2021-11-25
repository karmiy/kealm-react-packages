import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Pop, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Pop
            </Button>
            <Pop visible={visible} onVisibleChange={setVisible}>
                <View style={styles.content} />
            </Pop>
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: 100,
        backgroundColor: '#daeaff',
    },
});
