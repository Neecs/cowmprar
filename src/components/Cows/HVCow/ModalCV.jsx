import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOneDepartment } from "../../../supabase/usecases/cows/get_cow";
import { getHistorials } from "../../../supabase/usecases/cows/get_cow";
import IncidentTable from "../Incidents/IncidentTable";
import AddToMarketplaceModal from "./HandleOnMarketplace/AddCowToMarketplace.jsx";
import RemoveFromMarketplaceModal from "./HandleOnMarketplace/RemoveCowFromMarketplace.jsx";
import {
  addCowToMarketplace,
  removeCowInMarketplace,
  deleteCow,
} from "../../../supabase/usecases/cows/update_cow.js";
import { markInactiveCow } from "../../../supabase/data/supabase/supabase_querys.js";

const ModalCV = (props) => {
  const [cowHV, setCowHV] = useState({});
  const [herd, setHerd] = useState("No tiene hato");
  const [cowDepartment, setCowDepartment] = useState(null);
  const [cowHistorials, setCowHistorials] = useState([]);
  const [showAddToMarketplaceModal, setShowAddToMarketplaceModal] =
    useState(false);
  const [showRemoveFromMarketplaceModal, setShowRemoveFromMarketplaceModal] =
    useState(false);

  const navigate = useNavigate();

  const getDepartment = async (id_departamento) => {
    const department = await getOneDepartment(id_departamento);
    setCowDepartment(department[0]?.nombre_departamento || null);
  };

  const getCowHistorial = async (id_hv) => {
    const historials = await getHistorials(id_hv);
    setCowHistorials(historials);
  };

  const deleteOneCow = async (id_vaca) => {
    await markInactiveCow(id_vaca);
  };

  const onDeleteButton = () => {
    deleteOneCow(props.cow.id_vaca);
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
          <h3>Incidentes</h3>
          <IncidentTable historials={cowHistorials} />
          <Button onClick={handleEditHV}>Editar hoja de vida</Button>
        </Modal.Body>
        {/* Main Modal Content */}
        <Modal.Footer>
          <div style={{ display: "flex", gap: "500px" }}>
            <Button variant="danger" onClick={onDeleteButton}>
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
    </>
  );
};

export default ModalCV;
