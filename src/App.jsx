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

const App = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/book/:shortName" element={<BookPage />} />
          <Route path="/book/:shortName/puzzle" element={<PuzzlePage />} />
          <Route path="/book/:shortName/test" element={<TestPage />} />
          <Route path="*" element={<div>404 Not found page</div>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
