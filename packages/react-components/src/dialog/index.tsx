import React, { useMemo, useCallback } from 'react';
import { DialogProps } from './types';
import { classnames } from '../_utils/base';
import { openPopWithPromisify, CreatePopConfig } from '../_utils/popup';
import Pop from '../pop';

interface Dialog extends React.FC<DialogProps> {
    confirm: typeof confirm;
}

const Dialog: Dialog = props => {
    const {
        className,
        style,
        bodyStyle,
        width,
        visible,
        onVisibleChange,
        title,
        okText = '确定',
        cancelText = '取消',
        onOk,
        onCancel,
        okClosable = true,
        cancelClosable = true,
        showFooter = true,
        footer,
        children,
        ...restProps
    } = props;

    const wrapperClassName = classnames(
        'my-dialog',
        {
            'is-plain': !title,
        },
        className,
    );

    const wrapperStyle = {
        ...style,
        width,
    };

    const handleClose = useCallback(() => {
        onVisibleChange?.(false);
    }, [onVisibleChange]);

    const onOkClick = useCallback(() => {
        onOk?.();
        okClosable && handleClose();
    }, [onOk, okClosable, handleClose]);

    const onCancelClick = useCallback(() => {
        onCancel?.();
        cancelClosable && handleClose();
    }, [onCancel, cancelClosable, handleClose]);

    const renderTitle = () => {
        if (!title) return null;

        return <div className='my-dialog__title'>{title}</div>;
    };

    const renderFooter = useMemo(() => {
        if (!showFooter) return null;

        if (footer) return footer;

        const renderCancel =
            cancelText === null ? null : (
                <span className='is-cancel' onClick={onCancelClick}>
                    {cancelText}
                </span>
            );
        const renderOk =
            okText === null ? null : (
                <span className='is-ok' onClick={onOkClick}>
                    {okText}
                </span>
            );

        return (
            <div className='my-dialog__footer'>
                {renderCancel}
                {renderOk}
            </div>
        );
    }, [showFooter, footer, cancelText, okText, onOkClick, onCancelClick]);

    return (
        <Pop
            className='my-dialog__root'
            visible={visible}
            onVisibleChange={onVisibleChange}
            isCenter
            {...restProps}
        >
            <div className={wrapperClassName} style={wrapperStyle}>
                <div className='my-dialog__body'>
                    {renderTitle()}
                    <div className='my-dialog__content' style={bodyStyle}>
                        {children}
                    </div>
                </div>
                {renderFooter}
            </div>
        </Pop>
    );
};

export function confirm(config: CreatePopConfig<DialogProps>) {
    return openPopWithPromisify(config, Dialog);
}

Dialog.confirm = confirm;

export default Dialog;

export * from './types';
