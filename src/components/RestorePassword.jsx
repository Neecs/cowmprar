import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { recoverPasswordByEmail } from "../supabase/usecases/auth.js";
import "../styles/restorePass.css";
import { supabase } from "../supabase/data/constants/api_credentials.js";

export const RestorePassword = () => {
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const email = form.email.value;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const sendEmail = async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/profile/update",
      });
    };
    sendEmail();
    setMessage(true);
    setValidated(true);
  };

  return (
    <div className="form-pass-recovery">
      <div className="form-pass-recovery-space">
        <div className="header-title">
          <h4 className="title">Ingresa tu correo registrado en cowmprar</h4>
          <p className="category">
            Si tu correo está registrado te llegará un enlace para restaurar tu
            contraseña.
          </p>
        </div>
        <br />
        <br />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                placeholder="example@mail.com"
                required
              />
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control.Feedback type="invalid">
                Ingrese un correo válido
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

          <div className="buttons">
            <Form.Group className="mb-3"></Form.Group>
            <Button type="submit" className="btn btn-dark btn-lg">
              Enviar correo
            </Button>
            <span style={{ marginRight: "10px" }}></span>
            <Link to="/">
              <Button type="button" className="btn btn-dark btn-lg">
                Regresar
              </Button>
            </Link>
          </div>

          <br />
          <br />
        </Form>
        {message && (
          <Alert key="info" variant="info">
            Revisa en tu correo el enlace de recuperación.
          </Alert>
        )}
      </div>
    </div>
  );
};
