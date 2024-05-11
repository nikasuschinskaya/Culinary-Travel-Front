import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
              <Route exact path='/' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;