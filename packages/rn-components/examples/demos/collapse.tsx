import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDidMount } from '@kealm/react-hooks';
import { Button, Collapse } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 200,
        height: 200,
        backgroundColor: 'pink',
    },
    space: {
        height: 8,
    },
    item: {
        height: 100,
    },
    item1: {
        backgroundColor: '#99ffcc',
    },
    item2: {
        backgroundColor: '#99ccff',
    },
});

const Content: React.FC = () => {
    useDidMount(() => {
        console.warn('mounted');
    });

    return (
        <>
            <View style={[styles.item, styles.item1]} />
            <View style={[styles.item, styles.item2]} />
        </>
    );
};

const ALIGNS = ['top', 'center', 'bottom'] as const;
const MODES = ['keepAlive', 'always', 'unmountOnCollapsed'] as const;

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState(0);
    const [duration, setDuration] = useState<number>();
    const [alignIndex, setAlignIndex] = useState(0);
    const align = ALIGNS[alignIndex];
    const [modeIndex, setModeIndex] = useState(0);
    const mode = MODES[modeIndex];

    return (
        <View>
            <Title>Collapse</Title>
            <Collapse
                visible={visible}
                duration={duration}
                collapsedHeight={collapsedHeight}
                align={align}
                renderChildrenMode={mode}
                onOpen={() => console.warn('open')}
                afterOpen={() => console.warn('afterOpen')}
                onClose={() => console.warn('close')}
                afterClose={() => console.warn('afterClose')}
            >
                <Content />
            </Collapse>
            <View style={styles.space} />
            <View>
                <Button onPress={() => setVisible(v => !v)}>切换展开/收起</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setCollapsedHeight(v => (v ? 0 : 100))}
                >{`切换 collapsedHeight: ${collapsedHeight}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setDuration(v => (v ? undefined : 150))}
                >{`切换 duration: ${duration ?? 300}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setAlignIndex(v => (v + 1) % 3)}
                >{`切换 align: ${align}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setModeIndex(v => (v + 1) % 3)}
                >{`切换 mode: ${mode}`}</Button>
            </View>
        </View>
    );
};

export default Demo;
