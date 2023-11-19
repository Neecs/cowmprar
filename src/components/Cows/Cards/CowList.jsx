import { CowCard } from "./CowCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";
import { useContext, useEffect } from "react";

export const CowList = () => {
  const { cowsData, cowsRazes, cowsHV, cowHerds } = useContext(CowContext);

  return (
    <div>
      {cowsData.map((cow) => (
        <CowCard
          key={cow.id_vaca}
          cow={cow}
          razes={cowsRazes}
          cowshv={cowsHV}
          herds={cowHerds}
        />
      ))}
    </div>
  );
};
