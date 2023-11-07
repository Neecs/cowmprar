import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cowCard.css";
import {MDBCard, MDBCardBody, MDBCardSubTitle, MDBCardTitle, MDBRow, MDBTable, MDBTableHead} from "mdb-react-ui-kit";

export const CowCard = ({ cow }) => {
  const navigate = useNavigate();

  const handleAddIncident = () => {
    navigate(`/inc-reg/${cow.id_vaca}`);
  };
  return (
      <div className="horizontal-cow-card rounded-5">
        <MDBCard className="cardcow  rounded" style={{ width: "18rem" }}>
          <MDBCardBody>
            <MDBCardTitle>{cow.nombre_vaca}</MDBCardTitle>
            <MDBTable className="tableCow striped bordered hover">
              <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Raza</th>
                <th>Genero</th>
                <th>Fecha</th>
              </tr>
              </MDBTableHead>
              <tbody>
              <tr>
                <td>1</td>
                <td>{cow.raza_vaca}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cow.fecha_nacimiento}</td>
              </tr>
              </tbody>
            </MDBTable>
            <a className="incident-button btn btn-primary" onClick={handleAddIncident}>Agregar incidente</a>
            <a className="btn btn-secondary" href="#">Hoja de vida</a>
          </MDBCardBody>
        </MDBCard>
      </div>
  );
};
