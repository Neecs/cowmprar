/**
 * React component representing a row in an incident table. Displays the incident type.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.incident - Incident data.
 * @returns {JSX.Element} JSX representation of the IncidentRow component.
 */
import { useState, useEffect } from "react";
import { getOneIncident } from "../../../supabase/usecases/cows/get_cow";

/**
 * @function
 * @description Functional component representing a row in an incident table.
 * @param {Object} props - Component properties.
 * @param {Object} props.incident - Incident data.
 * @returns {JSX.Element} JSX representation of the IncidentRow component.
 */
const IncidentRow = ({ incident }) => {
  // State for storing the incident type
  const [incidentType, setIncidentType] = useState("");

  // useEffect to fetch incident type on component mount
  useEffect(() => {
    getIncident(incident);
  }, []);

  /**
   * Function to get incident type from the backend.
   * @async
   * @function
   * @param {string} in_id - Incident ID.
   * @returns {Promise<void>} A Promise that resolves when the incident type is retrieved.
   */
  const getIncident = async (in_id) => {
    const cowIncident = await getOneIncident(in_id);
    setIncidentType(cowIncident[0]?.nombre_incidente || "");
  };

  // JSX representation of the IncidentRow component
  return <td>{incidentType}</td>;
};

export default IncidentRow;
