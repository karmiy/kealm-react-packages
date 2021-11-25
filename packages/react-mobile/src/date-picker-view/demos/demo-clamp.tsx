import React, { useState } from 'react';
import { DatePickerView } from '@kealm/react-mobile';

export default () => {
    const [value, setValue] = useState<Date>();

    return <DatePickerView value={value} onChange={setValue} minDate={new Date('2021/01/01')} />;
};