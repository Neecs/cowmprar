import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableHead } from "mdb-react-ui-kit";
import {useEffect, useState} from "react";
import './marketplaceCard.css'
import {MainPage} from "../GeneralComponents/MainPage.jsx";

export const MarketplaceCard = ({ cow, razes }) => {
  useEffect(() => {
    calculateCowAge();
  }, []);

  const navigate = useNavigate();
  const [cowAge, setCowAge] = useState(0);

  const calculateCowAge = () => {
    const actualDate = new Date();
    const bornDate = new Date(Date.parse(cow.fecha_nacimiento));

    const age = actualDate.getFullYear() - bornDate.getFullYear();

    if (
        actualDate.getMonth() < bornDate.getMonth() ||
        (actualDate.getMonth() === bornDate.getMonth() &&
            actualDate.getDate() < bornDate.getDate())
    ) {
      setCowAge(age - 1);
    } else {
      setCowAge(age);
    }
  };

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
                  <th>Edad</th>
                </tr>
              </MDBTableHead>
              <tbody>
              <tr>
                <td>{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cowAge} años</td>
              </tr>
              </tbody>
            </MDBTable>
            <a className="incident-button btn btn-primary" href="/">Ver detalles</a>
            <a className="btn btn-secondary" href="contact-owner">Contactar al vendedor</a>
          </MDBCardBody>
        </MDBCard>
      </div>
  );
};