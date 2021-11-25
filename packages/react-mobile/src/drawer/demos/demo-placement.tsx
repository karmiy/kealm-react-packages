import React, { useState } from 'react';
import { Drawer, DrawerProps } from '@kealm/react-mobile';
import { Button, Space, Select } from 'antd';
import { classnames } from '../../_utils/base';

export default () => {
    const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Space>
                <Button onClick={() => setVisible(true)}>Open Drawer</Button>
                <Select value={placement} onChange={setPlacement}>
                    <Select.Option value='bottom'>bottom</Select.Option>
                    <Select.Option value='top'>top</Select.Option>
                    <Select.Option value='left'>left</Select.Option>
                    <Select.Option value='right'>right</Select.Option>
                </Select>
            </Space>
            <Drawer visible={visible} onVisibleChange={setVisible} placement={placement}>
                <div
                    className={classnames('my-demo-drawer__box', {
                        'is-vertical': !placement || placement === 'top' || placement === 'bottom',
                        'is-horizontal': placement === 'left' || placement === 'right',
                    })}
                />
            </Drawer>
        </div>
    );
};
