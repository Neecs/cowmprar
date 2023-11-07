import { CowCard} from "../Cows/Cards/CowCard.jsx";
import { useEffect } from "react";
import { useState } from "react";
import {getAllDBCows, getCowsByUser, getRazes} from "../../supabase/usecases/cows/get_cow.js";
import { supabase} from "../../supabase/data/constants/api_credentials.js";
import NavBar from "../GeneralComponents/NavBar.jsx";
import {MarketplaceCard} from "./MarketplaceCard.jsx";

export const MarketplaceList = () => {
    const [cowsData, setCowsData] = useState([]);
    const [cowsRazes, setCowsRazes] = useState([]);

    useEffect(() => {
        const fetchDataCows = async () => {
            const user = await supabase.auth.getUser();
            console.log(user.data.user.id);
            const data = await getAllDBCows();
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
                <MarketplaceCard key={cow.id_vaca} cow={cow} razes={cowsRazes}/>
            ))}
        </div>
    );
};