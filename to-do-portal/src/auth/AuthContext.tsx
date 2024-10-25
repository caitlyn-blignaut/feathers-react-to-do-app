import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUnauthenticatedApi } from "../api/useUnauthenticatedApi";

type AuthProviderProps = {
  children?: React.ReactNode;
};

type AuthContextType = {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
  isLoggedIn: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  user: {
    email: "",
    name: "",
  },
  isLoggedIn: false,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => undefined,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [usersName, setUsersName] = useState(
    localStorage.getItem("usersName") || ""
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("site") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedInStatus") === "true"
  );
  const navigate = useNavigate();
  const api = useUnauthenticatedApi();

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await api.service("users").create({
        name,
        email,
        password,
      });

      if (result) {
        try {
          const authResult = await api.authenticate({
            strategy: "local",
            email,
            password,
          });

          if (authResult) {
            setUserEmail(result.email);
            localStorage.setItem("userEmail", result.email);
            setUsersName(result.name);
            localStorage.setItem("usersName", result.name);
            setAccessToken(authResult.accessToken);
            localStorage.setItem("site", authResult.accessToken);
            setIsLoggedIn(true);
            localStorage.setItem("loggedInStatus", "true");
            navigate("/items");
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await api.authenticate({
        strategy: "local",
        email,
        password,
      });

      if (result) {
        setUserEmail(result.user.email);
        localStorage.setItem("userEmail", result.user.email);
        setUsersName(result.user.name);
        localStorage.setItem("usersName", result.user.name);
        setAccessToken(result.accessToken);
        localStorage.setItem("site", result.accessToken);
        setIsLoggedIn(true);
        localStorage.setItem("loggedInStatus", "true");
        navigate("/items");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUserEmail("");
    localStorage.removeItem("userEmail");
    setUsersName("");
    localStorage.removeItem("usersName");
    setAccessToken("");
    localStorage.removeItem("site");
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInStatus");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user: { email: userEmail, name: usersName },
        isLoggedIn,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
