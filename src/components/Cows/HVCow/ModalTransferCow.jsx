import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { transferCow } from "../../../supabase/usecases/cows/update_cow.js";

const ModalTransferCow = (props) => {
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  const setNewUser = async (id_user, id_vaca) => {
    await transferCow(id_user, id_vaca);
  };

  const handleConfirm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const userId = form.userId.value;
    if (userId !== "") {
      setNewUser(userId, props.cow.id_vaca);
    }
  };
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Body>
        <p>
          Por favor ingresa una el id del usuario al que quieres transferir la
          vaca
        </p>
        <Form noValidate validated={true} onSubmit={handleConfirm}>
          <Form.Group md="3" controlId="userId">
            <Form.Control
              value={description}
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!validDescription}
            />
            <Form.Control.Feedback type="invalid">
              El id no puede ir vacío
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTransferCow;
