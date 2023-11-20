import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { markInactiveCow } from "../../../supabase/data/supabase/supabase_querys.js";

const DeleteCowModal = (props) => {
  const deleteOneCow = async (id_vaca) => {
    await markInactiveCow(id_vaca);
  };

  const onDeleteButton = () => {
    deleteOneCow(props.cow.id_vaca);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación de eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Deseas eliminar a {props.cow.nombre_vaca}?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onDeleteButton}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCowModal;
