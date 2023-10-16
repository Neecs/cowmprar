import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "../styles/formNewUser.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const FormUserRegister = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);

    const email = form.email.value;
    const password = form.password.value;
    const doc_id = form.idNumber.value;
    const first_name = form.name.value;
    const last_name = form.lastName.value;
    const role_id = form.userType.value;
    const phone = form.phoneNumber.value;
    const doc_type = form.idType.value;

    const data = {
      email,
      password,
      doc_id,
      first_name,
      last_name,
      role_id,
      phone,
      doc_type,
    };

    axios
      .post("http://localhost:3000/api/register", data)
      .then(function (response) {
        console.log("Correct", response.data);
      })
      .catch(function (error) {
        console.error("Error", error);
        setValidated(false);
      });

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="form-space">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" placeholder="Nombre" />
            <Form.Control.Feedback type="invalid">
              Introduce tu nombre.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control required type="text" placeholder="Apellido" />
            <Form.Control.Feedback type="invalid">
              Introduce tu apellido
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="idType">
            <Form.Label>Tipo de identificación</Form.Label>
            <Form.Select aria-label="Default select example" required>
              <option value="">Selecciona tipo de identificación</option>
              <option value="C.C.">C.C.</option>
              <option value="C.E.">C.E.</option>
              <option value="T.I.">T.I</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecciona tipo de identificación
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="idNumber">
            <Form.Label>Número de identificación</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="# de identificación"
              pattern="[0-9]*"
            />
            <Form.Control.Feedback type="invalid">
              Introduce un número de identificación correcto.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="userType">
            <Form.Label>Tipo de usuario</Form.Label>
            <Form.Select aria-label="Default select example" required>
              <option value="">Selecciona tipo de usuario</option>
              <option value={1}>Cliente (solo desea comprar)</option>
              <option value={2}>
                Ganadero (Desea admistrar y vender su ganado)
              </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccione tipo de identificación válido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="phoneNumber">
            <Form.Label>Número de telefono</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="# de telefono"
              pattern="[0-9]*"
            />
            <Form.Control.Feedback type="invalid">
              Digita un número de telefono válido
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="example@mail.com"
            />
            <Form.Control.Feedback type="invalid">
              Introduce un correo válido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Introduce una contraseña.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="passwordConfirmation">
            <Form.Label>Confirmar contraseña</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                aria-describedby="inputGroupPrepend"
                onInput={(e) => {
                  const passwordField = document.getElementById("password");
                  const passwordConfirmationField = e.target;
                  if (passwordField.value !== passwordConfirmationField.value) {
                    passwordConfirmationField.setCustomValidity("Las contraseñas no coinciden");
                  } else {
                    passwordConfirmationField.setCustomValidity("No coincide con la contraseña"); 
                  }
                }}
                required
              />
              <Form.Control.Feedback type="invalid">asdasdasd</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3"></Form.Group>
        <Button type="submit" className="btn btn-dark">
          Registrarse
        </Button>
        <span style={{ marginRight: "10px" }}></span>
        <Link to="/">
          <Button type="button" className="btn btn-dark">
            Regresar
          </Button>
        </Link>
      </Form>
    </div>
  );
};
