import React, { useState, useRef, useEffect } from 'react';
import { DatePickerView, DatePickerViewRef } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<Date>();
    const ref = useRef<DatePickerViewRef>(null);

    useEffect(() => {
        ref.current.handleScroll('date', true);
    }, []);

    return <DatePickerView ref={ref} value={value} onChange={setValue} />;
};
