import React, { useContext, useCallback } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';
import { useStyles } from '../../hooks';
import { isEmpty, isString } from '../../utils/base';
import { createPortal, CreatePopConfig, openPopWithPromisify } from '../../utils/portal';
import { Text } from '../text';
import { BasicPop } from '../pop';
import { DialogProps } from './types';
import { withDialogStyles } from './style';
import { DialogStylesContext } from './context';

const BasicDialog: React.FC<DialogProps> = props => {
    const {
        styles: _styles,
        popStyles,
        onVisibleChange,
        title,
        okText = '确定',
        cancelText = '取消',
        onOk,
        onCancel,
        showFooter = true,
        okClosable = true,
        cancelClosable = true,
        children,
        ...restProps
    } = props;

    const contextStyles = useContext(DialogStylesContext);
    const styles = useStyles(withDialogStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 标题 ------------------------------ */
    const renderTitle = () => {
        if (isEmpty(title)) return null;

        return (
            <View style={styles.title}>
                {isString(title) ? <Text style={styles.titleText}>{title}</Text> : title}
            </View>
        );
    };

    /* ------------------------------ BLOCK: 内容 ------------------------------ */
    const renderContent = () => {
        return (
            <View style={[styles.content, isEmpty(title) ? styles.contentWithoutTitle : null]}>
                {isString(children) ? <Text style={styles.contentText}>{children}</Text> : children}
            </View>
        );
    };

    /* ------------------------------ BLOCK: 底部 ------------------------------ */
    const onOkClick = useCallback(() => {
        onOk?.();
        okClosable && onVisibleChange?.(false);
    }, [onOk, onVisibleChange, okClosable]);

    const onCancelClick = useCallback(() => {
        onCancel?.();
        cancelClosable && onVisibleChange?.(false);
    }, [onCancel, onVisibleChange, cancelClosable]);

    const renderFooter = () => {
        if (!showFooter) return null;

        const renderCancel = cancelText && (
            <TouchableWithoutFeedback onPress={onCancelClick}>
                <View style={[styles.footerItem, styles.footerItemLine]}>
                    <Text style={styles.footerText}>{cancelText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );

        const renderOk = okText && (
            <TouchableWithoutFeedback onPress={onOkClick}>
                <View style={[styles.footerItem]}>
                    <Text style={[styles.footerText, styles.okTextRaw]}>{okText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );

        return (
            <View style={styles.footer}>
                {renderCancel}
                {renderOk}
            </View>
        );
    };

    /* ------------------------------ BLOCK: 弹框内容 ------------------------------ */
    const renderWrapper = ({ animate }: { animate: Animated.Value }) => {
        return (
            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        opacity: animate,
                    },
                ]}
            >
                <View style={[styles.body, isEmpty(title) ? styles.bodyWithoutTitle : null]}>
                    {renderTitle()}
                    {renderContent()}
                </View>
                {renderFooter()}
            </Animated.View>
        );
    };

    return (
        <BasicPop styles={popStyles} onVisibleChange={onVisibleChange} isCenter {...restProps}>
            {renderWrapper}
        </BasicPop>
    );
};

/* 函数式调用 */
const api = {
    confirm(config: CreatePopConfig<DialogProps>) {
        return openPopWithPromisify(config, BasicDialog);
    },
};

export * from './types';
export * from './style';
export * from './context';
export const Dialog = Object.assign(createPortal(BasicDialog), api);
