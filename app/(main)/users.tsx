import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { User } from "@/types/auth";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/user");
        if (res.status === 200) {
          setUsers(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 px-4">
      <Text className="text-3xl font-bold text-white mt-4">List Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 12,
        }}
        renderItem={({ item }) => (
          <View className="bg-sky-900 p-4 rounded-xl">
            <Text className="text-white">Username: {item.username}</Text>
            <Text className="text-white">Email: {item.email}</Text>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Users;
