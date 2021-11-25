import React, { useContext, useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useDidUpdate } from '@kealm/react-hooks';
import { useStyles } from '../../hooks';
import { isEmpty, isString } from '../../utils/base';
import { Text } from '../text';
import { Drawer } from '../drawer';
import { PickerView } from '../picker-view';
import { PickerProps } from './types';
import { withPickerStyle } from './style';
import { PickerStylesContext } from './context';

export const Picker: React.FC<PickerProps> = props => {
    const {
        styles: _styles,
        pickerViewStyles,
        data,
        defaultValue,
        value,
        onChange,
        visible,
        onVisibleChange,
        title,
        cancelText = '取消',
        onCancel,
        okText = '确定',
        onOk,
        drawerProps,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(PickerStylesContext);
    const styles = useStyles(withPickerStyle, contextStyles, _styles);

    /* ------------------------------ BLOCK: 状态受控 ------------------------------ */
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);
    const onValueChange = (v: any) => setSelectedValue(v);

    /* 值是否在列表中 */
    const isValidValue = (v: any) => !!data.find(item => item.value === v);

    /* value 与内部 selectedValue 受控关系 */
    useDidUpdate(() => {
        if (!data.length) return;

        // 有效值，可更新
        if (isValidValue(value)) {
            value !== selectedValue && setSelectedValue(value);
            return;
        }
        // 无效值，更新为 defaultValue 或第一项
        setSelectedValue(defaultValue ?? data[0].value);
    }, [value]);

    useDidUpdate(() => {
        // 默认值改变时，如果当前 value 是非法值（不在列表内），则更新为 defaultValue
        if (isValidValue(value)) return;

        setSelectedValue(isValidValue(defaultValue) ? defaultValue : data[0].value);
    }, [defaultValue]);

    useDidUpdate(() => {
        if (!visible) return;

        // value/defaultValue 有效，打开时不对齐应更新（如滚了记下，没点确定，关掉再打开）
        if (isValidValue(value)) {
            selectedValue !== value && setSelectedValue(value);
            return;
        }

        if (isValidValue(defaultValue)) {
            selectedValue !== defaultValue && setSelectedValue(defaultValue);
            return;
        }

        // 无效，重置
        data.length && setSelectedValue(data[0].value);
    }, [visible]);

    /* ------------------------------ BLOCK: 取消按钮部分 ------------------------------ */
    const onCancelClick = useCallback(() => {
        onVisibleChange?.(false);
        onCancel?.();
    }, [onVisibleChange, onCancel]);

    const renderCancelBtn = () => {
        return (
            <TouchableWithoutFeedback onPress={onCancelClick}>
                <View style={styles.btn}>
                    {isString(cancelText) ? <Text style={styles.btnText}>{cancelText}</Text> : null}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /* ------------------------------ BLOCK: 确定按钮部分 ------------------------------ */
    const onOkClick = useCallback(() => {
        onVisibleChange?.(false);

        // 值变了，触发 change 事件
        // 只要拖动，就 selectedValue 的值就一定会更新
        if (!isEmpty(selectedValue)) {
            selectedValue !== value && onChange?.(selectedValue);
            onOk?.(selectedValue);
            return;
        }
        // 初始可能打开后没有动直接点确定，如果初始 value 是 undefined，这时应该触发 change
        if (!isEmpty(defaultValue)) {
            onChange?.(defaultValue);
            onOk?.(defaultValue);
            return;
        }
        const firstItemValue = data[0]?.value;
        data?.length && onChange?.(firstItemValue);
        onOk?.(firstItemValue);
    }, [onVisibleChange, onOk, selectedValue, onChange, value, defaultValue, data]);

    const renderOkBtn = () => {
        return (
            <TouchableWithoutFeedback onPress={onOkClick}>
                <View style={styles.btn}>
                    {isString(okText) ? (
                        <Text style={[styles.btnText, styles.okRaw]}>{okText}</Text>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /* ------------------------------ BLOCK: 标题部分 ------------------------------ */
    const renderTitle = () => {
        if (isEmpty(title)) return <View style={styles.title} />;

        return (
            <View style={styles.title}>
                {isString(title) ? <Text style={styles.titleText}>{title}</Text> : title}
            </View>
        );
    };

    /* ------------------------------ BLOCK: item 列表 ------------------------------ */
    const renderItems = () => {
        return data?.map((item, index) => {
            return <PickerView.Item key={index} label={item.label} value={item.value} />;
        });
    };

    return (
        <Drawer visible={visible} onVisibleChange={onVisibleChange} {...drawerProps}>
            <View style={styles.wrapper}>
                {/* 头部 */}
                <View style={styles.header}>
                    {/* 取消按钮 */}
                    {renderCancelBtn()}
                    {/* 标题 */}
                    {renderTitle()}
                    {/* 确定按钮 */}
                    {renderOkBtn()}
                </View>
                <View style={styles.view}>
                    <PickerView
                        styles={pickerViewStyles}
                        selectedValue={selectedValue}
                        onValueChange={onValueChange}
                        {...restProps}
                    >
                        {renderItems()}
                    </PickerView>
                </View>
            </View>
        </Drawer>
    );
};

export * from './types';
export * from './style';
export * from './context';
