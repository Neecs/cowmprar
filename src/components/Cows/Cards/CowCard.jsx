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
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State for controlling the visibility of the modal
  const [modalShow, setModalShow] = useState(false);

  // State for storing calculated cow age
  const [cowAge, setCowAge] = useState(0);

  /**
   * Effect hook to calculate the cow's age on component mount.
   */
  useEffect(() => {
    calculateCowAge();
  }, []);

  /**
   * Calculates and sets the cow's age based on its birthdate.
   */
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

  /**
   * Handles the navigation to the incident registration page for the cow.
   */
  const handleAddIncident = () => {
    navigate(`/inc-reg/${cow.id_vaca}`);
  };

  return (
    <div className="horizontal-cow-card">
      <MDBCard className="cardcow rounded" style={{ width: "18rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{cow.nombre_vaca}</MDBCardTitle>
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
          <a
            className="incident-button btn btn-primary"
            onClick={handleAddIncident}
          >
            Add Incident
          </a>
          <a className="btn btn-secondary" onClick={() => setModalShow(true)}>
            Profile
          </a>
          <ModalCV
            cow={cow}
            cowshv={cowshv}
            show={modalShow}
            cowherds={herds}
            onHide={() => setModalShow(false)}
          />
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
