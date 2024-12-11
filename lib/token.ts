import * as SecureStorage from "expo-secure-store";

const TOKEN_KEY = "my_jwt_token";

export const getToken = async () => {
  return await SecureStorage.getItemAsync(TOKEN_KEY); // Or use cookies for better security
};

export const setToken = async (token: string) => {
  await SecureStorage.setItemAsync(TOKEN_KEY, token);
};

export const removeToken = async () => {
  await SecureStorage.deleteItemAsync(TOKEN_KEY);
};
