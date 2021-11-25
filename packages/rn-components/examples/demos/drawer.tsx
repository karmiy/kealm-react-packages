import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Drawer, DrawerStylesProvider } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    space: {
        height: 8,
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    verticalRaw: {
        height: 200,
    },
    horizontalRaw: {
        width: 200,
        height: '100%',
    },
    text: {
        fontSize: 18,
    },
});

const PLACEMENTS = ['bottom', 'top', 'right', 'left'] as const;

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [placementIndex, setPlacementIndex] = useState(0);
    const placement = PLACEMENTS[placementIndex];
    const [offset, setOffset] = useState(0);
    const [maskClosable, setMaskClosable] = useState(true);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    return (
        <View>
            <DrawerStylesProvider
                value={{
                    wrapper: {
                        padding: 20,
                        backgroundColor: 'pink',
                    },
                }}
            >
                <Title>Drawer</Title>
                <View>
                    <Button onPress={() => setVisible(true)}>点击弹出 Drawer</Button>
                    <View style={styles.space} />
                    <Button
                        type='info'
                        plain
                        onPress={() => setPlacementIndex(v => (v + 1) % 4)}
                    >{`切换 placement: ${placement}`}</Button>
                    <View style={styles.space} />
                    <Button
                        type='info'
                        plain
                        onPress={() => setOffset(v => (v ? 0 : 88))}
                    >{`切换 offset: ${offset}`}</Button>
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
                        onPress={() => setUnmountOnExit(v => !v)}
                    >{`切换 unmountOnExit: ${unmountOnExit}`}</Button>
                </View>
                <Drawer
                    visible={visible}
                    onVisibleChange={setVisible}
                    placement={placement}
                    offset={offset}
                    maskClosable={maskClosable}
                    onOpen={() => console.warn('open')}
                    afterOpen={() => console.warn('afterOpen')}
                    onClose={() => console.warn('onClose')}
                    afterClose={() => console.warn('afterClose')}
                    unmountOnExit={unmountOnExit}
                >
                    <View
                        style={[
                            styles.wrapper,
                            placementIndex < 2 ? styles.verticalRaw : styles.horizontalRaw,
                        ]}
                    >
                        <Text style={styles.text}>弹起</Text>
                    </View>
                </Drawer>
            </DrawerStylesProvider>
        </View>
    );
};

export default Demo;
