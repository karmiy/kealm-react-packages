import React, { useState, useCallback } from 'react';
import { StyleSheet, ViewStyle, Animated } from 'react-native';
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

    const renderMask = useCallback(
        ({ animate, style }: { animate: Animated.Value; style: ViewStyle }) => {
            return <Animated.View style={[{ opacity: animate }, style, styles.customMask]} />;
        },
        [],
    );

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Pop
            </Button>
            <Pop visible={visible} onVisibleChange={setVisible} isCenter renderMask={renderMask}>
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
    customMask: { backgroundColor: 'rgba(223, 123, 23, 0.4)' },
});
