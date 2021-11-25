import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Picker } from '@';
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

enum SEX {
    '男' = 1,
    '女' = 2,
}

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<number>();
    const [isDefault, setIsDefault] = useState(false);
    const [maskClosable, setMaskClosable] = useState(true);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    return (
        <View>
            {/* <DrawerStylesProvider
                value={{
                    wrapper: {
                        padding: 20,
                        backgroundColor: 'pink',
                    },
                }}
            > */}
            <Title>Picker</Title>
            <View>
                <Text>Current Value: {value}</Text>
                <Button onPress={() => setVisible(true)}>点击弹出 Picker</Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(4)}>
                    更新值为 4
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(16)}>
                    更新值为 16
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(0)}>
                    更新值为 0
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(undefined)}>
                    更新值为 undefined
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(22)}>
                    更新值为 22（超出）
                </Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsDefault(v => !v)}
                >{`默认10: ${isDefault}`}</Button>
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
            <Picker
                visible={visible}
                onVisibleChange={setVisible}
                data={[...Array(20).keys()].map(index => {
                    return {
                        label: index + '',
                        value: index,
                    };
                })}
                defaultValue={isDefault ? 10 : undefined}
                value={value}
                onChange={setValue}
                drawerProps={{
                    maskClosable,
                    // onOpen: () => console.warn('open'),
                    // afterOpen: () => console.warn('afterOpen'),
                    // onClose: () => console.warn('onClose'),
                    // afterClose: () => console.warn('afterClose'),
                    unmountOnExit,
                }}
            />
            {/* </DrawerStylesProvider> */}
        </View>
    );
};

export default Demo;
