import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
<<<<<<< HEAD
import { FormCow } from "./components/FormCow";
=======
import { IncidentForm } from "./components/IncidentForm";
import {FormNewUser} from './components/FormNewUser'
import { RestorePassword } from "./components/RestorePassword";
>>>>>>> 73efdc9ea0ff34044a347bff7a8a54da9b4d5549

function App() {

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormCow/>} />
        <Route path="/form-example" element={<FormUserRegister />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
=======
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<FormNewUser />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/inc-reg" element={<IncidentForm />} />
      <Route path="/restore" element={<RestorePassword/>}/>
    </Routes>
>>>>>>> 73efdc9ea0ff34044a347bff7a8a54da9b4d5549
  );
}

export default App;
