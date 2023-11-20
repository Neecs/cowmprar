import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RemoveFromMarketplaceModal = ({ show, onHide, onConfirm, cow }) => {
    const [confirmText, setConfirmText] = useState('');
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        // Check if the entered text is equal to cow.nombre_vaca
        setCanDelete(confirmText === cow.nombre_vaca);
    }, [confirmText, cow.nombre_vaca]);

    const handleConfirm = () => {
        if (canDelete) {
            onConfirm(confirmText);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <p>{/* Text for the modal */}</p>
                <Form.Control
                    type="text"
                    placeholder="Enter cow name to confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" disabled={!canDelete} onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveFromMarketplaceModal;
