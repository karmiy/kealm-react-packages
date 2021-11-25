import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Demo: FC = () => {
    return (
        <View>
            <Title>Text</Title>
            <View style={styles.container}>
                <Text>默认文本</Text>
            </View>
        </View>
    );
};

export default Demo;
