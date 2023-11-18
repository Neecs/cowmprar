import { createContext } from "react";
import {
  getCowsByUser,
  getRazes,
  getCowHV,
  getStatus,
  getGenders,
  getHerds,
  getDepartments,
} from "../supabase/usecases/cows/get_cow";
import { supabase } from "../supabase/data/constants/api_credentials";
import { useState, useEffect } from "react";
import { getAllSellers } from "../supabase/usecases/fetch_data.js";
import {getAllCowsInMarketplace} from "../supabase/data/supabase/supabase_querys.js";

export const CowContext = createContext();

export const CowContextProvider = (props) => {
  const [cowsData, setCowsData] = useState([]);
  const [cowsRazes, setCowsRazes] = useState([]);
  const [cowsHV, setCowsHV] = useState([]);
  const [cowStatus, setCowStatus] = useState([]);
  const [cowGenders, setCowGenders] = useState([]);
  const [cowHerds, setcowHerds] = useState([]);
  const [departmentsLocation, setDepartmentsLocation] = useState([]);
  const [dbCows, setDbCows] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session !== null && cowsData.length === 0) {
        fetchDataCows();
      }
    });
  }, [cowsData]);

  const fetchDataCows = async () => {
    const user = await supabase.auth.getUser();
    const data = await getCowsByUser(user.data.user.id);
    const razes = await getRazes();
    const hvCows = await getCowHV();
    const status = await getStatus();
    const genders = await getGenders();
    const herds = await getHerds();
    const departments = await getDepartments();
    const allCows = await getAllCowsInMarketplace();
    const allSellers = await getAllSellers();

    setCowsRazes(razes);
    setCowsData(data);
    setCowsHV(hvCows);
    setCowStatus(status);
    setCowGenders(genders);
    setcowHerds(herds);
    setDepartmentsLocation(departments);
    setDbCows(allCows);
    setSellers(allSellers);
  };

  return (
    <CowContext.Provider
      value={{
        cowsData,
        cowsRazes,
        cowsHV,
        cowStatus,
        cowGenders,
        cowHerds,
        departmentsLocation,
        dbCows,
        sellers,
      }}
    >
      {props.children}
    </CowContext.Provider>
  );
};
