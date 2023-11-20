import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./formCvCow.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CowContext } from "../../../context/CowContext.jsx";
import ModalHerd from "./ModalHerd.jsx";
import {
  updateStatus,
  updateHV,
} from "../../../supabase/usecases/cows/update_cow";

export const FormCvCow = () => {
  const [validated] = useState(false);
  const navigate = useNavigate();
  const { cowId } = useParams();
  const { cowStatus, cowHerds, departmentsLocation } = useContext(CowContext);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [statusDictionary, setStatusDictionary] = useState([]);
  const [herdsDictionary, setHerdsDictionary] = useState([]);
  const [selectedHerd, setSelectedHerd] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [departmentDictionary, setDepartmentDictionary] = useState([]);
  const updateHealthStatus = async (id_vaca, health_status) => {
    await updateStatus(id_vaca, health_status);
  };
  const updateHVData = async (color, id_hato, id_hv) => {
    await updateHV(color, id_hato, id_hv);
  };

  useEffect(() => {
    console.log(cowStatus);
    setStatusDictionary(cowStatus);
    setHerdsDictionary(cowHerds);
    setDepartmentDictionary(departmentsLocation);
  }, [cowHerds]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const color = form.color.value;
    const status = form.status.value;
    const herd = form.herd.value;
    updateHealthStatus(cowId, status);
    updateHVData(color, herd, cowId);
    navigate("/");
  };

  return (
    <div className="form-cow-cv">
      <div className="form-space-cow">
        <div className="header-title-cow">
          <h4 className="title">Hoja de vida</h4>
          {/* <p className="category">Ingrese los datos del Bovino</p> */}
        </div>
        <div className="data-cow">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col md="3">
              <h2 className="subtitle">Información</h2>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="color">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Color</Form.Label>
                </Form.Floating>
              </Form.Group>
            </Row>
            <Form.Group as={Col} md="3" controlId="status">
              <Form.Select
                aria-label="Default select example"
                required
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Estado de la vaca</option>
                {statusDictionary.map((state) => (
                  <option key={state.id_estado} value={state.id_estado}>
                    {state.nombre_estado}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Col md="3">
              <h2 className="subtitle">Hato</h2>
            </Col>
            <Row></Row>
            <Row className="mb-3"></Row>
            <Form.Group as={Col} md="3" controlId="herd">
              <Form.Select
                aria-label="Default select example"
                required
                value={selectedHerd}
                onChange={(e) => setSelectedHerd(e.target.value)}
              >
                <option value="">Hatos registrados</option>
                {herdsDictionary.map((herd) => (
                  <option key={herd.id_hato} value={herd.id_hato}>
                    {herd.nombre_hato}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="buttons-cow">
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" className="button-common button-aceptar">
                Confirmar cambios
              </Button>
              <span style={{ marginRight: "10px" }}></span>
              <Link to="/">
                <Button type="button" className="button-common button-regresar">
                  Regresar
                </Button>
              </Link>
              <Button
                type="button"
                className="button-common button-regresar"
                onClick={() => setModalShow(true)}
              >
                Agregar nuevo hato
              </Button>
            </div>
            <ModalHerd
              herds={herdsDictionary}
              departments={departmentDictionary}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
