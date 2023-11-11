import { createContext } from "react";
import {
  getCowsByUser,
  getRazes,
  
} from "../supabase/usecases/cows/get_cow";
import { supabase } from "../supabase/data/constants/api_credentials";
import { useState, useEffect } from "react";

export const CowContext = createContext();

export const CowContextProvider = (props) => {
  const [cowsData, setCowsData] = useState([]);
  const [cowsRazes, setCowsRazes] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session !== null) {
        fetchDataCows();
      }
    });
  }, []);

  const fetchDataCows = async () => {
    const user = await supabase.auth.getUser();
    const data = await getCowsByUser(user.data.user.id);
    setCowsData(data);
    const razes = await getRazes();
    setCowsRazes(razes);
  };

  

  return (
    <CowContext.Provider value={{ cowsData, cowsRazes }}>
      {props.children}
    </CowContext.Provider>
  );
};
