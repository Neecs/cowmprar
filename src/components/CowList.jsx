import { CowCard } from "./CowCard";
import { useEffect } from "react";
import { useState } from "react";
import { getCowsByUser } from "../supabase/usecases/cows/get_cow.js";
import { supabase } from "../supabase/data/constants/api_credentials.js";

export const CowList = () => {
  const [cowsData, setCowsData] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        console.log("first");
      } else {
        console.log(session.user.id);
        const fetchData = async () => {
          const data = await getCowsByUser(session.user.id);
          setCowsData(data);
        };
        fetchData();
        console.log(cowsData);
      }
    });

    // This logs userId again, and you can use it inside the useEffect
  }, []); // Make sure to include userId in the dependency array

  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard key={cow.id_vaca} cow={cow} />
      ))}
    </div>
  );
};
