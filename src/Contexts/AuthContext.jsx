import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const SignOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
