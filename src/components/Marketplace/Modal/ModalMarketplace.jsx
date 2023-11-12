import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ModalMarketplace = (props) => {
    const [cowData, setCowData] = useState([]);
    const [cowColor, setCowColor] = useState([]);

    const filterData = () => {
        const cowsHV = props.cowshv;
        const filteredHV = cowsHV.filter(
            (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
        );
        setCowData(filteredHV[0]);
        console.log(filteredHV[0].color)
        // setCowColor(filteredHV[0].color)
    };
    useEffect(() => {
        filterData();
    }, []);

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
          <p>Color: {cowColor}</p>
          <p>Ultimo incidente: </p>
          <p>Fecha de nacimiento: {props.cow.fecha_nacimiento}</p>
          <p>{props.cow.health_status}</p>
        <Button >Editar hoja de vida</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalMarketplace;