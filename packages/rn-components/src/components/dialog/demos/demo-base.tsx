import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Dialog, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Dialog
            </Button>
            <Dialog visible={visible} onVisibleChange={setVisible} title='系统请求使用定位信息权限'>
                <Text style={styles.content}>为了更好的提供本地天气服务，她她圈和发现内容</Text>
            </Dialog>
        </PortalWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        textAlign: 'center',
    },
});
