import React, { useState, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Button, Pop, PortalWrapper } from '@kealm/rn-components';

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
            />
        ),
        [],
    );

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Pop
            </Button>
            <Pop visible={visible} onVisibleChange={setVisible}>
                {renderContent}
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
