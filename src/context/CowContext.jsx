import { createContext } from "react";
import {
  getCowsByUser,
  getRazes,
  getCowHV,
  getStatus,
  getGenders,
} from "../supabase/usecases/cows/get_cow";
import { supabase } from "../supabase/data/constants/api_credentials";
import { useState, useEffect } from "react";

export const CowContext = createContext();

export const CowContextProvider = (props) => {
  const [cowsData, setCowsData] = useState([]);
  const [cowsRazes, setCowsRazes] = useState([]);
  const [cowsHV, setCowsHV] = useState([]);
  const [cowStatus, setCowStatus] = useState([]);
  const [cowGenders, setCowGenders] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session !== null) {
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

    setCowsRazes(razes);
    setCowsData(data);
    setCowsHV(hvCows);
    setCowStatus(status);
    setCowGenders(genders);
  };

  return (
    <CowContext.Provider
      value={{ cowsData, cowsRazes, cowsHV, cowStatus, cowGenders }}
    >
      {props.children}
    </CowContext.Provider>
  );
};
