import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login"
import { RegistrationPage } from "./pages/registration";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<div>404 Not found page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
