import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Users/Login/Login.jsx";
import { FormUserRegister } from "./components/Users/SignUp/FormUserRegister.jsx";
import { MainPage } from "./components/GeneralComponents/MainPage.jsx";
import { IncidentForm } from "./components/Cows/Incidents/IncidentForm.jsx";
import { RestorePassword } from "./components/Users/Restore/RestorePassword.jsx";
import { FormCow } from "./components/Cows/NewCow/FormCow.jsx";
import { RestoreForm } from "./components/Users/Restore/RestoreForm.jsx";
import { FormCvCow } from "./components/Cows/HVCow/FormCvCow.jsx";
import Marketplace from "./components/Marketplace/Main/Marketplace.jsx";
import UserSettings from "./components/Users/Settings/UserSettings.jsx";

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
      <Route path="/hv-cow/:cowId" element={<FormCvCow />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/settings/:userId" element={<UserSettings />} />
    </Routes>
  );
}

export default App;
