import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { subDays, subMonths, addDays, addMonths, format, parseISO } from 'date-fns';
import { Button, DatePickerView, DatePickerViewStylesProvider, Text, Picker } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    space: {
        height: 8,
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
    const [value, setValue] = useState<Date>();
    const [isMin, setIsMin] = useState(false);
    const [isMax, setIsMax] = useState(false);
    const [type, setType] =
        useState<'date' | 'time' | 'datetime' | 'datehour' | 'year' | 'year-month' | 'month-day'>();
    const [visibleType, setVisibleType] = useState(false);

    return (
        <View>
            <DatePickerViewStylesProvider
                value={
                    {
                        // c_picker_view_item_height: 60,
                        // c_picker_view_item_grandient_top: ['red', '#fff'],
                        // c_picker_view_item_grandient_bottom: ['#fff', 'red'],
                    }
                }
            >
                <Title>DatePickerView</Title>
                <Text>Current Value: {value && format(value, 'yyyy-MM-dd HH:mm:ss')}</Text>
                <DatePickerView
                    value={value}
                    onChange={v => {
                        setValue(v);
                        /* setTimeout(() => {
                            console.warn('change', v.toLocaleString());
                            setValue(v);
                        }, 3000); */
                    }}
                    minDate={isMin ? subMonths(parseISO('2021-04-07 12:12:12'), 2) : undefined}
                    maxDate={isMax ? addMonths(parseISO('2021-04-07 12:12:12'), 2) : undefined}
                    type={type}
                />
                <Button type='info' plain onPress={() => setValue(subDays(new Date(), 1))}>
                    {/* <Button type='info' plain onPress={() => setValue(parseISO('2020-04-07 12:12:12'))}> */}
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
            </DatePickerViewStylesProvider>
            <Picker
                data={TYPE_DATA}
                value={type}
                onChange={setType}
                visible={visibleType}
                onVisibleChange={setVisibleType}
            />
        </View>
    );
};

export default Demo;
