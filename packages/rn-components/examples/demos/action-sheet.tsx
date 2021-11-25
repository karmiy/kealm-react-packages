import React, { FC, useState, useMemo } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, ActionSheet } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    space: {
        height: 8,
    },
    actionWrapper: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    actionTitle: {
        marginBottom: 12,
        fontSize: 18,
    },
    actionText: {
        fontSize: 12,
        color: '#999',
    },
});

const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isTitle, setIsTitle] = useState(false);
    const [isCustomRender, setIsCustomRender] = useState(false);
    const [maskClosable, setMaskClosable] = useState(true);
    const [unmountOnExit, setUnmountOnExit] = useState(false);

    const actions = useMemo(() => {
        return [
            { label: '满意' },
            { label: '还行' },
            { label: '一般' },
            {
                label: '不满意',
                disabled: isDisabled,
                render: isCustomRender
                    ? () => (
                          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                              <View style={styles.actionWrapper}>
                                  <Text style={styles.actionTitle}>不满意</Text>
                                  <Text style={styles.actionText}>吐槽一下</Text>
                              </View>
                          </TouchableWithoutFeedback>
                      )
                    : undefined,
            },
        ];
    }, [isDisabled, isCustomRender]);

    return (
        <View>
            {/* <DrawerStylesProvider
                value={{
                    wrapper: {
                        padding: 20,
                        backgroundColor: 'pink',
                    },
                }}
            > */}
            <Title>ActionSheet</Title>
            <View>
                <Button onPress={() => setVisible(true)}>点击弹出 ActionSheet</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsDisabled(v => !v)}
                >{`禁用: ${isDisabled}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsTitle(v => !v)}
                >{`带标题: ${isTitle}`}</Button>
                <View style={styles.space} />
                <Button
                    type='info'
                    plain
                    onPress={() => setIsCustomRender(v => !v)}
                >{`自定义 render: ${isCustomRender}`}</Button>
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
            </View>
            <ActionSheet
                visible={visible}
                onVisibleChange={setVisible}
                title={isTitle ? '请做出选择' : undefined}
                actions={actions}
                maskClosable={maskClosable}
                onOpen={() => console.warn('open')}
                afterOpen={() => console.warn('afterOpen')}
                onClose={() => console.warn('onClose')}
                afterClose={() => console.warn('afterClose')}
                unmountOnExit={unmountOnExit}
            />
            {/* </DrawerStylesProvider> */}
        </View>
    );
};

export default Demo;
