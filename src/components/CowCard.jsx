import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "../styles/cowCard.css"

export const CowCard = ({ cow }) => {
  return (
      <div className="horizontal-cow-card">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{cow.nombre_vaca}</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Raza</th>
                  <th>Genero</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{cow.raza_vaca}</td>
                  <td>{cow.id_genero === 1 ? "Macho" : "Hembra"}</td>
                  <td>{cow.fecha_nacimiento}</td>
                </tr>
              </tbody>
            </Table>
            <Card.Link href="/inc-reg">Agregar incidente</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
  );
};
