import Form from "react-bootstrap/Form";
import "./incidentForm.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import { addCowIncident } from "../../../supabase/usecases/cows/update_cow.js";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIncidents } from "../../../supabase/usecases/cows/get_cow.js";

export const IncidentForm = () => {
  const navigate = useNavigate();
  const [incidentTypes, setIncidentTypes] = useState("");
  const [incidentDictionary, setIncidentDictionary] = useState({});
  const { cowId } = useParams();
  const [actualDate, setActualDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const incidents = await getIncidents();
      setIncidentDictionary(incidents);
    }
    fetchData();
    updateDate();
  }, []);

  const updateDate = () => {
    const date = new Date();
    const actualYear = date.getFullYear();
    const actualMonth = date.getMonth() + 1;
    const actualDay = date.getDate();
    setActualDate(`${actualYear}-${actualMonth}-${actualDay}`);
  };

  const handleSumbit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    const dateIn = form.dateIn.value;
    const description = form.description.value;
    const incidentName = form.incidentName.value;
    addCowIncident(incidentName, dateIn, description, cowId);
    navigate("/");
  };

  return (
    <div className="incident-form-page">
      <div className="inc-form">
        <h1>Registrar Incidente</h1>
        <Form onSubmit={handleSumbit}>
          <div className="date-in">
            <Form.Group className="mb-3" controlId="dateIn">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" max={actualDate} />
            </Form.Group>
          </div>
          <div className="text-area-des">
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                className="incident-description"
                rows={3}
              />
            </Form.Group>
          </div>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="incidentName">
              <Form.Select
                aria-label="Default select example"
                required
                value={incidentTypes}
                onChange={(e) => setIncidentTypes(e.target.value)}
              >
                <option value="">Tipo incidente</option>
                {Object.keys(incidentDictionary).map((key) => (
                  <option key={key} value={key}>
                    {incidentDictionary[key]}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecciona el sexo del Bovino.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="buttons">
            <Button type="submit" className="btn btn-dark btn-lg">
              Guardar
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
