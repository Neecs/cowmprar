import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { addHerd } from "../../../supabase/usecases/cows/update_cow";

const ModalHerd = (props) => {
  const [validated] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const addNewHerd = async (nombre_hato, id_departamento) => {
    await addHerd(nombre_hato, id_departamento);
  };

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
          Agrega un nuevo hato
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Ingresa Información del hato</p>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} md="3" controlId="department">
            <Form.Select
              aria-label="Default select example"
              required
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Selecciona departamento</option>
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
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Nombre del hato</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button type="submit">Guardar Hato</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHerd;
