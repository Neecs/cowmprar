/**
 * React component for the Marketplace modal.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the ModalMarketplace component.
 */
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EmailButton from "../Cards/Contact/EmailButton.jsx";
import WhatsappButton from "../Cards/Contact/WhatsappButton.jsx";

/**
 * @function
 * @description Functional component for the Marketplace modal.
 * @param {Object} props - Props for the component.
 * @param {Object} props.cow - Cow object for which the modal is displayed.
 * @param {Array} props.cowshv - List of cow health and vaccination records.
 * @param {Array} props.seller - List of sellers.
 * @returns {JSX.Element} JSX representation of the ModalMarketplace component.
 */
export const ModalMarketplace = (props) => {
  // State variables
  const [cowHV, setCowHV] = useState([]);
  const [seller, setSeller] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [sellerEmail, setSellerEmail] = useState([]);

  /**
   * @function
   * @description Filters and sets the data needed for the modal.
   */
  const filterData = () => {
    const cowsHV = props.cowshv;
    const allSellers = props.seller;

    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );
    const selectedCow = filteredHV[0];
    setCowHV(selectedCow);

    allSellers.forEach((sel) => {
      if (selectedCow.id_persona != null && sel.telefono_persona != null) {
        if (sel.user_id === selectedCow.id_persona) {
          setSeller(sel.user_id);
          setPhoneNumber(sel.telefono_persona);
          setSellerEmail(sel.email_persona);
        }
      }
    });
  };

  // useEffect to filter data when component mounts
  useEffect(() => {
    filterData();
  }, []);

  // JSX representation of the ModalMarketplace component
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
        {/* Utilize the EmailButton and WhatsappButton components with respective props */}
        <EmailButton sellerEmail={sellerEmail} />
        <WhatsappButton sellerPhoneNumber={phoneNumber} />
        Or write me directly on {phoneNumber}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMarketplace;
