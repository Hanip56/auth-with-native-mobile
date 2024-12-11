import { User } from "@/types/auth";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "@/lib/token";
import axiosInstance from "@/lib/axios";
import { SplashScreen } from "expo-router";
import { Alert } from "react-native";

// =========== type
type LoginType = {
  email: string;
  password: string;
};

type RegisterType = LoginType & {
  username: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  onLogin: (credential: LoginType) => Promise<any>;
  onRegister: (credential: RegisterType) => Promise<any>;
  onLogout: () => Promise<any>;
};

const initialData: AuthContextType = {
  user: null,
  isLoading: true,
  onLogin: async () => {},
  onRegister: async () => {},
  onLogout: async () => {},
};

// =========== constants
const BASE_ENDPOINT = "http://192.168.43.246:3000/api";

// =========== contexts
const authContext = createContext<AuthContextType>(initialData);
export const useAuthContext = () => useContext(authContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(initialData.isLoading);
  const [user, setUser] = useState<User | null>(initialData.user);

  useEffect(() => {
    const setup = async () => {
      try {
        const token = await getToken();

        if (token) {
          const res = await axiosInstance.get(`/auth/check-jwt?token=${token}`);

          if (res?.data) {
            setUser(res.data);
          }
        }
      } catch (error) {
        console.log(`[Failed to get initial user]`, error);
      } finally {
        setIsLoading(false);
        SplashScreen.hide();
      }
    };

    setup();
  }, []);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        try {
          if (error.response?.status === 401) {
            await removeToken();
            setUser(null);
            Alert.alert("Disconnected", "You are disconnected");
          }
        } catch (error) {
          console.log(error);
        } finally {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  const onLogin = async (credential: LoginType) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_ENDPOINT}/auth/login`, credential);

      if (res?.data) {
        setUser(res.data);

        await setToken(res.data.token);

        return res.data;
      }
    } catch (e) {
      console.log((e as any)?.response);
      return { error: true, message: (e as any)?.response.data };
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (credential: RegisterType) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_ENDPOINT}/auth/register`,
        credential
      );

      if (res?.data) {
        setUser(res.data);

        await setToken(res.data.token);

        return res.data;
      }
    } catch (e) {
      console.log((e as any)?.response);
      return { error: true, message: (e as any)?.response.data };
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setUser(null);

    await removeToken();
  };

  return (
    <authContext.Provider
      value={{ user, isLoading, onLogin, onLogout, onRegister }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
