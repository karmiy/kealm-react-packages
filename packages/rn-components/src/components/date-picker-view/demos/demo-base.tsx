import React, { useState } from 'react';
import { DatePickerView } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<Date>();

    return <DatePickerView value={value} onChange={setValue} />;
};
