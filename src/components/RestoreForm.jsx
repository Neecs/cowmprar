import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { recoverPasswordByEmail } from "../supabase/usecases/auth.js";
import "../styles/restorePass.css";
import { supabase } from "../supabase/data/constants/api_credentials.js";
import data from "bootstrap/js/src/dom/data.js";

export const RestoreForm = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const password = form.password.value;

    const sendEmail = async () => {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
    };
    sendEmail();
    console.log(data);
    setValidated(true);
  };

  return (
    <div className="form-pass-recovery">
      <div className="form-pass-recovery-space">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" controlId="password">
            <Form.Floating className="mb-3">
              <Form.Control type="password" placeholder=" " required />
              <Form.Label>Contraseña</Form.Label>
              <Form.Control.Feedback type="invalid">
                Ingrese una contraseña.
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
        </Form>
      </div>
    </div>
  );
};
