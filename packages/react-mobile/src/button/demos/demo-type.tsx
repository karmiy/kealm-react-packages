import React from 'react';
import { Button } from '@kealm/react-mobile';
import { Row, Col } from 'antd';

export default () => {
    return (
        <Row gutter={[8, 8]}>
            <Col>
                <Button type='primary' width={120}>
                    Primary
                </Button>
            </Col>
            <Col>
                <Button type='regular' width={120}>
                    Regular
                </Button>
            </Col>
            <Col>
                <Button type='info' width={120}>
                    Info
                </Button>
            </Col>
        </Row>
    );
};
