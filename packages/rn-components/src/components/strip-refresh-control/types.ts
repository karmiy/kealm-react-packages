import { ViewProps } from 'react-native';

export interface NativeRefreshControlProps extends ViewProps {
    enabled?: boolean;
    refreshing: boolean;
    onRefresh?: () => void;
    completeText?: string;
    title?: string;
}
export interface StripRefreshControlProps extends ViewProps {
    enabled?: boolean;
    refreshing: boolean;
    onRefresh?: () => void;
}
