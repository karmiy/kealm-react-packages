import React, { useContext } from 'react';
import { View, ViewProps } from 'react-native';
import { useStyles } from '../../hooks';
import { withSafeAreaBarStyles } from './style';
import { SafeAreaBarStylesContext } from './context';

export const SafeAreaBar: React.FC<ViewProps> = props => {
    const { style, ...restProps } = props;
    const contextStyles = useContext(SafeAreaBarStylesContext);
    const styles = useStyles(withSafeAreaBarStyles, contextStyles);

    return <View style={[styles.wrapper, style]} {...restProps} />;
};

export * from './style';
export * from './context';
