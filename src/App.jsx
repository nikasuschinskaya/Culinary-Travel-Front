import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";

import { RegistrationPage } from "./pages/registration";
import { CountriesPage } from "./pages/countries";
import { LoginPage } from "./pages/login";
import { UserPage } from "./pages/user";
import { FavouritesPage } from "./pages/favourites";
import { BookPage } from "./pages/book";

import { UserPointsProvider } from "./context/UserPointsContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserPointsProvider>
        <Header />
        <Routes>
          <Route index path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/book/:shortName" element={<BookPage />} />
          <Route path="*" element={<div>404 Not found page</div>} />
        </Routes>
      </UserPointsProvider>
    </BrowserRouter>
  );
};

export default App;
