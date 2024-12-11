import { useAuthContext } from "@/contexts/auth-provider";
import { Link, Redirect } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  const { user } = useAuthContext();

  if (user) return <Redirect href="/(main)/home" />;

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
      <View>
        <Text className="text-zinc-100 text-3xl text-center font-bold">
          Welcome{"\n"} To My Auth
        </Text>
        <View className="mt-6 flex justify-between items-center flex-row gap-4">
          <Link
            href="/sign-in"
            className="text-zinc-50 text-center font-semibold py-4 px-6 rounded-md bg-amber-900"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-zinc-50 text-center font-semibold py-4 px-6 rounded-md bg-amber-900"
          >
            Sign up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
