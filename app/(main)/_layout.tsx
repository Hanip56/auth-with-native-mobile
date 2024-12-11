import { useAuthContext } from "@/contexts/auth-provider";
import { Redirect, Tabs } from "expo-router";

export default function RootLayout() {
  const { user } = useAuthContext();

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarLabelStyle: {
          color: "white",
        },
      }}
    >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="users" options={{ headerShown: false }} />
    </Tabs>
  );
}
