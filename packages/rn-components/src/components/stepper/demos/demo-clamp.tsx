import React, { useState } from 'react';
import { Stepper } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<number>();

    return <Stepper value={value} onChange={setValue} max={10} min={1} />;
};
