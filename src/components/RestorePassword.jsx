import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/formNewUser.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { recoverPasswordByEmail} from "../supabase/usecases/auth.js";

export const RestorePassword = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);



  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity()) {
      const email = form.email.value;
      const newPassword = prompt("What would you like your new password to be?");

      try {
        setValidated(await recoverPasswordByEmail(email,newPassword))
        setSuccesfullRegister(true);
      } catch (error) {
        setErrorSignUp(true);
        console.error("Error recovering password:", error);
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="form-user">
      <div className="form-space">
        <div className="header-title">
          <h4 className="title">Registro de usuario</h4>
          <p className="category">Ingrese sus Datos</p>
        </div>
        <br />
        <div className="data">
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

            <Form.Group as={Col} md="4" controlId="passwordConfirmation">
              <Form.Floating className="mb-3">
                <Form.Control type="password" placeholder=" " required />
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Las contraseñas no coinciden.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>

            <div className="buttons">
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" className="btn btn-dark btn-lg">
                Registrarse
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
    </div>
  );
};
