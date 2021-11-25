import React, { useState } from 'react';
import { ActionSheet } from '@kealm/react-components';
import { Button } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open ActionSheet</Button>
            <ActionSheet
                visible={visible}
                onVisibleChange={setVisible}
                actions={[
                    { label: '满意' },
                    { label: '还行' },
                    { label: '一般' },
                    {
                        // 自定义 render 内容
                        render() {
                            return (
                                <div
                                    className='my-demo-action-sheet__render'
                                    onClick={() => setVisible(false)}
                                >
                                    <h3>不满意</h3>
                                    <p>吐槽一下</p>
                                </div>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};
