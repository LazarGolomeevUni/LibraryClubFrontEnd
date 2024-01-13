import axios from "axios";
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export interface UserProfile {
  id: number;
  username: string;
  age: number;
  role: string;
  consent: number; // Assuming consent is represented as a number (1 or 0) in your database
  iat: number;
  exp: number;
}

interface AuthContextProps {
  accessToken: String | null;
  user: UserProfile | null;
  
  setUser: Dispatch<SetStateAction<UserProfile | null>>;
  login: (payload: any) => Promise<void>;
  
  setAccessToken: Dispatch<SetStateAction<String|null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface UserInformation {
  username: String,
  password: String
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile) as UserProfile;
    }
    return null;
  });
  const [accessToken, setAccessToken] = useState<String|null>(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  })
  let decodedToken: unknown;
  const navigate = useNavigate();
  const login = async (payload: UserInformation) => {
    const expiryTime = new Date().getTime() + 300000;
    let apiResponse = await axios.post("http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/authentication/login", payload);
    // let apiResponse = await axios.get("http://localhost:8090/accounts/me", {
    //   withCredentials: true,
    // });
    //const data = JSON.parse(apiResponse.data)
    const accessTokenAndExpiration = {
      accessToken: apiResponse.data.accessToken,
      expiryTime: expiryTime
    }
    localStorage.setItem("accessToken", JSON.stringify(accessTokenAndExpiration));
    localStorage.setItem("refreshToken", JSON.stringify(apiResponse.data.refreshToken));

    const token = localStorage.getItem("accessToken");
    if (token) {
      const tokenObject = JSON.parse(token);
      decodedToken = jwtDecode(tokenObject.accessToken)
    }

    setAccessToken(apiResponse.data.accessToken)

    setUser(decodedToken as UserProfile);
    navigate("/");
  };
  return (
    <>
      <AuthContext.Provider value={{accessToken, user, setUser, login, setAccessToken}}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
