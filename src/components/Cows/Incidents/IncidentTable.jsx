/**
 * React component representing a table of incidents, displaying historical incident data.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.historials - Array of historical incident data.
 * @returns {JSX.Element} JSX representation of the IncidentTable component.
 */
import Table from "react-bootstrap/Table";
import IncidentRow from "./IncidentRow";

/**
 * @function
 * @description Functional component representing a table of incidents.
 * @param {Object} props - Component properties.
 * @param {Object[]} props.historials - Array of historical incident data.
 * @returns {JSX.Element} JSX representation of the IncidentTable component.
 */
const IncidentTable = ({ historials }) => {
  // JSX representation of the IncidentTable component
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
            <IncidentRow incident={historial.id_incidente} />
            <td>{historial.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default IncidentTable;
