import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

    if (!data.session) {
      setErrorLogin(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-space">
        <div className="welcome">
          <h1>Bienvenido a cowmprar</h1>
        </div>

        {errorLogin && (
          <Alert key="danger" variant="danger">
            Usuario o contraseña incorrectos
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" className="formulary-field" />
            <Form.Text id="text-muted">
              <p id="privacy">Cowmprar no compartirá tu correo con nadie.</p>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" className="formulary-field"
            />
          </Form.Group>

          <Form.Group>
            <Row>
              <Col className="secondary-options col-3">
                <a href="/restore">¿Olvidaste tu contraseña?</a>
                <br/>
                <br/>
                <a href="/register" id="signup-text">No tienes una cuenta? Registrate</a>
              </Col>
              <Col>
                <Button variant="dark" type="submit" id="login-button">
                  Ingresar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
