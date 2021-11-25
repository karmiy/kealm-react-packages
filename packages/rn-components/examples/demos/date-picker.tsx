import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { subDays, subMonths, addMonths, setMinutes, format, parseISO } from 'date-fns';
import { Text, Button, Picker, DatePicker } from '@';
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

const TYPE_DATA = [
    { label: 'date', value: 'date' },
    { label: 'time', value: 'time' },
    { label: 'datetime', value: 'datetime' },
    { label: 'datehour', value: 'datehour' },
    { label: 'year', value: 'year' },
    { label: 'year-month', value: 'year-month' },
    { label: 'month-day', value: 'month-day' },
];

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<Date>();
    const [isDefault, setIsDefault] = useState(false);
    const [isMin, setIsMin] = useState(false);
    const [isMax, setIsMax] = useState(false);
    const [type, setType] =
        useState<'date' | 'time' | 'datetime' | 'datehour' | 'year' | 'year-month' | 'month-day'>();
    const [visibleType, setVisibleType] = useState(false);
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
            <Title>DatePicker</Title>
            <View>
                <Text>Current Value: {value && format(value, 'yyyy-MM-dd HH:mm:ss')}</Text>
                <Button onPress={() => setVisible(true)}>点击弹出 DatePicker</Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(parseISO('2020-11-12'))}>
                    更新值为 2020/11/12
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(subDays(new Date(), 1))}>
                    更新值为昨天
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(subMonths(new Date(), 1))}>
                    更新值为 1 个月前
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(undefined)}>
                    更新值为 undefined
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setValue(parseISO('2022-04-07 12:12:12'))}>
                    更新值为未来（超出）
                </Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsDefault(v => !v)}
                >{`默认 2021/01/01: ${isDefault}`}</Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setIsMin(v => !v)}>
                    {`切换最小日期为 2021/02/07: ${isMin}`}
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setIsMax(v => !v)}>
                    {`切换最大日期为 2021/06/07: ${isMax}`}
                </Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={() => setVisibleType(true)}>
                    {`选择日期类型 type: ${type ?? 'date'}`}
                </Button>
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
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                defaultValue={isDefault ? parseISO('2021-01-01') : undefined}
                value={value}
                onChange={setValue}
                minDate={isMin ? subMonths(parseISO('2021-04-07 12:12:12'), 2) : undefined}
                maxDate={isMax ? addMonths(parseISO('2021-04-07 12:12:12'), 2) : undefined}
                type={type}
                drawerProps={{
                    maskClosable,
                    // onOpen: () => console.warn('open'),
                    // afterOpen: () => console.warn('afterOpen'),
                    // onClose: () => console.warn('onClose'),
                    // afterClose: () => console.warn('afterClose'),
                    unmountOnExit,
                }}
            />
            <Picker
                data={TYPE_DATA}
                value={type}
                onChange={setType}
                visible={visibleType}
                onVisibleChange={setVisibleType}
            />
            {/* </DrawerStylesProvider> */}
        </View>
    );
};

export default Demo;
