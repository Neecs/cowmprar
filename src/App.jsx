import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
import { IncidentForm } from "./components/IncidentForm";
import {FormNewUser} from './components/FormNewUser'
import { RestorePassword } from "./components/RestorePassword";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<FormNewUser />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/inc-reg" element={<IncidentForm />} />
      <Route path="/restore" element={<RestorePassword/>}/>
    </Routes>
  );
}

export default App;
