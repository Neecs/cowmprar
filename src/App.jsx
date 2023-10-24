import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { FormUserRegister } from "./components/FormUserRegister";
import { MainPage } from "./components/MainPage";
import { FormCow } from "./components/FormCow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormCow/>} />
        <Route path="/form-example" element={<FormUserRegister />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
