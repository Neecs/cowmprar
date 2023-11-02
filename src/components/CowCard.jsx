import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/cowCard.css";

export const CowCard = ({ cow, razes }) => {
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
                <td>{razes[cow.raza_vaca]}</td>
                <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                <td>{cowAge} años</td>
              </tr>
            </tbody>
          </Table>
          <Card.Link onClick={handleAddIncident}>Agregar incidente</Card.Link>
          <Card.Link href="#">Hoja de vida</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};
