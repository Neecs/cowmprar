import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "./marketplaceCard.css";
import ModalMarketplace from "../Modal/ModalMarketplace.jsx";

export const MarketplaceCard = ({ razes, cow, cowshv, seller}) => {
  useEffect(() => {
    calculateCowAge();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [cowAge, setCowAge] = useState(0);

  const calculateCowAge = () => {
    const actualDate = new Date();
    const bornDate = new Date(Date.parse(cow.fecha_nacimiento));

    const ageInYears = actualDate.getFullYear() - bornDate.getFullYear();
    const ageInMonths = actualDate.getMonth() - bornDate.getMonth();
    const ageInDays = actualDate.getDate() - bornDate.getDate();

    if (ageInYears > 0) {
      // Si la edad es mayor que 0 años, mostrar los años
      if (ageInYears === 1) {
        setCowAge(`${ageInYears} año`);
      } else {
        setCowAge(`${ageInYears} años`);
      }
    } else if (ageInMonths > 0) {
      // Si la edad es 0 años pero los meses son mayores que 0, mostrar los meses
      if (ageInMonths === 1) {
        setCowAge(`${ageInMonths} mes`);
      } else {
        setCowAge(`${ageInMonths} meses`);
      }
    } else {
      // Si la edad es 0 años y 0 meses, mostrar los días
      if (ageInDays === 1) {
        setCowAge(`${ageInDays} día`);
      } else {
        setCowAge(`${ageInDays} días`);
      }
    }
  };

  return (
    <div className="horizontal-cow-card">
      <MDBCard className="cardcow rounded h-100" style={{ width: "18rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{cow.nombre_vaca}</MDBCardTitle>
          <MDBTable className="tableCow striped bordered hover">
            <MDBTableHead>
              <tr>
                <th>Raza</th>
                <th>Genero</th>
                <th>Edad</th>
              </tr>
            </MDBTableHead>
            <tbody>
              <tr>
                <td id="cow-raze">{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cowAge} años</td>
              </tr>
            </tbody>
          </MDBTable>
          <a className="incident-button btn btn-primary">
            Contactar al vendedor
          </a>
          <a className="btn btn-secondary" onClick={() => setModalShow(true)}>
            Mas informacion
          </a>
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
