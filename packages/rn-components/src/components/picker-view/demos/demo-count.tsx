import React, { useState, useMemo } from 'react';
import { PickerView } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<number>();

    const items = useMemo(() => {
        return [...Array(20).keys()].map(index => {
            return <PickerView.Item key={index} label={index + ''} value={index} />;
        });
    }, []);

    return (
        // sideCount 2，即两侧各 2 项，共 5 项
        <PickerView selectedValue={value} onValueChange={v => setValue(v)} sideCount={2}>
            {items}
        </PickerView>
    );
};
