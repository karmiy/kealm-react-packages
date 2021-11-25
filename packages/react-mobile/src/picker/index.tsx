import React, { useState } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import Drawer from '../drawer';
import PickerView from '../picker-view';
import { classnames, emptyArr, isEmpty } from '../_utils/base';
import { PickerProps } from './types';

const Picker: React.FC<PickerProps> = props => {
    const {
        style,
        className,
        data = emptyArr,
        defaultValue,
        value,
        onChange,
        title,
        visible = false,
        onVisibleChange,
        cancelText = '取消',
        onCancel,
        okText = '确定',
        onOk,
        drawerProps,
        ...restProps
    } = props;

    const [pickerValue, setPickerValue] = useState(value ?? defaultValue);

    const isValidValue = (v: any) => !!data.find(item => item.value === v);

    useDidUpdate(() => {
        if (!data.length) return;

        // 有效值，可更新
        if (isValidValue(value)) {
            value !== pickerValue && setPickerValue(value);
            return;
        }
        // 无效值，更新为 defaultValue 或第一项
        setPickerValue(defaultValue ?? data[0].value);
    }, [value]);

    useDidUpdate(() => {
        // 默认值改变时，如果当前 value 是非法值（不在列表内），则更新为 defaultValue
        if (isValidValue(value)) return;

        setPickerValue(isValidValue(defaultValue) ? defaultValue : data[0].value);
    }, [defaultValue]);

    const onCancelClick = () => {
        onVisibleChange?.(false);
        onCancel?.();
    };

    const onOkClick = () => {
        onVisibleChange?.(false);

        // 值变了，触发 change 事件
        // 只要拖动，就 pickerValue 的值就一定会更新
        if (!isEmpty(pickerValue)) {
            pickerValue !== value && onChange?.(pickerValue);
            onOk?.(pickerValue);
            return;
        }
        // 初始可能打开后没有动直接点确定，如果初始 value 是 undefined，这时应该触发 change
        // 有默认值则当前初始应该在默认值的位置
        // 没有默认值初始应该在第一项
        if (!isEmpty(defaultValue)) {
            onChange?.(defaultValue);
            onOk?.(defaultValue);
            return;
        }
        const firstItemValue = data[0]?.value;
        data?.length && onChange?.(firstItemValue);
        onOk?.(firstItemValue);
    };

    return (
        <Drawer visible={visible} onVisibleChange={onVisibleChange} {...drawerProps}>
            <div className={classnames('my-picker', className)} style={style}>
                <div className='my-picker__header'>
                    <div className='my-picker__btn' onClick={onCancelClick}>
                        {cancelText}
                    </div>
                    <div className='my-picker__title'>{title}</div>
                    <div className='my-picker__btn is-ok' onClick={onOkClick}>
                        {okText}
                    </div>
                </div>
                <div className='my-picker__view'>
                    <PickerView
                        data={data}
                        value={pickerValue}
                        onChange={setPickerValue}
                        {...restProps}
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default Picker;
export * from './types';
