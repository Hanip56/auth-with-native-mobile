import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import AuthProvider from "@/contexts/auth-provider";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>

      <StatusBar className="bg-zinc-900" barStyle="light-content" />
    </>
  );
}
