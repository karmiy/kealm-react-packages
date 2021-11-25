import React, { useState } from 'react';
import { useInterval } from '@kealm/react-hooks';

export default () => {
    const [count, setCount] = useState(0);

    useInterval(
        () => {
            setCount(c => ++c);
        },
        1000,
        true,
    );

    return <p>count: {count}</p>;
};
