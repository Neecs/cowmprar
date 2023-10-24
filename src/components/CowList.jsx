import { CowCard } from "./CowCard";
import { useEffect } from "react";
import { useState } from "react";
import { getAllUserCows } from "../supabase/usecases/cows/get_cow.js";

export const CowList = () => {
  const [cowsData, setCowsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Running");
      const data = await getAllUserCows();
      setCowsData(data);
    }
    fetchData();
    console.log(cowsData);
  }, []);

  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard key={cow.id_vaca} cow={cow} />
      ))}
    </div>
  );
};
