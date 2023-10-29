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
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const email = form.email.value;

    const sendEmail = async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "/profiles/update",
      });
    };
    sendEmail();
  };

  return (
    <div className="form-pass-recovery">
      <div className="form-pass-recovery-space">
        <div className="header-title">
          <h4 className="title">Recuperación de contraseña</h4>
          <p className="category">Ingrese su correo.</p>
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
          {errorSignUp && (
            <Alert key="danger" variant="danger">
              Error al crear usuario
            </Alert>
          )}
          {errorPassword && (
            <Alert key="danger" variant="danger">
              Las contraseñas no coinciden
            </Alert>
          )}
          {succesfullRegister && (
            <Alert key="success" variant="success">
              Realiza la confirmación en tu correo electrónico
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
};
