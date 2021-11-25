import React, { useState } from 'react';
import { PickerView } from '@kealm/react-components';

export default () => {
    const [value, setValue] = useState<number>();

    return (
        <PickerView
            data={[...Array(20).keys()].map(index => {
                return {
                    label: index + 1,
                    value: index + 1,
                };
            })}
            value={value}
            onChange={setValue}
            itemCount={6}
        />
    );
};
