/**
 * React component for displaying a form to register incidents for a cow.
 * Allows users to input incident details such as date, description, and incident type.
 * Handles the submission of incident data to update the cow's record.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the incident registration form.
 */
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

/**
 * @function
 * @description Functional component representing the incident registration form.
 * @returns {JSX.Element} JSX representation of the incident registration form.
 */
export const IncidentForm = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // State for storing incident types
  const [incidentTypes, setIncidentTypes] = useState("");

  // State for storing incident dictionary
  const [incidentDictionary, setIncidentDictionary] = useState({});

  // React Router hook for accessing URL parameters
  const { cowId } = useParams();

  // State for storing the current date
  const [actualDate, setActualDate] = useState(null);

  // useEffect to fetch incident types and update date on component mount
  useEffect(() => {
    async function fetchData() {
      const incidents = await getIncidents();
      setIncidentDictionary(incidents);
    }
    fetchData();
    updateDate();
  }, []);

  // Function to update the current date
  const updateDate = () => {
    const date = new Date();
    const actualYear = date.getFullYear();
    const actualMonth = date.getMonth() + 1;
    const actualDay = date.getDate();
    setActualDate(`${actualYear}-${actualMonth}-${actualDay}`);
  };

  // Function to handle form submission
  const handleSumbit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    const dateIn = form.dateIn.value;
    const description = form.description.value;
    const incidentName = form.incidentName.value;
    addCowIncident(incidentName, dateIn, description, cowId);
    navigate("/");
  };

  // JSX representation of the incident registration form
  return (
    <div className="incident-form-page">
      <div className="inc-form">
        <h1>Registrar Incidente</h1>
        <Form onSubmit={handleSumbit}>
          {/* Date Input */}
          <div className="date-in">
            <Form.Group className="mb-3" controlId="dateIn">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" max={actualDate} />
            </Form.Group>
          </div>

          {/* Description Textarea */}
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

          {/* Incident Type Dropdown */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="incidentName">
              <Form.Select
                aria-label="Default select example"
                required
                value={incidentTypes}
                onChange={(e) => setIncidentTypes(e.target.value)}
              >
                <option value="">Incident Type</option>
                {Object.keys(incidentDictionary).map((key) => (
                  <option key={key} value={key}>
                    {incidentDictionary[key]}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select the incident type.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* Form Buttons */}
          <div className="buttons">
            <Button type="submit" className="btn btn-dark btn-lg">
              Save
            </Button>
            <span style={{ marginRight: "10px" }}></span>
            <Link to="/">
              <Button type="button" className="btn btn-dark btn-lg">
                Back
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
