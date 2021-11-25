import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Button, Pop, PortalWrapper, Text } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    const renderContent = useCallback(
        ({ animate }: { animate: Animated.Value }) => (
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: animate,
                    },
                ]}
            >
                <TouchableOpacity style={styles.closeWrapper} onPress={() => setVisible(false)}>
                    <Text style={styles.close}>×</Text>
                </TouchableOpacity>
            </Animated.View>
        ),
        [],
    );

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Pop
            </Button>
            <Pop visible={visible} onVisibleChange={setVisible} isCenter maskClosable={false}>
                {renderContent}
            </Pop>
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        width: 100,
        height: 100,
        backgroundColor: '#daeaff',
    },
    closeWrapper: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 4,
        right: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        fontSize: 20,
    },
});
