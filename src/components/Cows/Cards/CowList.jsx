import { CowCard } from "./CowCard.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { getCowsByUser, getRazes } from "../../../supabase/usecases/cows/get_cow.js";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";

export const CowList = () => {
    const [cowsData, setCowsData] = useState([]);
    const [cowsRazes, setCowsRazes] = useState([]);

    useEffect(() => {
        const fetchDataCows = async () => {
            const user = await supabase.auth.getUser();
            console.log(user.data.user.id);
            const data = await getCowsByUser(user.data.user.id);
            setCowsData(data);
            const razes = await getRazes();
            setCowsRazes(razes);
        };
        fetchDataCows();

        console.log(cowsData);
    }, []);

    return (
        <div>
            {cowsData.map((cow) => (
                <CowCard key={cow.id_vaca} cow={cow} razes={cowsRazes}/>
            ))}
        </div>
    );
};