import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/formNewUser.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {} from "../supabase/client";
import { supabase } from "../supabase/client";

export const FormNewUser = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log(form);
    const email = form.email.value;
    const password = form.password.value;

    if (password !== form.passwordConfirmation.value) {
      event.preventDefault();
      event.stopPropagation();
      setErrorPassword(true);
    } else {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        console.log(data);
        if (data.user === null) {
          setErrorSignUp(true);
          setSuccesfullRegister(false);
        } else {
          setSuccesfullRegister(true);
        }
      }
    }

    console.log(form.checkValidity());
    setValidated(true);
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
            <Row className="mb-3">
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
            </Row>

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
