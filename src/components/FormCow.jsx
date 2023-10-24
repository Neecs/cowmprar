import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "../styles/formNewCow.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export const FormCow = () => {
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
    <div className="form-cow">
    <div className="form-space-cow">
      <div className="header-title-cow">
        <h4 className="title">Formulario de registro de un nuevo Bovino</h4>
        <p className="category">Ingrese los datos del Bovino</p>
      </div>
      <div className="data-cow">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Col md="3">
                <h9>Información principal</h9>
            </Col>
          <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="breed">
              <Form.Select aria-label="Default select example" required>
                <option value="">Raza</option>
                <option value={1}>raza 1</option>
                <option value={2}>Raza 2</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Seleccione tipo de identificación válido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="bornDate">
              <Form.Floating className="mb-3">
              <Form.Control type="date"  required />
                <Form.Label>Fecha de nacimiento del bovino</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Introduce la fecha de nacimiento.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="sex">
              <Form.Select aria-label="Default select example" required>
                <option value="">Sexo </option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecciona el sexo del Bovino.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
            <Col md="3">
                <h9>Información adicional</h9>
            </Col>
          <Row className="mb-3">
            
            <Form.Group as={Col} md="4" controlId="name">
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=" "
                  required
                />
                <Form.Label>Nombre del bovino</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Introduce un nombre.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="color">
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=" "
                  
                  required
                />
                <Form.Label>Color del bovino</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Ingrese un color.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>
            <Col md="3">
                <h9>Información del hato</h9>
            </Col>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="name-hato">
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=" "
                  required
                />
                <Form.Label>Nombre del Hato</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Introduce un nombre.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="location">
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=" "
                  
                  required
                />
                <Form.Label>Ubicacion del Hato</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Ingrese un color.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>
         

          <div className="buttons-cow">
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
