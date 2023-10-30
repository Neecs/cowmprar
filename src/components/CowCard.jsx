import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cowCard.css";

export const CowCard = ({ cow }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const currentDate = new Date();
  // eslint-disable-next-line react/prop-types
  const birthDate = new Date(cow.fecha_nacimiento);

  const ageInMilliseconds = currentDate - birthDate;

  const ageInYears =Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

  const handleAddIncident = () => {
    navigate(`/inc-reg/${cow.id_vaca}`);
  };
  return (
      <div className="horizontal-cow-card">
        <Card className="cardcow" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{cow.nombre_vaca}</Card.Title>
            <Table striped bordered hover className="tableCow">
              <thead>
              <tr>
                <th>#</th>
                <th>Raza</th>
                <th>Genero</th>
                <th>Edad</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>{cow.raza_vaca}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{ageInYears} Año</td>
              </tr>
              </tbody>
            </Table>
            <Card.Link onClick={handleAddIncident}>Agregar incidente</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
  );
};
