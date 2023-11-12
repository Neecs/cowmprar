import { CowCard } from "./CowCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";
import { useContext } from "react";

export const CowList = () => {
  const{cowsData, cowsRazes, cowsHV} = useContext(CowContext);

  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard key={cow.id_vaca}
                 cow={cow}
                 razes={cowsRazes}
                 cowshv={cowsHV} />
      ))}
    </div>
  );
};
