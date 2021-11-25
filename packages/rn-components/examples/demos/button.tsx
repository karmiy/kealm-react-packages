import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonStylesProvider, ThemeProvider, Text } from '@';
import { Title } from '../components';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    space: {
        height: 8,
    },
});

const Demo: FC = () => {
    return (
        <View>
            <Title>Button</Title>
            <View>
                <Button type='primary'>Primary</Button>
                <View style={styles.space} />
                <Button type='regular'>Regular</Button>
                <View style={styles.space} />
                <Button type='info'>Info</Button>
                <View style={styles.space} />
                <Button type='primary' plain>
                    Primary Plain
                </Button>
                <View style={styles.space} />
                <Button type='info' plain>
                    Info Plain
                </Button>
                <View style={styles.space} />
                <Button type='regular' plain>
                    Regular Plain
                </Button>
                <View style={styles.space} />
                <Button plain plainWithBorder={false}>
                    Plain Without Border
                </Button>
                <Button plain plainWithBorder={false} disabled>
                    Disabled Plain Without Border
                </Button>
                <View style={styles.space} />
                <Button color='yellowgreen'>Custom Color</Button>
                <View style={styles.space} />
                <Button color='yellowgreen' plain>
                    Custom Color with Plain
                </Button>
                <View style={styles.space} />
                <Button disabled>Disabled</Button>
                <View style={styles.space} />
                <Button disabled type='regular' plain>
                    Disabled Plain
                </Button>
                <View style={styles.space} />
                <Button size='large'>Large</Button>
            </View>
        </View>
    );
};

export default Demo;
