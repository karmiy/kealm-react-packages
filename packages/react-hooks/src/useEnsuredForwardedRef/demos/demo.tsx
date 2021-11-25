import React, { forwardRef } from 'react';
import { useEnsuredForwardedRef, useDidMount } from '@kealm/react-hooks';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => {
        const inputRef = useEnsuredForwardedRef(ref as React.MutableRefObject<HTMLInputElement>);

        useDidMount(() => {
            console.log(inputRef?.current); // ok, log: <input />
        });

        return <input ref={inputRef} {...props} />;
    },
);

export default () => <Input />;
