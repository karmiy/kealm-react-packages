import React, { useState } from 'react';
import { DatePicker } from '@kealm/react-components';
import { Button } from 'antd';

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open DatePicker</Button>
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                value={value}
                onChange={setValue}
                type='datehour'
                minDate={new Date('2000/01/01')}
            />
        </div>
    );
};
