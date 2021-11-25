import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PickerView, PickerViewRef } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<number>();
    const ref = useRef<PickerViewRef>(null);

    const items = useMemo(() => {
        return [...Array(20).keys()].map(index => {
            return <PickerView.Item key={index} label={index + ''} value={index} />;
        });
    }, []);

    useEffect(() => {
        // 手动调节滚到 selectedValue 的位置
        ref.current?.handleScroll();
    }, []);

    return (
        <PickerView ref={ref} selectedValue={value} onValueChange={v => setValue(v)}>
            {items}
        </PickerView>
    );
};
