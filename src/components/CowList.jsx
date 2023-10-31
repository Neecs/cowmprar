import { CowCard } from "./CowCard";
import { useEffect } from "react";
import { useState } from "react";
import {getCowsByUser} from "../supabase/usecases/cows/get_cow.js";

export const CowList = ({userId}) => {
  const [cowsData, setCowsData] = useState([]);
  console.log(userId)
  useEffect(() => {
    console.log("Second UID: " + userId); // This logs userId again, and you can use it inside the useEffect
adsf
    async function fetchData() {
      const data = await getCowsByUser(userId);
      setCowsData(data);
    }

    fetchData();
  }, [userId]); // Make sure to include userId in the dependency array


  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard key={cow.id_vaca} cow={cow} />
      ))}
    </div>
  );
};
