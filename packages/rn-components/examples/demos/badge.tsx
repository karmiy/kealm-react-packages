import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge, Text, BadgeStylesProvider } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 18,
    },
});

const Demo: FC = () => {
    return (
        <BadgeStylesProvider
            value={{
                count: {
                    backgroundColor: '#dea32c',
                },
            }}
        >
            <View>
                <Title>Badge</Title>
                <View style={styles.container}>
                    <Badge visible count={10} offset={{ top: -8, right: -18 }}>
                        <Text style={styles.badgeText}>客服</Text>
                    </Badge>
                </View>
            </View>
        </BadgeStylesProvider>
    );
};

export default Demo;
