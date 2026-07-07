import {
    createContext,
    useEffect,
    useState,
  } from "react";
  
  type AuthContextType = {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
  };
  
  export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [isAuthenticated, setAuthenticated] = useState(
      sessionStorage.getItem("auth") === "true"
    );
  
    useEffect(() => {
      sessionStorage.setItem(
        "auth",
        String(isAuthenticated)
      );
    }, [isAuthenticated]);
  
    const login = async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
  
      setAuthenticated(true);
    };
  
    const logout = () => {
      setAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }