/**
 * React component for updating the health status and herd information of a cow.
 * Fetches cow-related data from the CowContext and allows users to modify color, health status, and herd association.
 * Includes a modal for adding a new herd.
 */
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
import { updateStatus, updateHV } from "../../../supabase/usecases/cows/update_cow";

/**
 * @component
 * @description Functional component for updating the health status and herd information of a cow.
 * @returns {JSX.Element} JSX representation of the cow's curriculum vitae form.
 */
export const FormCvCow = () => {
  // State for form validation
  const [validated] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Extracting cowId from URL parameters
  const { cowId } = useParams();

  // Retrieve cow-related data from the CowContext using useContext hook
  const { cowStatus, cowHerds, departmentsLocation } = useContext(CowContext);

  // State for selected health status and herd
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedHerd, setSelectedHerd] = useState(0);

  // State for dictionaries mapping status, herds, and departments
  const [statusDictionary, setStatusDictionary] = useState([]);
  const [herdsDictionary, setHerdsDictionary] = useState([]);
  const [departmentDictionary, setDepartmentDictionary] = useState([]);

  // State for controlling the visibility of the modal for adding a new herd
  const [modalShow, setModalShow] = useState(false);

  // Function to update the health status of a cow
  const updateHealthStatus = async (id_vaca, health_status) => {
    await updateStatus(id_vaca, health_status);
  };

  // Function to update herd information of a cow
  const updateHVData = async (color, id_hato, id_hv) => {
    await updateHV(color, id_hato, id_hv);
  };

  // Effect hook to update dictionaries when cowHerds change
  useEffect(() => {
    setStatusDictionary(cowStatus);
    setHerdsDictionary(cowHerds);
    setDepartmentDictionary(departmentsLocation);
  }, [cowHerds]);

  // Form submission handler
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const color = form.color.value;
    const status = form.status.value;
    const herd = form.herd.value;

    // Update health status and herd information
    updateHealthStatus(cowId, status);
    updateHVData(color, herd, cowId);
  };

  return (
    <div className="form-cow-cv">
      <div className="form-space-cow">
        <div className="header-title-cow">
          <h4 className="title">Curriculum Vitae</h4>
        </div>
        <div className="data-cow">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col md="3">
              <h2 className="subtitle">Information</h2>
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
                <option value="">Cow's health status</option>
                {statusDictionary.map((state) => (
                  <option key={state.id_estado} value={state.id_estado}>
                    {state.nombre_estado}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Col md="3">
              <h2 className="subtitle">Herd</h2>
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
                <option value="">Registered herds</option>
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
                  atras
                </Button>
              </Link>
              <Button
                type="button"
                className="button-common button-regresar"
                onClick={() => setModalShow(true)}
              >
                añadir nuevo hato
              </Button>
            </div>
            {/* Modal for adding a new herd */}
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
