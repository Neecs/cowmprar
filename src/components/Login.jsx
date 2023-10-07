import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import "../styles/signup.css";
import { Link } from 'react-router-dom';


export const Login = () => {
  return (
    <div className="container">
      <div className="login-space">
        <h1>Bienvenido a cowmprar</h1>
        <h1>Inicia Sesión</h1>
        <br />
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
            <Form.Text className="text-muted">
              Cowmprar no compartirá tu correo con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
          <br />
          <Button variant="dark" type="submit">
            Ingresar
          </Button>
        </Form>
      </div>
      <div className="signup-space">
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
