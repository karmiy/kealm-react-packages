import React, { useCallback } from 'react';
import { classnames } from '../_utils/base';
import Drawer from '../drawer';
import SafeAreaBottom from '../safe-area-bottom';
import { ActionSheetProps, Action } from './types';

const ActionSheet: React.FC<ActionSheetProps> = props => {
    const {
        className,
        style,
        onVisibleChange,
        actions,
        title,
        cancelText = '取消',
        onCancel,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const wrapperClassName = classnames('my-action-sheet', className);

    /* ------------------------------ BLOCK: 标题 ------------------------------ */
    const renderTitle = () => {
        if (!title) return null;

        return <div className='my-action-sheet__title'>{title}</div>;
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
            const {
                label,
                className: actionClassName,
                style: actonStyle,
                render,
                disabled = false,
            } = action;

            return (
                <div
                    key={index}
                    className={classnames(
                        'my-action-sheet__option',
                        {
                            'my-action-sheet__option--border': index !== len - 1,
                            'is-disabled': disabled,
                        },
                        actionClassName,
                    )}
                    style={actonStyle}
                    onClick={onActionClick(action)}
                >
                    {render?.() ?? <div className='my-action-sheet__text'>{label}</div>}
                </div>
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
                <div className='my-action-sheet__space' />
                <div className='my-action-sheet__option is-cancel' onClick={onCancelClick}>
                    <div className='my-action-sheet__text'>{cancelText}</div>
                </div>
            </>
        );
    };

    return (
        <Drawer
            className='my-action-sheet__root'
            placement='bottom'
            onVisibleChange={onVisibleChange}
            {...restProps}
        >
            <div className={wrapperClassName} style={style}>
                {/* 标题 */}
                {renderTitle()}
                {/* action 列表 */}
                {renderActions()}
                {/* 取消按钮 */}
                {renderCancel()}
                {/* 底部兼容 iPhoneX */}
                <SafeAreaBottom />
            </div>
        </Drawer>
    );
};

export default ActionSheet;

export * from './types';
