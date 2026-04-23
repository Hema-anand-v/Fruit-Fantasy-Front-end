import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { rootReducer, initialRootState } from "../reducers/rootReducer";
import type { RootState, RootAction } from "../reducers/rootReducer";


interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
  rootState: RootState;
  rootDispatch: React.Dispatch<RootAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  // hydrate from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role")
  );  

  // persist changes
  useEffect(() => {
    console.log("Auth state changed:", { isLoggedIn, role });
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [isLoggedIn, role]);

  const login = useCallback(
    (userRole: string) => {
      setIsLoggedIn(true);
      setRole(userRole);
      navigate("/home"); // default after login
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, rootState: state, rootDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };