import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "./cowCard.css";
import ModalCV from "../HVCow/ModalCV";

export const CowCard = ({ cow, razes, cowshv, herds }) => {
  useEffect(() => {
    calculateCowAge();
    setStatusColorText();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [cowAge, setCowAge] = useState(0);
  const [statusColor, setStatusColor] = useState("");

  const calculateCowAge = () => {
    const actualDate = new Date();
    const bornDate = new Date(Date.parse(cow.fecha_nacimiento));
    console.log(cow);

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
  const setStatusColorText = () => {
    if (cow.healt_status === 1) {
      setStatusColor("yellow");
    } else if (cow.healt_status === 2) {
      setStatusColor("orange");
    } else if (cow.healt_status === 3) {
      setStatusColor("red");
    } else if (cow.healt_status === 4) {
      setStatusColor("green");
    }
  };

  const handleAddIncident = () => {
    navigate(`/inc-reg/${cow.id_vaca}`);
  };

  return (
    <div className="horizontal-cow-card-group">
      <MDBCard className="card-cow rounded">
        <MDBCardBody>
          <MDBCardTitle>
            {cow.nombre_vaca}
            <br />
            <br />
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: statusColor,
                borderRadius: "50%",
              }}
            ></div>
          </MDBCardTitle>
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
                <td>{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cowAge}</td>
              </tr>
            </tbody>
          </MDBTable>
          <div className="card-button-container">
            <a
              className="incident-button btn btn-primary"
              onClick={handleAddIncident}
            >
              Agregar incidente
            </a>
            <a
              className="hv-button btn btn-secondary"
              onClick={() => setModalShow(true)}
            >
              Hoja de vida
            </a>
          </div>

          <ModalCV
            cow={cow}
            cowshv={cowshv}
            show={modalShow}
            cowstatus={cow.healt_status}
            cowherds={herds}
            onHide={() => setModalShow(false)}
          />
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
