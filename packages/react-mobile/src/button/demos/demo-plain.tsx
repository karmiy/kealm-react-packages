import React from 'react';
import { Button } from '@kealm/react-mobile';
import { Row, Col } from 'antd';

export default () => {
    return (
        <Row gutter={[8, 8]}>
            <Col>
                <Button type='primary' plain width={120}>
                    Primary Plain
                </Button>
            </Col>
            <Col>
                <Button type='regular' plain width={120}>
                    Regular Plain
                </Button>
            </Col>
            <Col>
                <Button type='info' plain width={120}>
                    Info Plain
                </Button>
            </Col>
        </Row>
    );
};
