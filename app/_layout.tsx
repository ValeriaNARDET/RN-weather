import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import keepAwake from "helpers/keepAwake";
import { useEffect } from "react";
import { store } from "@store/store";

export default function RootLayout() {
    useEffect(() => {
        keepAwake();
    }, []);

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
        </Provider>
    );
}
