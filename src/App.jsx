import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import FormUserRegister from './components/FormUserRegister';
import { MainPage } from './components/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form-example" element={<FormUserRegister />} />
        <Route path="/main-page" element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
