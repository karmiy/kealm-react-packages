import React, { useState } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { Text, StripRefreshControl } from '@kealm/rn-components';

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
                id: {id}; name: {name}
            </Text>
        </View>
    );
};

const getItem = (data: typeof DATA, index: number) => data[index];

const getItemCount = () => 20;

const ITEM_HEIGHT = 50;

export default () => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <VirtualizedList
                    data={DATA}
                    renderItem={({ item }) => <Item {...item} />}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        height: 500,
        overflow: 'hidden',
    },
    item: {
        height: ITEM_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
});
