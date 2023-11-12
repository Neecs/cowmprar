import { createContext } from "react";
import {
  getCowsByUser,
  getRazes,
  getCowHV,
} from "../supabase/usecases/cows/get_cow";
import { supabase } from "../supabase/data/constants/api_credentials";
import { useState, useEffect } from "react";

export const CowContext = createContext();

export const CowContextProvider = (props) => {
  const [cowsData, setCowsData] = useState([]);
  const [cowsRazes, setCowsRazes] = useState([]);
  const [cowsHV, setCowsHV] = useState([]);

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

    setCowsRazes(razes);
    setCowsData(data);
    setCowsHV(hvCows);
  };

  return (
    <CowContext.Provider value={{ cowsData, cowsRazes, cowsHV }}>
      {props.children}
    </CowContext.Provider>
  );
};
