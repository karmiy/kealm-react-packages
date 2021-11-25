import React, { FC, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import {
    Button,
    PortalWrapper,
    SafeAreaBottom,
    ThemeProvider,
    ToastStylesProvider,
    DatePickerStylesProvider,
} from '@';
import { createPageProvider } from '../utils';
import { Nav } from '../components';
import {
    DemoText,
    DemoBadge,
    DemoButton,
    DemoInput,
    DemoTextarea,
    DemoPop,
    DemoDrawer,
    DemoDialog,
    DemoActionSheet,
    DemoToast,
    DemoPickerView,
    DemoPicker,
    DemoDatePickerView,
    DemoDatePicker,
    DemoStripRefreshControl,
    DemoCollapse,
    DemoStepper,
} from '../demos';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    scrollWrapper: {
        flex: 1,
    },
    demoWrapper: {
        padding: 16,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const DemoHome: FC = () => {
    const [s, setS] = useState(true);
    const [v, setV] = useState(false);

    const scrollRef = useRef<ScrollView>(null);

    return (
        <ThemeProvider
            value={
                {
                    // color_text_primary: '#f05b72',
                    // c_picker_btn_ok_text_color: '#7fb80e',
                }
            }
        >
            <View style={styles.wrapper}>
                {/* <DatePickerStylesProvider
                value={{
                    wrapper: {
                        backgroundColor: 'pink',
                    },
                }}
            > */}
                <PortalWrapper>
                    <Nav>
                        <Text style={styles.navText}>DemoHome</Text>
                    </Nav>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={styles.demoWrapper}>
                            <DemoText />
                            <DemoCollapse />
                            <DemoBadge />
                            <DemoStepper />
                            <DemoButton />
                            <DemoInput />
                            <DemoTextarea />
                            <DemoPop />
                            <DemoDrawer />
                            <DemoDialog />
                            <DemoActionSheet />
                            <DemoToast />
                            <DemoPickerView />
                            <DemoPicker />
                            <DemoDatePickerView />
                            <DemoDatePicker />
                            <DemoStripRefreshControl />
                        </View>
                        <SafeAreaBottom />
                    </ScrollView>
                </PortalWrapper>
                {/* </DatePickerStylesProvider> */}
            </View>
        </ThemeProvider>
    );
};

export const DemoHomePage = createPageProvider('DemoHome', DemoHome);
