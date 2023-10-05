import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/init-page.css'

function App() {
  return (
    <main className="auth">
      <Login />
      <SignUp />
    </main>
  );
}

export default App;
