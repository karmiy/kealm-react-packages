import React, { FC, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Badge, Text, Button, Pop } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 200,
        height: 200,
        backgroundColor: 'yellowgreen',
    },
    customMask: { backgroundColor: 'rgba(123, 123, 244, 0.3)' },
    space: {
        height: 8,
    },
});

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [isCenter, setIsCenter] = useState(false);
    const [maskClosable, setMaskClosable] = useState(true);
    const [isCustomMask, setIsCustomMask] = useState(false);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    const renderMask = useCallback(
        ({ animate, style }: { animate: Animated.Value; style: ViewStyle }) => {
            return <Animated.View style={[{ opacity: animate }, style, styles.customMask]} />;
        },
        [],
    );

    return (
        <View>
            <Title>Pop</Title>
            <View>
                <Button onPress={() => setVisible(true)}>点击弹出 Pop</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsCenter(v => !v)}
                >{`切换 isCenter: ${isCenter}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setMaskClosable(v => !v)}
                >{`切换 maskClosable: ${maskClosable}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsCustomMask(v => !v)}
                >{`自定义 mask: ${isCustomMask}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setUnmountOnExit(v => !v)}
                >{`切换 unmountOnExit: ${unmountOnExit}`}</Button>
            </View>
            <Pop
                visible={visible}
                onVisibleChange={setVisible}
                isCenter={isCenter}
                maskClosable={maskClosable}
                onOpen={() => console.warn('open')}
                afterOpen={() => console.warn('afterOpen')}
                onClose={() => console.warn('onClose')}
                afterClose={() => console.warn('afterClose')}
                unmountOnExit={unmountOnExit}
                renderMask={isCustomMask ? renderMask : undefined}
            >
                {({ animate }: { animate: Animated.Value }) => (
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: animate,
                            },
                        ]}
                    />
                )}
            </Pop>
        </View>
    );
};

export default Demo;
