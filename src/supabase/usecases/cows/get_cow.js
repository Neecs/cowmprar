import {
  getCowGenders,
  getCowInformation,
  getCowRazes,
  getAllCows,
  getHV,
  getUserCows,
  getIncidentTypes,
  getCowStatus,
  getHerdsPlaces,
  getDepartmentsLocation,
  getDepartmentsById,
  getHistorialsById,
  getIncidentTypeById,
} from "../../data/supabase/supabase_querys.js";

export const getCow = async (id_cow) => {
  return await getCowInformation(id_cow);
};

export const getRazes = async () => {
  return await getCowRazes();
};

export const getGenders = async () => {
  return await getCowGenders();
};

export const getIncidents = async () => {
  return await getIncidentTypes();
};

export const getAllDBCows = async () => {
  return await getAllCows();
};

export const getCowHV = async () => {
  return await getHV();
};

export const getCowsByUser = async (userId) => {
  return await getUserCows(userId);
};

export const getStatus = async () => {
  return await getCowStatus();
};

export const getHerds = async () => {
  return await getHerdsPlaces();
};

export const getDepartments = async () => {
  return await getDepartmentsLocation();
};

export const getOneDepartment = async (id_departamento) => {
  return await getDepartmentsById(id_departamento);
};

export const getHistorials = async (id_hv) => {
  return await getHistorialsById(id_hv);
};

export const getOneIncident = async (id_inc) => {
  return await getIncidentTypeById(id_inc);
};

export const getCowsInMarketplace = async() => {
  return await getAllCowsInMarketplace()
}