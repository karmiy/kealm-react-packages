import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    title: {
        marginVertical: 16,
        fontSize: 22,
    },
});

const Title: FC = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>;
};

export default Title;
