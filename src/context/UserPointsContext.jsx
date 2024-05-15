import React, { createContext, useContext, useState } from "react";

const UserPointsContext = createContext();

export const UserPointsProvider = ({ children }) => {
  const [userPoints, setUserPoints] = useState(localStorage.getItem('userPoints'));

  const updateUserPoints = (newValue) => {
    setUserPoints(newValue);
    localStorage.setItem('userPoints', newValue);
  };

  return (
    <UserPointsContext.Provider value={{ userPoints, updateUserPoints }}>
      {children}
    </UserPointsContext.Provider>
  );
};

export const useUserPoints = () => {
  return useContext(UserPointsContext);
};
