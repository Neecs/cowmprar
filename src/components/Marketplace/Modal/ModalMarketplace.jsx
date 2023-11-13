import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EmailButton from "../Cards/Contact/EmailButton.jsx";
import WhatsappButton from "../Cards/Contact/WhatsappButton.jsx";

export const ModalMarketplace = (props) => {
  const [cowHV, setCowHV] = useState([]);
  const [seller, setSeller] = useState([])

  const filterData = () => {
    const cowsHV = props.cowshv;
    const sellers = props.seller;

// Filtering out null values and extracting telefono_persona values
    const telefonoNumbers = sellers
        .filter(seller => seller.telefono_persona !== null)
        .map(seller => seller.telefono_persona);

// Logging the result
    console.log(telefonoNumbers);
    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );
    const filteredSeller = sellers.filter(
        (sell) => sell.id_rol === 2
    )
    const selectedCow = filteredHV[0];
    const selectedSeller = filteredSeller[0]
    setCowHV(selectedCow);
    setSeller(selectedSeller)
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
        <p>Color: {cowHV.color}</p>
        {seller}
        <p>Ultimo incidente: </p>
        <p>Fecha de nacimiento: {props.cow.fecha_nacimiento}</p>
        <p>{props.cow.health_status}</p>
        <Button>Editar hoja de vida</Button>
      </Modal.Body>
      <Modal.Footer>
        <EmailButton/>
        <WhatsappButton/>
        Or write me directly on {props.seller}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalMarketplace;
