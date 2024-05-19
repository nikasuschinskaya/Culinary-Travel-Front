import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  userPoints: {},
  setUserPoints: () => {},
};

const UserContext = createContext(INITIAL_STATE);

export function UserProvider({ children }) {
  const [userPoints, setUserPoints] = useState(localStorage.getItem("userPoints"));

  useEffect(() => {

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
