import React, { useState, useMemo } from 'react';
import { PickerView } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<number>(); // 初始若没有值，传递空值即可，请勿传递空字符串 useState('')

    // 建议将 Item 用 useMemo 进行包装，可以减少不必要的计算与渲染
    const items = useMemo(() => {
        return [...Array(20).keys()].map(index => {
            return <PickerView.Item key={index} label={index + ''} value={index} />;
        });
    }, []);

    return (
        <PickerView selectedValue={value} onValueChange={v => setValue(v)}>
            {items}
        </PickerView>
    );
};
