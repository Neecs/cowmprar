/**
 * React component for displaying a cow card in the marketplace.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Object} props.razes - The dictionary of cow breeds.
 * @param {Object} props.cow - The cow information.
 * @param {Object} props.cowshv - The cow's health and vaccination information.
 * @param {Object} props.seller - The seller's information.
 * @returns {JSX.Element} JSX representation of the MarketplaceCard component.
 */
import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
} from "mdb-react-ui-kit";
import "./marketplaceCard.css";
import ModalMarketplace from "../Modal/ModalMarketplace.jsx";

/**
 * @function
 * @description Functional component for displaying a cow card in the marketplace.
 * @param {Object} props - The properties of the component.
 * @param {Object} props.razes - The dictionary of cow breeds.
 * @param {Object} props.cow - The cow information.
 * @param {Object} props.cowshv - The cow's health and vaccination information.
 * @param {Object} props.seller - The seller's information.
 * @returns {JSX.Element} JSX representation of the MarketplaceCard component.
 */
export const MarketplaceCard = ({ razes, cow, cowshv, seller }) => {
  // State to manage the modal visibility and cow age
  const [modalShow, setModalShow] = useState(false);
  const [cowAge, setCowAge] = useState(0);

  /**
   * @function
   * @description Calculates the age of the cow based on its birthdate.
   */
  const calculateCowAge = () => {
    const actualDate = new Date();
    const bornDate = new Date(Date.parse(cow.fecha_nacimiento));

    const ageInYears = actualDate.getFullYear() - bornDate.getFullYear();
    const ageInMonths = actualDate.getMonth() - bornDate.getMonth();
    const ageInDays = actualDate.getDate() - bornDate.getDate();

    if (ageInYears > 0) {
      setCowAge(`${ageInYears} ${ageInYears === 1 ? "año" : "años"}`);
    } else if (ageInMonths > 0) {
      setCowAge(`${ageInMonths} ${ageInMonths === 1 ? "mes" : "meses"}`);
    } else {
      setCowAge(`${ageInDays} ${ageInDays === 1 ? "día" : "días"}`);
    }
  };

  // Calculate cow age when the component mounts
  useEffect(() => {
    calculateCowAge();
  }, []);

  // JSX representation of the MarketplaceCard component
  return (
    <div className="horizontal-cow-card-marketplace">
      <MDBCard className="marketplace-card-cow rounded h-100" style={{ width: "18rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{cow.nombre_vaca}</MDBCardTitle>
          <MDBTable className="tableCow striped bordered hover">
            <MDBTableHead>
              <tr>
                <th>Raza</th>
                <th>Género</th>
                <th>Edad</th>
              </tr>
            </MDBTableHead>
            <tbody>
              <tr>
                <td id="cow-raze">{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cowAge}</td>
              </tr>
            </tbody>
          </MDBTable>
          <div className="markteplace-card-button-container">
            <a className="marketplace-seller-button btn btn-primary">
              Contactar al vendedor
            </a>
            <a
              className="marketplace-more-info-button btn btn-secondary"
              onClick={() => setModalShow(true)}
            >
              Más información
            </a>
          </div>
          <ModalMarketplace
            cow={cow}
            cowshv={cowshv}
            seller={seller}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default MarketplaceCard;
