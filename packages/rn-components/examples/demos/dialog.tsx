import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Dialog, DialogStylesProvider } from '@';
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
    const [isFunc, setIsFunc] = useState(true);
    const [visible, setVisible] = useState(false);
    const [toggleBtnText, setToggleBtnText] = useState(false);
    const [maskClosable, setMaskClosable] = useState(true);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    const dialogProps = useMemo(() => {
        return {
            title: '系统请求使用定位信息权限',
            maskClosable,
            okText: toggleBtnText ? '了解' : undefined,
            cancelText: toggleBtnText ? '算了' : undefined,
            onOpen: () => console.warn('open'),
            afterOpen: () => console.warn('afterOpen'),
            onClose: () => console.warn('onClose'),
            afterClose: () => console.warn('afterClose'),
            unmountOnExit,
        };
    }, [maskClosable, unmountOnExit, toggleBtnText]);

    const open = useCallback(() => {
        Dialog.confirm({
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
            ...dialogProps,
        });
    }, [dialogProps]);

    const flow = useCallback(() => {
        const { destroy, update } = Dialog.confirm({
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
            ...dialogProps,
        });

        setTimeout(() => {
            // 2s 后更新标题
            update({
                title: '这是一个新标题',
                // content: '???',
                // afterClose: () => console.warn('afterClose-update'),
            });

            // 3s 后销毁组件
            setTimeout(() => {
                destroy();
            }, 1000);
        }, 2000);
    }, [dialogProps]);

    return (
        <View>
            <Title>Dialog</Title>
            <View>
                <Button onPress={() => (isFunc ? open() : setVisible(true))}>
                    点击弹出 Dialog
                </Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsFunc(v => !v)}
                >{`是否函数式调用: ${isFunc}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setToggleBtnText(v => !v)}
                >{`更新按钮文本: ${toggleBtnText}`}</Button>
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
                    弹出定位弹框, 2s 后更新标题, 3s 后销毁组件
                </Button>
            </View>
            <Dialog visible={visible} onVisibleChange={setVisible} {...dialogProps}>
                <Text style={styles.content}>为了更好的提供本地天气服务，她她圈和发现内容</Text>
            </Dialog>
        </View>
    );
};

export default Demo;
