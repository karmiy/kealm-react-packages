import React from 'react';
import Input from '../input';
import { classnames, isEmpty } from '../_utils/base';
import { useStepper } from './useStepper';
import { StepperProps } from './types';
import {
    INCREASE_ICON,
    INCREASE_DISABLED_ICON,
    INCREASE_PLAIN_ICON,
    INCREASE_PLAIN_DISABLED_ICON,
    DECREASE_ICON,
    DECREASE_DISABLED_ICON,
    DECREASE_PLAIN_ICON,
    DECREASE_PLAIN_DISABLED_ICON,
} from '../_images/base64';

const Stepper: React.FC<StepperProps> = props => {
    const {
        className,
        style,
        width,
        height,
        defaultValue,
        value,
        onChange,
        plain = false,
        max,
        min,
        step,
        disabled,
        precision,
        formatter,
        parser,
        readonly = false,
        fontSize,
        ...restProps
    } = props;

    const {
        inputValue,
        onInputChange,
        isOverMax,
        isBelowMin,
        onIncrease,
        onDecrease,
        onFocus,
        onBlur,
    } = useStepper({
        defaultValue,
        value,
        onChange,
        max,
        min,
        step,
        disabled,
        precision,
        formatter,
        parser,
    });

    const btnStyles = {
        ...(!isEmpty(height) ? { width: height } : {}),
    };

    const renderDecreaseBtn = () => {
        const isDisabled = disabled || isBelowMin;
        const iconSource = plain
            ? isDisabled
                ? DECREASE_PLAIN_DISABLED_ICON
                : DECREASE_PLAIN_ICON
            : isDisabled
            ? DECREASE_DISABLED_ICON
            : DECREASE_ICON;

        return (
            <div
                className={classnames('my-stepper__btn', 'my-stepper__decrease', {
                    'is-disabled': isDisabled,
                })}
                style={btnStyles}
                onClick={onDecrease}
            >
                <img src={iconSource} />
            </div>
        );
    };

    const renderIncreaseBtn = () => {
        const isDisabled = disabled || isOverMax;
        const iconSource = plain
            ? isDisabled
                ? INCREASE_PLAIN_DISABLED_ICON
                : INCREASE_PLAIN_ICON
            : isDisabled
            ? INCREASE_DISABLED_ICON
            : INCREASE_ICON;

        return (
            <div
                className={classnames('my-stepper__btn', 'my-stepper__increase', {
                    'is-disabled': isDisabled,
                })}
                style={btnStyles}
                onClick={onIncrease}
            >
                <img src={iconSource} />
            </div>
        );
    };

    const renderCountView = () => {
        if (plain) {
            return (
                <div className='my-stepper__count' style={!isEmpty(fontSize) ? { fontSize } : {}}>
                    {inputValue}
                </div>
            );
        }

        return (
            <div className={classnames('my-stepper__input', { 'is-readonly': readonly })}>
                <Input
                    style={!isEmpty(fontSize) ? { fontSize } : {}}
                    value={inputValue}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={disabled || readonly}
                />
            </div>
        );
    };

    return (
        <div
            className={classnames('my-stepper', { 'is-plain': plain }, className)}
            style={{
                ...style,
                ...(!isEmpty(width) ? { width } : {}),
                ...(!isEmpty(height) ? { height } : {}),
            }}
            {...restProps}
        >
            {renderDecreaseBtn()}
            {renderCountView()}
            {renderIncreaseBtn()}
        </div>
    );
};

export default Stepper;
export * from './types';
