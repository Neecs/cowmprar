import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/formNewUser.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export const FormUserRegister = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
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

    if (password !== form.passwordConfirmation.value) {
      event.preventDefault();
      event.stopPropagation();
      setErrorPassword(true);
    } else {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        axios
          .post("http://localhost:3000/api/register", data)
          .then(function (response) {
            console.log("Correct", response.data);
            if ("success" in response.data) {
              navigate("/main-page");
            } else if ("error" in response.data) {
              setErrorSignUp(true);
            }
          })
          .catch(function (error) {
            console.error("Error", error);
          });
      }
    }

    console.log(form.checkValidity());
    setValidated(true);
  };

  return (
    <div className="form-user">
      <div className="form-space">
        <div className="header-title">
          <h4 className="title">Formulario de registro</h4>
          <p className="category">Ingrese sus Datos</p>
        </div>
        <br />
        <div className="data">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="name">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Ingrese un Nombre.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="lastName">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Introduce tu apellido.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="idType">
                <Form.Select aria-label="Default select example" required>
                  <option value="">Tipo de identificación</option>
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="T.I.">T.I</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Selecciona tipo de identificación
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="idNumber">
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    pattern="[0-9]*"
                    required
                  />
                  <Form.Label>Número de identificación</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Introduce un número de identificación correcto.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="userType">
                <Form.Select aria-label="Default select example" required>
                  <option value="">Tipo de usuario</option>
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
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    pattern="[0-9]*"
                    required
                  />
                  <Form.Label>Número de telefono</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Ingrese un numero de telefono valido
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

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
                Ya existe un usuario con este correo
              </Alert>
            )}
            {errorPassword && (
              <Alert key="danger" variant="danger">
                Las contraseñas no coinciden
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
