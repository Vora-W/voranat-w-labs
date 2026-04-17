/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "../api/auth";

export const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const ACCESS_TOKEN_KEY = "access_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  });
  const [isAuthLoading, setIsAuthLoading] = useState(() =>
    Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
  );

  const setToken = (nextToken) => {
    setAccessToken(nextToken);
    if (nextToken) localStorage.setItem(ACCESS_TOKEN_KEY, nextToken);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Hydrate user from access token (backend: GET /auth/get-user)
  useEffect(() => {
    const loadUser = async () => {
      if (!accessToken) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      setIsAuthLoading(true);
      try {
        const me = await fetchCurrentUser(accessToken);
        setUser(me);
      } catch {
        logout();
      } finally {
        setIsAuthLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setToken,
        isAuthLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
