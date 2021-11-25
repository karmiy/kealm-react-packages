import React, { useRef } from 'react';
import { useScroll } from '@kealm/react-hooks';
import { Space } from 'antd';

const styles = {
    scrollWrapper: {
        width: 200,
        height: 100,
        border: '1px solid #999',
        overflow: 'auto',
    },
    content: {
        width: 1000,
        height: 2000,
    },
};

export default () => {
    const ref = useRef<HTMLDivElement>(null);

    const { left, top } = useScroll({
        target: ref,
        // target: () => document.querySelector('.use-scroll-wrapper') as HTMLDivElement,
        // target: document,
        // target: window,
        handler(e) {
            console.log(e.target);
        },
    });

    return (
        <Space direction='vertical'>
            <p>left: {left}</p>
            <p>top: {top}</p>
            <div ref={ref} className='use-scroll-wrapper' style={styles.scrollWrapper}>
                <div style={styles.content} />
            </div>
        </Space>
    );
};
