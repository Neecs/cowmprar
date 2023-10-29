import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { supabase } from "../supabase/data/constants/api_credentials.js";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const email = form.email.value;
    const password = form.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    console.log(error);

    if (!data.session) {
      setErrorLogin(true);
    } else {
      navigate("/");
    }

    console.log(toString(errorLogin));
  };

  return (
    <div className="login-page">
      <div className="login-space">
        <div className="welcome">
          <h1>Bienvenido a cowmprar</h1>
        </div>
        <br />
        <br />
        <h1>Inicia Sesión</h1>
        <br />
        <br />
        {errorLogin && (
          <Alert key="danger" variant="danger">
            Usuario o contraseña incorrectos
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
            <Form.Text className="text-muted">
              Cowmprar no compartirá tu correo con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" />
          </Form.Group>
          <a href="/restore">¿Olvidaste tu contraseña?</a>
          <br />
          <br />
          <Button variant="dark" type="submit">
            Ingresar
          </Button>
        </Form>
      </div>
      <div className="signup-space">
        <img src="/src/assets/cow.png" width="250" height="250" alt="" />
        <br />
        <br />
        <br />
        <div className="account-question">
          <h2>¿Aún no tienes una cuenta?</h2>
        </div>
        <br />
        <br />
        <Link to="/register">
          <button type="button" className="btn btn-dark">
            Regístrate
          </button>
        </Link>
      </div>
    </div>
  );
};
