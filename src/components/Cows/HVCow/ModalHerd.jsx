/**
 * React component for displaying a modal to add a new herd.
 * Allows users to input information such as department and herd name.
 * Handles the submission of the new herd data.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.departments - An array of departments for users to select from.
 * @param {boolean} props.show - Controls the visibility of the modal.
 * @param {function} props.onHide - Callback function to handle closing the modal.
 * @returns {JSX.Element} JSX representation of the modal to add a new herd.
 */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { addHerd } from "../../../supabase/usecases/cows/update_cow";

/**
 * @function
 * @description Functional component representing the modal to add a new herd.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} JSX representation of the modal to add a new herd.
 */
const ModalHerd = (props) => {
  // State for controlling form validation
  const [validated] = useState(false);

  // State for storing the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  // Function to add a new herd with the provided information
  const addNewHerd = async (nombre_hato, id_departamento) => {
    await addHerd(nombre_hato, id_departamento);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const department = form.department.value;
    const description = form.description.value;
    addNewHerd(description, department);
    event.preventDefault();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Herd
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter Herd Information</p>

        {/* Herd Form */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Department Selection */}
          <Form.Group as={Col} md="3" controlId="department">
            <Form.Select
              aria-label="Default select example"
              required
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {props.departments.map((department) => (
                <option
                  key={department.id_departamento}
                  value={department.id_departamento}
                >
                  {department.nombre_departamento}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Herd Name Input */}
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Herd Name</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit">Save Herd</Button>
        </Form>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer>
        {/* Close Button */}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHerd;
