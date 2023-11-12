import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalCV = (props) => {
  const [cowHV, setCowHV] = useState([]);
  const navigate = useNavigate();

  const filterData = () => {
    const cowsHV = props.cowshv;
    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );
    console.log("filtrado", filteredHV[0]);
    setCowHV(filteredHV[0]);
  };
  useEffect(() => {
    filterData();
    console.log(cowHV);
    console.log(props.cowshv);
  }, []);

  const handleEditHV = () => {
    navigate(`/hv-cow/${props.cow.id_vaca}`);
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
          {props.cow.nombre_vaca}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Color: {cowHV.color}</p>
        <p>asd</p>

        <Button onClick={handleEditHV}>Editar hoja de vida</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCV;
