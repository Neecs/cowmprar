import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
import { IncidentForm } from "./components/IncidentForm";
import {FormNewUser} from './components/FormNewUser'
import { RestorePassword } from "./components/RestorePassword";
import {FormCow} from './components/FormCow'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<FormUserRegister />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/inc-reg/:cowId" element={<IncidentForm />} />
      <Route path="/restore" element={<RestorePassword/>}/>
      <Route path="form-cow" element={<FormCow/>}/>
    </Routes>
  );
}

export default App;
