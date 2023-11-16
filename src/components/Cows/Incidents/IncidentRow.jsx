import { useState, useEffect } from "react";
import { getOneIncident } from "../../../supabase/usecases/cows/get_cow";

const IncidentRow = ({ incident }) => {
  const [incidentType, setIncidentType] = useState("");

  useEffect(() => {
    getIncident(incident);
  }, []);

  const getIncident = async (in_id) => {
    const cowIncident = await getOneIncident(in_id);
    setIncidentType(cowIncident[0].nombre_incidente);
  };

  return <td>{incidentType}</td>;
};

export default IncidentRow;
