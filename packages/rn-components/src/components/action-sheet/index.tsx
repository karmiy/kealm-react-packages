import React, { useContext, useCallback } from 'react';
import { View } from 'react-native';
import { useStyles } from '../../hooks';
import { Drawer } from '../drawer';
import { Text } from '../text';
import { ActionSheetProps, Action } from './types';
import { withActionSheetStyles } from './style';
import { ActionSheetStylesContext } from './context';

export const ActionSheet: React.FC<ActionSheetProps> = props => {
    const {
        styles: _styles,
        drawerStyles,
        onVisibleChange,
        actions,
        title,
        cancelText = '取消',
        onCancel,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(ActionSheetStylesContext);
    const styles = useStyles(withActionSheetStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 标题 ------------------------------ */
    const renderTitle = () => {
        if (!title) return null;

        return (
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        );
    };

    /* ------------------------------ BLOCK: action 列表 ------------------------------ */
    const onActionClick = useCallback(
        (action: Action) => () => {
            const { handler, handlerClosable = true, disabled = false } = action;
            if (disabled) return;

            handler?.();

            handlerClosable && onVisibleChange?.(false);
        },
        [onVisibleChange],
    );

    const renderActions = () => {
        if (!actions?.length) return null;

        const len = actions.length;

        return actions.map((action, index) => {
            const { label, style, render, disabled = false } = action;
            const actionStyles = index !== len - 1 ? styles.borderBottomRaw : null;
            const actionTextStyles = [
                styles.actionText,
                style,
                disabled ? styles.disabledRaw : null,
            ];

            return (
                <View key={index} style={actionStyles}>
                    {render?.() ?? (
                        <Text style={actionTextStyles} onPress={onActionClick(action)}>
                            {label}
                        </Text>
                    )}
                </View>
            );
        });
    };

    /* ------------------------------ BLOCK: 取消按钮 ------------------------------ */
    const onCancelClick = useCallback(() => {
        onCancel?.();
        onVisibleChange?.(false);
    }, [onCancel, onVisibleChange]);

    const renderCancel = () => {
        return (
            <>
                <View style={styles.whiteSpaceRaw} />
                <Text style={styles.actionText} onPress={onCancelClick}>
                    {cancelText}
                </Text>
            </>
        );
    };

    return (
        <Drawer styles={drawerStyles} onVisibleChange={onVisibleChange} {...restProps}>
            <View style={styles.wrapper}>
                {/* 标题 */}
                {renderTitle()}
                {/* action 列表 */}
                {renderActions()}
                {/* 取消按钮 */}
                {renderCancel()}
            </View>
        </Drawer>
    );
};

export * from './types';
export * from './style';
export * from './context';
