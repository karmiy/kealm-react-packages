import React, { useState } from 'react';
import { DatePickerView } from '@kealm/react-components';

export default () => {
    const [value, setValue] = useState<Date>();

    return <DatePickerView value={value} onChange={setValue} type='datehour' />;
};
