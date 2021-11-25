import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, InputStylesProvider, Button } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    space: {
        height: 8,
    },
    grayBg: {
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
    },
});

const Demo: FC = () => {
    const [value, setValue] = useState('');
    const [isProvider, setIsProvider] = useState(false);
    const [isStyles, setIsStyles] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [grey, setGrey] = useState(true);
    const [fontSize, setFontSize] = useState<number>();
    const [radius, setRadius] = useState<number>();
    const [label, setLabel] = useState<string>();
    const [isClear, setIsClear] = useState(false);
    const [disabled, setDisabled] = useState(false);

    return (
        <View>
            <InputStylesProvider
                value={
                    isProvider
                        ? {
                              placeholderText: {
                                  color: 'pink',
                              },
                          }
                        : null
                }
            >
                <Title>Input</Title>
                <Input
                    styles={
                        isStyles
                            ? {
                                  placeholderText: {
                                      color: 'red',
                                  },
                              }
                            : null
                    }
                    value={value}
                    onChangeText={setValue}
                    placeholder='请输入'
                    size={isLarge ? 'large' : undefined}
                    width={width}
                    height={height}
                    grey={grey}
                    fontSize={fontSize}
                    radius={radius}
                    label={label}
                    allowClear={isClear}
                    onClear={() => console.warn('被清空了')}
                    disabled={disabled}
                />
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsProvider(v => !v)}
                >{`Provider Styles: ${isProvider}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsStyles(v => !v)}
                >{`Inner Styles: ${isStyles}`}</Button>
                <View style={styles.space} />
                <Button plain type='info' onPress={() => setIsLarge(v => !v)}>{`切换大小: ${
                    isLarge ? 'large' : 'default'
                }`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => {
                        setWidth(v => (v ? undefined : 200));
                        setHeight(v => (v ? undefined : 50));
                    }}
                >{`切换宽高为 200 * 50: ${!!width}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setGrey(v => !v)}
                >{`灰色背景: ${grey}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setFontSize(v => (v ? undefined : 12))}
                >{`字体缩小: ${!!fontSize}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setRadius(v => (v ? undefined : 9))}
                >{`切换 radius 为 8: ${!!radius}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setLabel(v => (v ? undefined : 'label'))}
                >{`label: ${!!label}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsClear(v => !v)}
                >{`可清空: ${!!isClear}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setDisabled(v => !v)}
                >{`禁用: ${!!disabled}`}</Button>
                <View style={styles.space} />
            </InputStylesProvider>
        </View>
    );
};

export default Demo;
