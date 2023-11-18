import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOneDepartment } from "../../../supabase/usecases/cows/get_cow";
import { getHistorials } from "../../../supabase/usecases/cows/get_cow";
import IncidentTable from "../Incidents/IncidentTable";

const ModalCV = (props) => {
  const [cowHV, setCowHV] = useState([]);
  const [herd, setHerd] = useState("");
  const [cowDepartment, setCowDepartment] = useState("");
  const [cowHistorials, setCowHistorials] = useState([]);
  const navigate = useNavigate();

  const getDepartment = async (id_departamento) => {
    const department = await getOneDepartment(id_departamento);
    setCowDepartment(department[0].nombre_departamento);
  };

  const getCowHistorial = async (id_hv) => {
    const historials = await getHistorials(id_hv);
    setCowHistorials(historials);
  };

  const filterData = () => {
    const cowsHV = props.cowshv;
    const cowsHerds = props.cowherds;
    console.log(cowsHerds);
    const filteredHV = cowsHV.filter(
      (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
    );

    console.log(filteredHV);
    const filteredHerd = cowsHerds.filter(
      (herd) => herd.id_hato === filteredHV[0].id_hato
    );
    if (
      filteredHerd[0].id_departamento === null ||
      filteredHerd[0].id_departamento === undefined
    ) {
      setHerd("No tiene hato");
    } else {
      setHerd(filteredHerd[0].nombre_hato);
      getDepartment(filteredHerd[0].id_departamento);
    }
    getDepartment(filteredHerd[0].id_departamento);
    console.log(filteredHerd[0].nombre_hato);
    console.log("filtrado", filteredHV[0]);
    setCowHV(filteredHV[0]);
    getCowHistorial(filteredHV[0].id_hoja_vida);
    setHerd(filteredHerd[0].nombre_hato);
    setCowDepartment();
  };
  useEffect(() => {
    filterData();
  }, []);

  const handleEditHV = () => {
    navigate(`/hv-cow/${props.cow.id_vaca}`);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {props.cow.nombre_vaca}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Color: {cowHV.color}</p>
        <p>
          Hato: {herd},{" "}
          {cowDepartment === null ? "No se ha registrado hato" : cowDepartment}
        </p>
        <h3>Incidentes</h3>
        <IncidentTable historials={cowHistorials} />
        <Button onClick={handleEditHV}>Editar hoja de vida</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCV;
