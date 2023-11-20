/**
 * React component for displaying information about a cow.
 * Includes details such as name, breed, gender, and age.
 * Allows adding incidents and viewing the cow's profile.
 */
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

/**
 * @component
 * @description Functional component for displaying information about a cow.
 * @param {Object} cow - The cow object containing details like name, breed, gender, and birthdate.
 * @param {Object} razes - An object mapping breed IDs to breed names.
 * @param {Object} cowshv - Additional details about the cow.
 * @param {Object} herds - Information about the herds to which the cow belongs.
 * @returns {JSX.Element} JSX representation of the cow information card.
 */
export const CowCard = ({ cow, razes, cowshv, herds }) => {


  /**
   * Effect hook to calculate the cow's age on component mount.
   */
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

    const ageInYears = actualDate.getFullYear() - bornDate.getFullYear();
    const ageInMonths = actualDate.getMonth() - bornDate.getMonth();
    const ageInDays = actualDate.getDate() - bornDate.getDate();

    if (ageInYears > 0) {
      // If age is greater than 0 years, display the years
      setCowAge(ageInYears === 1 ? `${ageInYears} year` : `${ageInYears} years`);
    } else if (ageInMonths > 0) {
      // If age is 0 years but months are greater than 0, display the months
      setCowAge(ageInMonths === 1 ? `${ageInMonths} month` : `${ageInMonths} months`);
    } else {
      // If age is 0 years and 0 months, display the days
      setCowAge(ageInDays === 1 ? `${ageInDays} day` : `${ageInDays} days`);
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

  /**
   * Handles the navigation to the incident registration page for the cow.
   */
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
                <th>edad</th>
              </tr>
            </MDBTableHead>
            <tbody>
              <tr>
                <td>{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Male" : "Female"}</td>
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
