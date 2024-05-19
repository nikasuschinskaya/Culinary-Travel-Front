import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";

import { RegistrationPage } from "./pages/registration";
import { CountriesPage } from "./pages/countries";
import { LoginPage } from "./pages/login";
import { UserPage } from "./pages/user";
import { FavouritesPage } from "./pages/favourites";
import { BookPage } from "./pages/book";
import { PuzzlePage } from "./pages/puzzle";
import { TestPage } from "./pages/test";
import { RecipePage } from "./pages/recipe";
import { HistoryPage } from "./pages/history";
import { useUserContext } from "./context/UserContext";

const App = () => {
  const { isAuth } = useUserContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/sign-up" element={<RegistrationPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
          </>
        ) : (
          <>
            <Route index path="/" element={<UserPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/book/:shortName" element={<BookPage />} />
            <Route path="/book/:shortName/:id/puzzle" element={<PuzzlePage />} />
            <Route path="/book/:shortName/:id/test" element={<TestPage />} />
            <Route path="/book/:shortName/:id/history" element={<HistoryPage />} />
            <Route path="/book/:shortName/:id/recipe" element={<RecipePage />} />
          </>
        )}
        <Route path="*" element={<div>404 Not found page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
