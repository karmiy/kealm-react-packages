import React, { useState } from 'react';
import { useInterval } from '@kealm/react-hooks';

export default () => {
    const [count, setCount] = useState(0);

    useInterval(
        () => {
            setCount(c => ++c);
        },
        count < 10 ? 1000 : null,
    );

    return <p>count: {count}</p>;
};
