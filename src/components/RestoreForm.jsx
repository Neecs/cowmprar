import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { recoverPasswordByEmail } from "../supabase/usecases/auth.js";
import "../styles/restoreForm.css";
import { supabase } from "../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";

export const RestoreForm = () => {
  const [validated, setValidated] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRecovery, setSuccesfullRecovery] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const password = form.password.value;
    const updatePassword = async () => {
      await supabase.auth.updateUser({
        password: password,
      });
    };

    if (password !== form.passwordConfirmation.value) {
      event.preventDefault();
      event.stopPropagation();
      setErrorPassword(true);
    } else {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        updatePassword();
        setSuccesfullRecovery(true);
        alert("Contraseña cambiada exitosamente");
        navigate("/");
      }
    }

    setValidated(true);
  };

  return (
    <div className="form-pass">
      <div className="form-pass-space">
        <div className="header-title">
          <h4>Ingresa tu nueva contraseña</h4>
          <p >
            Ingresa tu nueva contraseña para poder acceder a tu cuenta.
          </p>
        </div>
      <div className="infoSpace">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <p>Ingrese su nueva contraseña</p>
          <Form.Group as={Col} md="4" controlId="password">
            <Form.Floating className="mb-3">
              <Form.Control type="password" placeholder=" " required />
              <Form.Label>Contraseña</Form.Label>
              <Form.Control.Feedback type="invalid">
                Ingrese una contraseña.
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>
          <p>vuelva a ingresar la contraseña</p>
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
            <Button type="submit" className="btn btn-dark btn-md">
              Registrarse
            </Button>
            <span style={{ marginRight: "10px" }}></span>
            <Link to="/">
              <Button type="button" className="btn btn-dark btn-md">
                Regresar
              </Button>
            </Link>
          </div>
          {errorPassword && (
            <Alert key="danger" variant="danger">
              Las contraseñas no coinciden
            </Alert>
          )}
          {succesfullRecovery && (
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
