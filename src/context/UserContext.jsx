import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  userPoints: {},
  setUserPoints: () => {},
};

const UserContext = createContext(INITIAL_STATE);

export function UserProvider({ children }) {
  const [userPoints, setUserPoints] = useState("");

  useEffect(() => {
    setUserPoints(localStorage.getItem("userPoints"));
  }, []);

  const updateUserPoints = (newValue) => {
    setUserPoints(newValue);
    localStorage.setItem("userPoints", newValue);
  };

  const value = {
    userPoints,
    setUserPoints: updateUserPoints,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
