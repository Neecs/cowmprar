import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";

// Modal for adding cow to the marketplace
const AddToMarketplaceModal = ({ show, onHide, onConfirm }) => {
    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);

    const handleConfirm = () => {
        if (description.trim().length !== 0) {
            setValidDescription(true)
            onConfirm(description)
        } else {
            setValidDescription(false)
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <p>Por favor ingresa una descripción para agregar la vaca al Marketplace</p>
                <Form.Control
                    value={description}
                    as="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    isInvalid={!validDescription}
                />
                <Form.Control.Feedback type='invalid'>
                    La descripción no puede ir vacia
                </Form.Control.Feedback>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                   Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                   Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default AddToMarketplaceModal;