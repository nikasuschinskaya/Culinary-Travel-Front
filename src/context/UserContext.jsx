import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  isAuth: false,
  setIsAuth: true,
  user: {},
  setUser: () => {},
  recipes: {},
  setRecipes: () => {},
};

const UserContext = createContext(INITIAL_STATE);

export function UserProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
      setIsAuth(true);
    }
  }, []);

  const updateRecipes = (data) => {
    setRecipes([...recipes, data]);
  }

  const value = {
    isAuth,
    setIsAuth,
    user,
    setUser,
    setRecipes: updateRecipes,
    recipes,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
