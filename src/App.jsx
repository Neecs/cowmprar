import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
import {IncidentForm} from './components/IncidentForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< MainPage/>} />
        <Route path="/form-example" element={<FormUserRegister />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/inc-reg" element={<IncidentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
