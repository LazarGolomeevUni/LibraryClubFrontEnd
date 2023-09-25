import axios from "axios";
import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  username: string;
  passwordHash: string;
  createdAt: string;
  role: {
    id: number;
    name: string;
  };
}

interface AuthContextProps {
  user: UserProfile | null;
  login: (payload: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile) as UserProfile;
    }
    return null;
  });
  const navigate = useNavigate();
  const login = async (payload: any) => {
    console.log(payload)
    let apiResponse = await axios.post("http://localhost:8090/auth/login", payload, {
      withCredentials: true,
    });
    // let apiResponse = await axios.get("http://localhost:8090/accounts/me", {
    //   withCredentials: true,
    // });
    //const data = JSON.parse(apiResponse.data) 
    console.log(apiResponse.data)
    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
  };
  return (
    <>
      <AuthContext.Provider value={{ user, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
