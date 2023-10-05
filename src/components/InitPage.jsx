import { Login } from "./Login";
import { SignUp } from "./SignUp";
import "../styles/init-page.css";

export const InitPage = () => {
  return (
    <div className="container-fluid bg-primary">
      <Login />
      <SignUp />
    </div>
  );
};
