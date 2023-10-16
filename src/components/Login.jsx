import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState} from 'react'

export const Login = () => {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email,
      password,
    };

    axios
    .post("http://localhost:3000/api/login", data)
    .then((response) => {
      if (response.data.user) {
        navigate("/main-page");
      } else {
        setErrorLogin(true);
      }
    })
    .catch((error) => {
      console.error("Error", error);
      setErrorLogin(true);
    });
  
  };

  return (
    <div className="container">
      <div className="login-space">
        <h1>Bienvenido a cowmprar</h1>
        <h1>Inicia Sesión</h1>
        <br />
        <br />
        {errorLogin && <p className="text-danger">Usuario o contraseña incorrecto.</p>} 
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
          
          <br />
          <Button variant="dark" type="submit">
            Ingresar
          </Button>
        </Form>
      </div>
      <div className="signup-space">
        <img src="/src/assets/cow.png" width='250' height='250' alt="" />
        <br />
        <br /> 
        <br /> 
        <h2>¿Aún no tienes una cuenta?</h2>
        <br />
        <br />
        <Link to="/form-example">
          <button type="button" className="btn btn-dark">
            Regístrate
          </button>
        </Link>
      </div>
    </div>
  );
};
