import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOneDepartment,
  getCowStatusName,
} from "../../../supabase/usecases/cows/get_cow";
import { getHistorials } from "../../../supabase/usecases/cows/get_cow";
import IncidentTable from "../Incidents/IncidentTable";
import AddToMarketplaceModal from "./HandleOnMarketplace/AddCowToMarketplace.jsx";
import RemoveFromMarketplaceModal from "./HandleOnMarketplace/RemoveCowFromMarketplace.jsx";
import {
  addCowToMarketplace,
  removeCowInMarketplace,
  transferCow,
} from "../../../supabase/usecases/cows/update_cow.js";
import DeleteCowModal from "./DeleteCowModal.jsx";
import ModalTransferCow from "../HVCow/ModalTransferCow.jsx";

const ModalCV = (props) => {
  const [cowHV, setCowHV] = useState({});
  const [herd, setHerd] = useState("No tiene hato");
  const [cowDepartment, setCowDepartment] = useState(null);
  const [cowHistorials, setCowHistorials] = useState([]);
  const [showAddToMarketplaceModal, setShowAddToMarketplaceModal] =
    useState(false);
  const [showRemoveFromMarketplaceModal, setShowRemoveFromMarketplaceModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [cowHealthStatus, setCowHealthStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);

  const setStatusColorText = () => {
    if (props.cowstatus === 1) {
      setStatusColor("yellow");
    } else if (props.cowstatus === 2) {
      setStatusColor("orange");
    } else if (props.cowstatus === 3) {
      setStatusColor("red");
    } else if (props.cowstatus === 4) {
      setStatusColor("green");
    }
  };

  const getDepartment = async (id_departamento) => {
    const department = await getOneDepartment(id_departamento);
    setCowDepartment(department[0]?.nombre_departamento || null);
  };

  const getCowHistorial = async (id_hv) => {
    const historials = await getHistorials(id_hv);
    setCowHistorials(historials);
  };

  const getCowHealthStatus = async (id_vaca) => {
    const healthStatus = await getCowStatusName(id_vaca);
    setCowHealthStatus(healthStatus[0].nombre_estado);
  };

  useEffect(() => {
    const filterData = () => {
      const cowsHV = props.cowshv;
      const cowsHerds = props.cowherds;
      const filteredHV = cowsHV.find(
        (cowhv) => cowhv.id_hoja_vida === props.cow.id_vaca
      );

      if (filteredHV) {
        const filteredHerd = cowsHerds.find(
          (herd) => herd.id_hato === filteredHV.id_hato
        );

        if (filteredHerd) {
          setHerd(filteredHerd.nombre_hato);
          getDepartment(filteredHerd.id_departamento);
        }
      }

      setCowHV(filteredHV || {});
      getCowHistorial(filteredHV?.id_hoja_vida);
    };

    filterData();
    getCowHealthStatus(props.cowstatus);
    setStatusColorText();
  }, [props.cow, props.cowshv, props.cowherds]);

  const getCowInMarketplaceStatus = () => {
    return props.cow.marketplace
      ? "Eliminar la vaca de marketplace"
      : "Añadir la vaca a marketplace";
  };

  const getCowMarketplace = () =>
    props.cow.marketplace ? "danger" : "success";

  const handleEditHV = () => {
    navigate(`/hv-cow/${props.cow.id_vaca}`);
  };

  const handleAddToMarketplace = () => {
    addCowToMarketplace(props.cow.id_vaca);
    setShowAddToMarketplaceModal(false);
  };

  const handleRemoveFromMarketplace = () => {
    removeCowInMarketplace(props.cow.id_vaca);
    setShowRemoveFromMarketplaceModal(false);
  };

  const chooseWhatToShow = () => {
    switch (props.cow.marketplace) {
      case true:
        setShowRemoveFromMarketplaceModal(true);
        break;
      case false:
        setShowAddToMarketplaceModal(true);
        break;
      default:
        setShowAddToMarketplaceModal(true);
        break;
    }
  };

  return (
    <>
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
            {cowDepartment === null
              ? "No se ha registrado hato"
              : cowDepartment}
          </p>
          <p>Fecha de nacimiento: {props.cow.fecha_nacimiento}</p>
          <div
            style={{
              backgroundColor: statusColor,
              padding: "5px",
              borderRadius: "6px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              margin: "10px",
            }}
          >
            <p>Estado de salud: {cowHealthStatus}</p>
          </div>
          <h3>Incidentes</h3>
          <IncidentTable historials={cowHistorials} />
          <Button onClick={handleEditHV}>Editar hoja de vida</Button>
        </Modal.Body>
        <Button
          onClick={() => setShowTransferModal(true)}
          variant={getCowMarketplace()}
          id="marketplace-button"
        >
          Transferir vaca
        </Button>
        <Modal.Footer>
          <div style={{ display: "flex", gap: "500px" }}>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Eliminar
            </Button>
            <Button
              onClick={() => chooseWhatToShow()}
              variant={getCowMarketplace()}
              id="marketplace-button"
            >
              {getCowInMarketplaceStatus()}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Add to Marketplace Modal */}
      <AddToMarketplaceModal
        show={showAddToMarketplaceModal}
        onHide={() => setShowAddToMarketplaceModal(false)}
        onConfirm={handleAddToMarketplace}
      />

      {/* Remove from Marketplace Modal */}
      {showRemoveFromMarketplaceModal && (
        <RemoveFromMarketplaceModal
          show={showRemoveFromMarketplaceModal}
          onHide={() => setShowRemoveFromMarketplaceModal(false)}
          onConfirm={handleRemoveFromMarketplace}
          cow={props.cow}
        />
      )}
      <ModalTransferCow
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        cow={props.cow}
      />
      <DeleteCowModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        cow={props.cow}
      />
    </>
  );
};

export default ModalCV;
