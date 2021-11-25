import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stepper, StepperStylesProvider, ThemeProvider, Button, Text } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    space: {
        height: 8,
    },
});

const Demo: FC = () => {
    const [value, setValue] = useState<number>();
    const [isProvider, setIsProvider] = useState(false);
    const [isStyles, setIsStyles] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readonly, setReadonly] = useState(false);
    const [isMaxLimit, setIsMaxLimit] = useState(false);
    const [isMinLimit, setIsMinLimit] = useState(false);
    const [isWidthLimit, setIsWidthLimit] = useState(false);
    const [isHeightLimit, setIsHeightLimit] = useState(false);
    const [isStep, setIsStep] = useState(false);
    const [isPrecision, setIsPrecision] = useState(false);
    const [isFormat, setIsFormat] = useState(false);
    const [isPlain, setIsPlain] = useState(false);
    const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

    return (
        <View>
            <StepperStylesProvider
                value={
                    isProvider
                        ? {
                              wrapper: {
                                  borderColor: '#1394ff',
                              },
                              btnDecrease: {
                                  borderColor: '#1394ff',
                              },
                              btnIncrease: {
                                  borderColor: '#1394ff',
                              },
                          }
                        : null
                }
            >
                <Title>Stepper</Title>
                <View>
                    <Stepper
                        styles={
                            isStyles
                                ? {
                                      wrapper: {
                                          borderColor: '#fbbc05',
                                      },
                                      btnDecrease: {
                                          borderColor: '#fbbc05',
                                      },
                                      btnIncrease: {
                                          borderColor: '#fbbc05',
                                      },
                                  }
                                : null
                        }
                        value={value}
                        onChange={setValue}
                        disabled={disabled}
                        readonly={readonly}
                        max={isMaxLimit ? 10 : undefined}
                        min={isMinLimit ? -1 : undefined}
                        width={isWidthLimit ? 200 : undefined}
                        height={isHeightLimit ? 40 : undefined}
                        step={isStep ? 0.1 : undefined}
                        precision={isPrecision ? 2 : undefined}
                        formatter={
                            isFormat ? v => `$ ${v}`.replace(/B(?=(d{3})+(?!d))/g, ',') : undefined
                        }
                        parser={isFormat ? v => v.replace(/\$\s?|(,*)/g, '') : undefined}
                        plain={isPlain}
                        fontSize={isFontSizeLarge ? 38 : undefined}
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
                    <Button
                        plain
                        type='info'
                        onPress={() => setDisabled(v => !v)}
                    >{`禁用: ${disabled}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setReadonly(v => !v)}
                    >{`不可编辑: ${readonly}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsMaxLimit(v => !v)}
                    >{`最大值 10: ${isMaxLimit}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsMinLimit(v => !v)}
                    >{`最小值 -1: ${isMinLimit}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsWidthLimit(v => !v)}
                    >{`宽度 200: ${isWidthLimit}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsHeightLimit(v => !v)}
                    >{`高度 40: ${isHeightLimit}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsStep(v => !v)}
                    >{`步数 0.1: ${isStep}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsPrecision(v => !v)}
                    >{`精度 2: ${isPrecision}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsFormat(v => !v)}
                    >{`格式化: ${isFormat}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsPlain(v => !v)}
                    >{`plain 简约风: ${isPlain}`}</Button>
                    <View style={styles.space} />
                    <Button
                        plain
                        type='info'
                        onPress={() => setIsFontSizeLarge(v => !v)}
                    >{`大字号: ${isFontSizeLarge}`}</Button>
                    <View style={styles.space} />
                </View>
            </StepperStylesProvider>
        </View>
    );
};

export default Demo;
