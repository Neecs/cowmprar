import Table from "react-bootstrap/Table";
import IncidentRow from "./IncidentRow";

const IncidentTable = ({ historials }) => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo de incidente</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {historials.map((historial) => (
          <tr key={historial.id_historial}>
            <td>{historial.fecha_incidente}</td>
            <IncidentRow incident={historial.id_incidente}/>
            <td>{historial.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default IncidentTable;
