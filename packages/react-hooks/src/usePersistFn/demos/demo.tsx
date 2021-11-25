import React, { useState, useCallback, useRef } from 'react';
import { usePersistFn } from '@kealm/react-hooks';
import { Button, message, Space } from 'antd';

const ExpensiveTree = React.memo<{ showCount: Function }>(({ showCount }) => {
    const renderCountRef = useRef(0);

    renderCountRef.current++;

    return (
        <Space align='center'>
            <Button onClick={() => showCount()}>showCount</Button>
            <span>Render Count: {renderCountRef.current}</span>
        </Space>
    );
});

export default () => {
    const [count, setCount] = useState(0);

    const showCountFn = useCallback(() => {
        message.info(`Count: ${count}`);
    }, [count]);

    const showCountPersistFn = usePersistFn(() => {
        message.info(`Count: ${count}`);
    });

    return (
        <Space direction='vertical'>
            <Button onClick={() => setCount(c => ++c)}>Add Count: {count}</Button>
            <ExpensiveTree showCount={showCountFn} />
            <ExpensiveTree showCount={showCountPersistFn} />
        </Space>
    );
};
