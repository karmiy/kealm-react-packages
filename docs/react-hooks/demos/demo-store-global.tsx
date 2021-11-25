import React from 'react';
import { createStore } from '@kealm/react-hooks';
import { Button, Space, message } from 'antd';

const [useCountStore, { getState, dispatch }] = createStore(
    'count',
    {
        count: 0,
        isTodo: false,
    },
    {
        // 累加
        add({ state, commit }, delta: number) {
            commit({
                ...state,
                count: state.count + delta,
            });
        },
        // 切换 todo 状态
        toggleTodo({ state, commit }) {
            commit({
                ...state,
                isTodo: !state.isTodo,
            });
        },
    },
);

// 在组件外可以正常使用
const handleGetCount = () => message.success(`count: ${getState().count}`);
const handleAddCount = () => dispatch('add', 1);
const handleToggleTodo = () => dispatch('toggleTodo');

export default () => {
    const { state } = useCountStore();

    return (
        <Space>
            <Button onClick={handleGetCount}>Get Count</Button>
            <Button onClick={handleAddCount}>Add Count: {state.count}</Button>
            <Button onClick={handleToggleTodo}>
                Toggle Todo: {state.isTodo ? 'true' : 'false'}
            </Button>
        </Space>
    );
};
