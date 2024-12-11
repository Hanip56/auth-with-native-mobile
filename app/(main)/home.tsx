import { useAuthContext } from "@/contexts/auth-provider";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { onLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
      <View>
        <Text className="text-zinc-100 text-3xl text-center font-bold">
          Here's the Home
        </Text>
        <View className="mt-6 flex justify-between items-center flex-row gap-4">
          <TouchableOpacity
            onPress={onLogout}
            className="text-zinc-50 text-center font-semibold py-4 px-6 rounded-md bg-rose-600"
          >
            <Text className="text-white font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar className="bg-zinc-900" barStyle="light-content" />
    </SafeAreaView>
  );
}
