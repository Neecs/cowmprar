/**
 * React component for displaying the detailed information about a cow in a modal.
 * Allows users to view and edit the color, herd, and incidents associated with a cow.
 * Provides options to add or remove the cow from the marketplace.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.cow - The cow object containing information like name, birthdate, and marketplace status.
 * @param {Array} props.cowshv - An array of cow health and vital information.
 * @param {Array} props.cowherds - An array of cow herds.
 * @returns {JSX.Element} JSX representation of the cow's modal.
 */
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
} from "../../../supabase/usecases/cows/update_cow.js";

/**
 * @function
 * @description Functional component representing the modal for displaying detailed cow information.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} JSX representation of the cow's modal.
 */
const ModalCV = (props) => {
  // State for storing health and vital information of the cow
  const [cowHV, setCowHV] = useState({});

  // State for storing the name of the herd associated with the cow
  const [herd, setHerd] = useState("No tiene hato");

  // State for storing the department information of the cow's herd
  const [cowDepartment, setCowDepartment] = useState(null);

  // State for storing the historical incident data of the cow
  const [cowHistorials, setCowHistorials] = useState([]);

  // States for controlling the visibility of the add and remove from marketplace modals
  const [showAddToMarketplaceModal, setShowAddToMarketplaceModal] =
    useState(false);
  const [showRemoveFromMarketplaceModal, setShowRemoveFromMarketplaceModal] =
    useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to fetch department information based on department ID
  const getDepartment = async (id_departamento) => {
    const department = await getOneDepartment(id_departamento);
    setCowDepartment(department[0]?.nombre_departamento || null);
  };

  // Function to fetch historical incident data based on cow's health and vital ID
  const getCowHistorial = async (id_hv) => {
    const historials = await getHistorials(id_hv);
    setCowHistorials(historials);
  };

  // Effect hook to filter and update relevant cow information when props change
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

  // Function to determine the action to be performed based on the marketplace status of the cow
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

  // Function to get the appropriate text for the marketplace button
  const getCowInMarketplaceStatus = () =>
    props.cow.marketplace
      ? "Remove cow from marketplace"
      : "Add cow to marketplace";

  // Function to get the appropriate variant for the marketplace button
  const getCowMarketplace = () => (props.cow.marketplace ? "danger" : "success");

  // Function to handle the edit health and vital information action
  const handleEditHV = () => {
    navigate(`/hv-cow/${props.cow.id_vaca}`);
  };

  // Function to handle adding the cow to the marketplace
  const handleAddToMarketplace = () => {
    addCowToMarketplace(props.cow.id_vaca);
    setShowAddToMarketplaceModal(false);
  };

  // Function to handle removing the cow from the marketplace
  const handleRemoveFromMarketplace = () => {
    removeCowInMarketplace(props.cow.id_vaca);
    setShowRemoveFromMarketplaceModal(false);
  };

  return (
    <>
      {/* Main Cow Modal */}
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
          <Button onClick={handleEditHV}>Edit Health and Vital Information</Button>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: "flex", gap: "500px" }}>
            <Button variant="danger">Delete</Button>
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
