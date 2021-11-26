import React from 'react';
import { createStore } from '@kealm/react-hooks';
import { Button, message, Space } from 'antd';

const [useCountStore] = createStore(
    'count',
    {
        count: 0,
        isTodo: false,
    },
    {
        toast() {
            message.success('Add Success');
        },
        // 累加
        add({ state, commit, dispatch }, delta: number) {
            commit({
                ...state,
                count: state.count + delta,
            });

            // 执行其他 action
            dispatch('toast');
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

/* 在 Home、Product 页面都引入 useCountStore，实现 state 共享 */
const Home: React.FC = () => {
    const {
        state,
        actions: { add, toggleTodo },
    } = useCountStore();

    return (
        <Space>
            <Button onClick={() => add(1)}>Add Count: {state.count}</Button>
            <Button onClick={() => toggleTodo()}>
                Toggle Todo: {state.isTodo ? 'true' : 'false'}
            </Button>
        </Space>
    );
};

const Product: React.FC = () => {
    const {
        state,
        actions: { add, toggleTodo },
    } = useCountStore();

    return (
        <Space>
            <Button onClick={() => add(1)}>Add Count: {state.count}</Button>
            <Button onClick={() => toggleTodo()}>
                Toggle Todo: {state.isTodo ? 'true' : 'false'}
            </Button>
        </Space>
    );
};

export default () => {
    return (
        <Space direction='vertical'>
            <Home />
            <Product />
        </Space>
    );
};
