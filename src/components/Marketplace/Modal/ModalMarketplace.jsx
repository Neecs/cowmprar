import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EmailButton from "../Cards/Contact/EmailButton.jsx";
import WhatsappButton from "../Cards/Contact/WhatsappButton.jsx";
import {
  getUserPhone,
  getUserEmail,
} from "../../../supabase/usecases/cows/get_cow.js";
import { getEmail } from "../../../supabase/data/supabase/supabase_querys.js";

export const ModalMarketplace = (props) => {
  const [cowHV, setCowHV] = useState([]);
  const [seller, setSeller] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [sellerEmail, setSellerEmail] = useState([]);

  const setOwnerPhone = async (id_user) => {
    const phone = await getUserPhone(id_user);
    console.log(phone[0].telefono_persona);
    setPhoneNumber(phone[0].telefono_persona);
  };

  const setOwnerEmail = async (id_user) => {
    const email = await getEmail(id_user);
    console.log(email[0].email_persona);
    setSellerEmail(email[0].email_persona);
  };

  const filterData = () => {
    const cowsHV = props.cowshv;
    console.log(props.cowshv);

    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );
    const selectedCow = filteredHV[0];
    setCowHV(selectedCow);

    setOwnerPhone(props.cow.userId);
    setOwnerEmail(props.cow.userId);
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
        <p>Fecha de nacimiento: {props.cow.fecha_nacimiento}</p>
        <p>{props.cow.health_status}</p>
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
