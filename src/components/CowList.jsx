import { CowCard } from "./CowCard";
import { useEffect } from "react";
import { useState } from "react";
import { getCowsByUser } from "../supabase/usecases/cows/get_cow.js";
import { supabase } from "../supabase/data/constants/api_credentials.js";

export const CowList = () => {
  const [cowsData, setCowsData] = useState([]);
  const [userId, setUserId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const user = await supabase.auth.getUser();
            console.log(user.data.user.id);
            const data = await getCowsByUser(user.data.user.id);
            setCowsData(data);
        };
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
