import React, { forwardRef, useEffect } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useEnsuredForwardedRef } from '@kealm/react-hooks';
import { isEmpty } from './base';
import { isIOS } from './utils';

/* 修复 RN 641 TextInput 在 Pop 无法输入中文 */
export function fixIOSTextInputChs<T extends TextInputProps>(C: React.ComponentType<T>) {
    if (!isIOS) return C;

    return forwardRef<TextInput, T & { enabledChsPatch?: boolean }>((props, ref) => {
        const { value, enabledChsPatch = false, ...restProps } = props;

        const textInputRef = useEnsuredForwardedRef(ref as React.MutableRefObject<TextInput>);

        useEffect(() => {
            if (isEmpty(value) || !enabledChsPatch) return;

            textInputRef.current?.setNativeProps({
                text: value || '',
            });
        }, [value, textInputRef, enabledChsPatch]);

        if (!enabledChsPatch) {
            return (
                <C
                    ref={textInputRef}
                    value={value}
                    {...(restProps as React.PropsWithChildren<T>)}
                />
            );
        }

        return <C ref={textInputRef} {...(restProps as React.PropsWithChildren<T>)} />;
    });
}
