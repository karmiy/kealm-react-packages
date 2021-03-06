import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Textarea, TextareaStylesProvider, Button } from '@';
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
    const [isMedium, setIsMedium] = useState(false);
    const [grey, setGrey] = useState(true);
    const [fontSize, setFontSize] = useState<number>();
    const [radius, setRadius] = useState<number>();
    const [textareaHeight, setTextareaHeight] = useState<number>();
    const [isAutoHeight, setIsAutoHeight] = useState(false);
    const [autoHeight, setAutoHeight] = useState<{ maxRows?: number; minRows?: number }>();
    const [rows, setRows] = useState<number>();
    const [isCount, setIsCount] = useState(false);
    const [isTags, setIsTags] = useState(false);
    const [isTagsOut, setIsTagsOut] = useState(false);
    const [disabled, setDisabled] = useState(false);

    return (
        <View>
            <TextareaStylesProvider
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
                <Title>Textarea</Title>
                <Textarea
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
                    placeholder='?????????'
                    size={isMedium ? 'medium' : undefined}
                    grey={grey}
                    fontSize={fontSize}
                    radius={radius}
                    textareaHeight={textareaHeight}
                    autoHeight={isAutoHeight || autoHeight}
                    rows={rows}
                    showCount={isCount}
                    maxCount={40}
                    countShowThreshold={9}
                    onOverage={() => console.warn('??????40???')}
                    tags={
                        isTags
                            ? [
                                  { key: '????????????', label: '????????????' },
                                  { key: '????????????', label: '????????????' },
                                  { key: '????????????', label: '????????????' },
                                  { key: '????????????', label: '????????????' },
                              ]
                            : undefined
                    }
                    isTagsOut={isTagsOut}
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
                <Button plain type='info' onPress={() => setIsMedium(v => !v)}>{`????????????: ${
                    isMedium ? 'large' : 'default'
                }`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setGrey(v => !v)}
                >{`????????????: ${grey}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setDisabled(v => !v)}
                >{`??????: ${!!disabled}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setFontSize(v => (v ? undefined : 12))}
                >{`????????????: ${!!fontSize}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setRadius(v => (v ? undefined : 24))}
                >{`?????? radius ??? 24: ${!!radius}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setTextareaHeight(v => (v ? undefined : 50))}
                >{`????????? 50: ${!!textareaHeight}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsAutoHeight(v => !v)}
                >{`????????????: ${isAutoHeight}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setAutoHeight(v => (v ? undefined : { maxRows: 4, minRows: 1 }))}
                >{`?????? 1 ???????????? 4 ???: ${!!autoHeight}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setRows(v => (v ? undefined : 3))}
                >{`?????? 3 ???: ${!!rows}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsCount(v => !v)}
                >{`???????????? 40 ???: ${isCount}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsTags(v => !v)}
                >{`????????????: ${isTags}`}</Button>
                <View style={styles.space} />
                <Button
                    plain
                    type='info'
                    onPress={() => setIsTagsOut(v => !v)}
                >{`????????????: ${isTagsOut}`}</Button>
                <View style={styles.space} />
            </TextareaStylesProvider>
        </View>
    );
};

export default Demo;
