import React from 'react';
import { useSetState } from '@kealm/react-hooks';
import { Button, Space } from 'antd';

export default () => {
    const [state, setState] = useSetState({
        id: 1,
        age: 17,
    });

    return (
        <Space direction='vertical' size='middle'>
            <span>{`{ id: ${state.id}, age: ${state.age} }`}</span>
            <Space>
                <Button
                    onClick={() => {
                        setState(prevState => ({
                            id: prevState.id + 1,
                        }));
                    }}
                >
                    Add Id
                </Button>
                <Button
                    onClick={() => {
                        setState(prevState => ({
                            age: prevState.age + 1,
                        }));
                    }}
                >
                    Add Age
                </Button>
            </Space>
        </Space>
    );
};
