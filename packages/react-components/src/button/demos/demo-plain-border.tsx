import React from 'react';
import { Button } from '@kealm/react-components';
import { Row, Col } from 'antd';

export default () => {
    return (
        <Row gutter={[8, 8]}>
            <Col>
                <Button type='primary' plain plainWithBorder={false} width={120}>
                    Primary Plain
                </Button>
            </Col>
            <Col>
                <Button type='regular' plain plainWithBorder={false} width={120}>
                    Regular Plain
                </Button>
            </Col>
            <Col>
                <Button type='info' plain plainWithBorder={false} width={120}>
                    Info Plain
                </Button>
            </Col>
        </Row>
    );
};
