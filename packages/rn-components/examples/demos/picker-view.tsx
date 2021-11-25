import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, PickerView, PickerViewStylesProvider, ThemeProvider, Text } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    space: {
        height: 8,
    },
});

const Demo: FC = () => {
    const [value, setValue] = useState<number>();
    const [sideCount, setSideCount] = useState(3);

    return (
        <View>
            <Title>PickerView</Title>
            <Text>Current Value: {value}</Text>
            <PickerView
                selectedValue={value}
                onValueChange={v => {
                    console.warn('change', v);
                    setValue(v);
                }}
                sideCount={sideCount}
            >
                {[...Array(20).keys()].map(index => {
                    return <PickerView.Item key={index} label={index + ''} value={index} />;
                })}
            </PickerView>
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
            <Button type='info' plain onPress={() => setSideCount(v => (v === 3 ? 5 : 3))}>
                {`更新 sideCount: ${sideCount}`}
            </Button>
            <View style={styles.space} />
        </View>
    );
};

export default Demo;
