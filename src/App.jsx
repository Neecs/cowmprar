import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
import { IncidentForm } from "./components/IncidentForm";
import { RestorePassword } from "./components/RestorePassword";
import { FormCow } from "./components/FormCow";
import {RestoreForm} from './components/RestoreForm'
import { FormCvCow } from "./components/FormCvCow";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<FormUserRegister />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/inc-reg/:cowId" element={<IncidentForm />} />
      <Route path="/restore" element={<RestorePassword />} />
      <Route path="form-cow" element={<FormCow />} />
      <Route path="/profile/update" element={<RestoreForm />} />
      <Route path="/hv-cow" element={<FormCvCow />} />
    </Routes>
  );
}

export default App;
