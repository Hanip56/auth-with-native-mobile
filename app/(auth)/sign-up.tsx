import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, Redirect } from "expo-router";
import { useAuthContext } from "@/contexts/auth-provider";

const SignUp = () => {
  const [error, setError] = useState("");
  const { onRegister, isLoading } = useAuthContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setError("");
    const { email, password, username } = form;
    if (!email || !password || !username) {
      return Alert.alert("Error", "Required field is missing");
    }

    const res = await onRegister(form);

    if (res?.error) {
      setError(res.message);
    }
  };

  const { user } = useAuthContext();

  if (user) return <Redirect href="/(main)/home" />;

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 justify-center px-4">
      <View className=" mb-4">
        <Text className="text-3xl font-bold text-white">Sign Up</Text>
        <Text className="text-zinc-400 mb-4">
          Already have an account ?{" "}
          <Link href="/(auth)/sign-in" className="font-bold text-orange-600">
            Sign in
          </Link>
        </Text>
      </View>

      <View className="gap-4">
        <View>
          <Text className="text-zinc-100 mb-1">Username</Text>
          <TextInput
            value={form.username}
            onChangeText={(e) => setForm((prev) => ({ ...prev, username: e }))}
            className="text-zinc-50 placeholder:text-zinc-400 bg-zinc-50/10 rounded-md px-4"
            placeholder="Enter username"
          />
        </View>
        <View>
          <Text className="text-zinc-100 mb-1">Email</Text>
          <TextInput
            value={form.email}
            onChangeText={(e) => setForm((prev) => ({ ...prev, email: e }))}
            className="text-zinc-50 placeholder:text-zinc-400 bg-zinc-50/10 rounded-md px-4"
            placeholder="Enter email"
          />
        </View>
        <View>
          <Text className="text-zinc-100 mb-1">Password</Text>
          <TextInput
            value={form.password}
            onChangeText={(e) => setForm((prev) => ({ ...prev, password: e }))}
            className="text-zinc-50 placeholder:text-zinc-400 bg-zinc-50/10 rounded-md px-4"
            placeholder="Enter password"
            secureTextEntry={true}
          />
        </View>
        {error && (
          <View className="rounded-md bg-red-600/60 p-4 w-full">
            <Text className="font-bold text-white">Error: {error}</Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-orange-600 px-6 py-4 rounded-md"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
