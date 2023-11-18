import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./formNewUser.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "../../../context/UserContext";
import { registerUser } from "../../../supabase/usecases/user/create_user";

export const FormUserRegister = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);
  const [idTypes, setIDTypes] = useState({});
  const [roleType, setRoleType] = useState({});
  const [selectedIDType, setSelectedIDType] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { documentTypes } = useContext(UserContext);

  useEffect(() => {
    setIDTypes(documentTypes);
    console.log(documentTypes);
  }, []);

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
        let data = registerUser(email, password);
        console.log(data);
        if (data === false) {
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
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={selectedIDType}
                  onChange={(e) => setSelectedIDType(e.target.value)}
                >
                  <option value="">Tipo de identificacion</option>
                  {Object.keys(idTypes).map((key) => (
                    <option key={key} value={key}>
                      {idTypes[key]}
                    </option>
                  ))}
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
