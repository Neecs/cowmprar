import {
  updateCowHV,
  addIncident,
  addHerdLocation,
  updateCowStatus,
  addMarketplaceCow, removeCowFromMarketplace
} from "../../data/supabase/supabase_querys.js";

export const updateHV = async (color, id_hato, id_hv) => {
  return await updateCowHV(color, id_hato, id_hv);
};

export const updateStatus = async (id_vaca, health_status) => {
  return await updateCowStatus(id_vaca, health_status);
};

export const addCowIncident = async (nameIn, dateIn, description, cowId) => {
  return await addIncident(nameIn, dateIn, description, cowId);
};

export const addHerd = async (nombre_hato, id_departamento) => {
  return await addHerdLocation(nombre_hato, id_departamento);
};

export const addCowToMarketplace = async (id_vaca) => {
  return await addMarketplaceCow(id_vaca);
}

export const removeCowInMarketplace = async (id_vaca) => {
  return await removeCowFromMarketplace(id_vaca);
}