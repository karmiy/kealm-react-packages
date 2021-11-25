import React, { useContext } from 'react';
import { View, ViewProps } from 'react-native';
import { useStyles } from '../../hooks';
import { withSafeAreaBottomStyles } from './style';
import { SafeAreaBottomStylesContext } from './context';

export const SafeAreaBottom: React.FC<ViewProps> = props => {
    const { style, ...restProps } = props;
    const contextStyles = useContext(SafeAreaBottomStylesContext);
    const styles = useStyles(withSafeAreaBottomStyles, contextStyles);

    return <View style={[styles.wrapper, style]} {...restProps} />;
};

export * from './style';
export * from './context';
