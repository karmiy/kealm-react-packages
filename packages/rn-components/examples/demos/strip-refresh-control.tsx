import React, { FC, useState } from 'react';
import { View, StyleSheet, VirtualizedList } from 'react-native';
import { Button, Text, StripRefreshControl } from '@';
import { Title } from '../components';

const DATA: Array<{ id: number; name: string }> = [...Array(40).keys()].map(index => {
    return {
        id: index,
        name: 'K' + index,
    };
});

const Item: React.FC<{ id: number; name: string }> = props => {
    const { id, name } = props;

    return (
        <View style={styles.item}>
            <Text>
                The id is {id}; The name is {name}
            </Text>
        </View>
    );
};

const getItem = (data: typeof DATA, index: number) => data[index];

const getItemCount = () => 20;

const ITEM_HEIGHT = 50;

const styles = StyleSheet.create({
    list: {
        height: 200,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#1394ff',
        overflow: 'hidden',
    },
    item: {
        height: ITEM_HEIGHT,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#1394ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Demo: FC = () => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <View>
            <Title>StripRefreshControl</Title>
            <View style={styles.list}>
                <VirtualizedList
                    data={DATA}
                    renderItem={({ item, index }) => <Item {...item} />}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    getItemLayout={(data, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                    keyExtractor={item => item.id + ''}
                    refreshControl={
                        <StripRefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                // 放手时触发，这时可用去请求接口刷新数据
                                setRefreshing(true);

                                setTimeout(() => {
                                    setRefreshing(false);
                                }, 1000);
                            }}
                        />
                    }
                />
            </View>
        </View>
    );
};

export default Demo;
