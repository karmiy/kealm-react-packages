import React, { useState } from 'react';
import { DatePickerView } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<Date>();

    return (
        <DatePickerView
            value={value}
            onChange={setValue}
            type='datetime'
            unit={{
                year: '年份',
                hours: null,
                minutes: null,
            }}
        />
    );
};
