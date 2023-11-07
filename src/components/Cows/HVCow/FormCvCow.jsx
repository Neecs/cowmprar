import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./formCvCow.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { updateHistory } from "../../../supabase/usecases/cows/update_cow.js";
import {supabase} from "../../../supabase/data/constants/api_credentials.js";

export const FormCvCow = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [razesDictionary, setRazesDictionary] = useState({});
  const [genderDictionary, setGenderDictionary] = useState({});
  const [selectedGender, setSelectedGender] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const color = form.color.value;
    const name = form.name.value;
    const idHato = form.hato.value;
    const idPerson = form.person.value;
    

    supabase.auth.onAuthStateChange((event, session) => {
      const createNewCow = async () => {
        await updateHistory(color, name, idHato, idPerson,session.user.id);
      };
      createNewCow();
      navigate('/')

    });
  }

  return (
    <div className="form-cv-cow">
      <div className="form-space-cv">
        <div className="header-title-cv">
          <h4 className="title">Hoja de vida</h4>
          <p className="category">Estos son los datos</p>
        </div>
        <div className="data-cow">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col md="3">
              <h4>Información principal</h4>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="color">
                <Form.Select
                  aria-label="Cambiar el color"
                  required
                  onChange={(e) => (e.target.value)}
                >
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleccione un color valido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="bornDate">
                <Form.Floating className="mb-3">
                  <Form.Control type="date" required />
                  <Form.Label>Fecha de nacimiento del bovino</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Introduce la fecha de nacimiento.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="genre">
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">Genero</option>
                  {Object.keys(genderDictionary).map((key) => (
                    <option key={key} value={key}>
                      {genderDictionary[key]}
                    </option>
                  ))}
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
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Nombre del bovino</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Introduce un nombre.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="color">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
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
              <Form.Group as={Col} md="4" controlId="nameHato">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Nombre del Hato</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Introduce un nombre.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="location">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
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
                Registrar vaca
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
