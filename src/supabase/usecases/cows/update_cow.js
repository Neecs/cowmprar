import {
  updateCowHV,
  addIncident,
  addHerdLocation,
  updateCowStatus,
} from "../../data/supabase/supabase_querys.js";

export const updateHV = async (color, id_hato, id_hv) => {
  return await updateCowHV(color, id_hato, id_hv);
};

export const updateStatus = async (id_vaca, health_status) => {
  return await updateCowStatus(id_vaca, health_status);
};

export const addCowIncident = async (name, dateIn, description, cowId) => {
  return await addIncident(name, dateIn, description, cowId);
};

export const addHerd = async (nombre_hato, id_departamento) => {
  return await addHerdLocation(nombre_hato, id_departamento);
};
