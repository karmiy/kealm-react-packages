import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Drawer, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Drawer
            </Button>
            <Drawer
                visible={visible}
                onVisibleChange={setVisible}
                afterOpen={() => Toast.open({ content: 'afterOpen' })}
            >
                <View style={[styles.box, styles.verticalRaw]} />
            </Drawer>
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#daeaff',
    },
    verticalRaw: {
        height: 200,
    },
    horizontal: {
        width: 150,
        height: '100%',
    },
});
