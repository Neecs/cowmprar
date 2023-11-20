import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EmailButton from "../Cards/Contact/EmailButton.jsx";
import WhatsappButton from "../Cards/Contact/WhatsappButton.jsx";

export const ModalMarketplace = (props) => {
  const [cowHV, setCowHV] = useState([]);
  const [seller, setSeller] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [sellerEmail, setSellerEmail] = useState([]);

  const filterData = () => {
    const cowsHV = props.cowshv;
    console.log(props.cowshv);
    const allSellers = props.seller;

    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );
    const selectedCow = filteredHV[0];
    setCowHV(selectedCow);

    allSellers.map((sel) => {
      console.log("Cow: " + selectedCow);
      console.log("Telefono: " + sel.telefono_persona);
      console.log("Email: " + sel.email_persona);
      if (selectedCow.id_persona != null && sel.telefono_persona != null) {
        if (sel.user_id === selectedCow.id_persona) {
          setSeller(sel.user_id);
          setPhoneNumber(sel.telefono_persona);
          setSellerEmail(sel.email_persona);
        }
      }
    });
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
        <p>Ultimo incidente: </p>
        <p>Fecha de nacimiento: {props.cow.fecha_nacimiento}</p>
        <p>{props.cow.health_status}</p>
        <Button>Editar hoja de vida</Button>
      </Modal.Body>
      <Modal.Footer>
        <EmailButton sellerEmail={sellerEmail} />
        <WhatsappButton sellerPhoneNumber={phoneNumber} />
        Or write me directly on {phoneNumber}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalMarketplace;
