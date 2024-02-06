import { createContext, useContext, useMemo, useState } from "react";
import FirebaseAuth from "../handlers/auth";
const { signIn, signOut, getCurrentUser } = FirebaseAuth;

export const Context = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = () => signIn().then(setCurrentUser);
  const logout = () => signOut().then(() => setCurrentUser(null));
  const authenticate = () => getCurrentUser().then(setCurrentUser);

  const value = useMemo(
    () => {
      return {
        login,
        logout,
        currentUser,
        authenticate,
      };
    },
    [currentUser],
    login,
    logout,
    authenticate
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// custom hook
export const useAuthContext = () => {
  return useContext(Context);
};

export default AuthProvider;
