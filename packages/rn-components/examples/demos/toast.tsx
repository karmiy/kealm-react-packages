import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Toast } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    space: {
        height: 8,
    },
    content: {
        textAlign: 'center',
    },
});

const Demo: FC = () => {
    const [isFunc, setIsFunc] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isStyles, setIsStyles] = useState(false);
    const [type, setType] = useState<'loading' | 'success' | 'warning'>();
    const [isActionable, setIsActionable] = useState(true);
    const [maskClosable, setMaskClosable] = useState(true);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    const toastProps = useMemo(() => {
        return {
            maskClosable,
            isActionable,
            type,
            styles: isStyles
                ? {
                      wrapper: {
                          backgroundColor: 'skyblue',
                      },
                  }
                : undefined,
            onOpen: () => console.warn('open'),
            afterOpen: () => console.warn('afterOpen'),
            onClose: () => console.warn('onClose'),
            afterClose: () => console.warn('afterClose'),
            unmountOnExit,
        };
    }, [isActionable, isStyles, type, maskClosable, unmountOnExit]);

    const open = useCallback(() => {
        const { destroy } = Toast.open({
            content: '保存完毕',
            ...toastProps,
        });

        setTimeout(destroy, 2000);
    }, [toastProps]);

    const flow = useCallback(() => {
        const { destroy, update } = Toast.loading({
            content: '加载中...',
            ...toastProps,
        });

        setTimeout(() => {
            // 2s 后更新为 'success' 状态
            update({
                content: '加载完成',
                type: 'success',
            });

            // 3s 后销毁组件
            setTimeout(() => {
                destroy();
            }, 1000);
        }, 2000);
    }, [toastProps]);

    return (
        <View>
            <Title>Toast</Title>
            <View>
                <Button onPress={() => (isFunc ? open() : setVisible(true))}>点击弹出 Toast</Button>
                <View style={styles.space} />
                <Button onPress={() => setVisible(false)}>点击关闭 Toast</Button>
                <View style={styles.space} />
                <Button onPress={() => setIsStyles(v => !v)}>内联样式</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsFunc(v => !v)}
                >{`是否函数式调用: ${isFunc}`}</Button>
                <View style={styles.space} />
                <Button onPress={() => setType(undefined)}>{`切换为 Base Toast: ${!type}`}</Button>
                <View style={styles.space} />
                <Button onPress={() => setType('loading')}>
                    {`切换为 Loading Toast: ${type === 'loading'}`}
                </Button>
                <View style={styles.space} />
                <Button onPress={() => setType('success')}>
                    {`切换为 Success Toast: ${type === 'success'}`}
                </Button>
                <View style={styles.space} />
                <Button onPress={() => setType('warning')}>
                    {`切换为 Warning Toast: ${type === 'warning'}`}
                </Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsActionable(v => !v)}
                >{`弹框期间可操作: ${isActionable}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setMaskClosable(v => !v)}
                >{`切换 maskClosable: ${maskClosable}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setUnmountOnExit(v => !v)}
                >{`切换 unmountOnExit: ${unmountOnExit}`}</Button>
                <View style={styles.space} />
                <Button type='info' plain onPress={flow}>
                    弹出 loading, 2s 后 success, 3s 后销毁组件
                </Button>
                <View style={styles.space} />
            </View>
            <Toast visible={visible} onVisibleChange={setVisible} {...toastProps}>
                保存成功
            </Toast>
        </View>
    );
};

export default Demo;
