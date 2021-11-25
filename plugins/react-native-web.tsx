import React, { forwardRef, CSSProperties } from 'react';
import { NativeModules as RNNativeModules, TextInput as RNTextInput } from 'react-native-web';

export * from 'react-native-web';

const { createElement } = React;

type CreateElement = typeof createElement;
type CreateElementParams = Parameters<CreateElement>;

React.createElement = function (
    this: any,
    Component: CreateElementParams[0],
    domProps: CreateElementParams[1],
    ...children: React.ReactNode[]
) {
    const _domProps = domProps as Record<string, any>;
    if (domProps) {
        // PATCH: 修复 react-native-web 传递 enterKeyHint 在 React 17 不兼容
        delete _domProps.enterKeyHint;

        // HACK: 使 TextInput multiline 时不固定 rows = 1
        if (Component === 'textarea' && _domProps.rows === 1) {
            delete _domProps.rows;
        }
    }
    return createElement.call(this, Component, domProps, ...children);
} as CreateElement;

RNNativeModules.StatusBarManager = {
    HEIGHT: 30,
};

export const NativeModules = RNNativeModules;
export const requireNativeComponent = () => null;
export const TextInput = forwardRef((props: Record<string, any>, ref) => {
    // react-native-web 在 StyleSheet.create 利用 cjs 构建 class
    const style: CSSProperties | Array<CSSProperties> = props?.style ?? {};

    // PATCH: 修复 react-native-web 缺失 textAlign 兼容
    const textAlign = props?.textAlign;
    if (textAlign) {
        Array.isArray(style) ? style.push({ textAlign }) : (style.textAlign = textAlign);
    }
    return <RNTextInput ref={ref} {...props} style={style} />;
});
