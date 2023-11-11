import { CowCard } from "./CowCard.jsx";
import { useEffect } from "react";
import { useState } from "react";
import {
  getCowsByUser,
  getRazes,
} from "../../../supabase/usecases/cows/get_cow.js";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { CowContext } from "../../../context/CowContext.jsx";
import { useContext } from "react";

export const CowList = () => {
  const{cowsData, cowsRazes} = useContext(CowContext);

  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard key={cow.id_vaca} cow={cow} razes={cowsRazes} />
      ))}
    </div>
  );
};
