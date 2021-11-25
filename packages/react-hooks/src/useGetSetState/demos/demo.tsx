import React from 'react';
import { useGetSetState, useSetState } from '@kealm/react-hooks';
import { Button, Space, message } from 'antd';

export default () => {
    const [state, setState] = useSetState({
        id: 1,
    });
    const [get, set] = useGetSetState({
        id: 1,
    });

    return (
        <Space size='large'>
            <Space>
                <span>useGetSetState:</span>
                <Button
                    onClick={() => {
                        set(prevState => ({
                            id: prevState.id + 1,
                        }));
                        message.success(get().id); // 可以拿到最新值
                    }}
                >
                    Add Id: {get().id}
                </Button>
            </Space>
            <Space>
                <span>useSetState:</span>
                <Button
                    onClick={() => {
                        setState(prevState => ({
                            id: prevState.id + 1,
                        }));
                        message.success(state.id); // 无法拿到最新值
                    }}
                >
                    Add Id: {state.id}
                </Button>
            </Space>
        </Space>
    );
};
