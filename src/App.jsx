import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import "./styles/init-page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes} from 'react-router-dom'
import FormExample from './components/FormExample'

function App() {
  return (
    <main className="auth">
      <FormExample/>
    </main>
  );
}

export default App;
