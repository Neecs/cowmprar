import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./formNewCow.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {
  getGenders,
  getRazes,
} from "../../../supabase/usecases/cows/get_cow.js";
import { createCow } from "../../../supabase/usecases/cows/create_cow.js";
import {supabase} from "../../../supabase/data/constants/api_credentials.js";

export const FormCow = () => {
  const [validated, setValidated] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [razesDictionary, setRazesDictionary] = useState({});
  const [genderDictionary, setGenderDictionary] = useState({});
  const [selectedRaze, setSelectedRaze] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const razes = await getRazes();
      setRazesDictionary(razes);

      const gender = await getGenders();
      setGenderDictionary(gender);
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const razeId = form.breed.value;
    const bornDate = form.bornDate.value;
    const genderId = form.genre.value;
    const name = form.name.value;
    const color = form.color.value;
    const nameHato = form.nameHato.value;
    const location = form.location.value;

    supabase.auth.onAuthStateChange((event, session) => {
      const createNewCow = async () => {
        await createCow(razeId, genderId, bornDate, name,session.user.id);
      };
      createNewCow();
      navigate('/')

    });
  }

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
              <h2>Información principal</h2>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="breed">
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={selectedRaze}
                  onChange={(e) => setSelectedRaze(e.target.value)}
                >
                  <option value="">Raza</option>
                  {Object.keys(razesDictionary).map((key) => (
                    <option key={key} value={key}>
                      {razesDictionary[key]}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleccione tipo de identificación válido
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
              <p>Información adicional</p>
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
              <p>Información del hato</p>
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
          </Form>
        </div>
      </div>
    </div>
  );
};