import { useContext } from "react";
import { MarketplaceCard } from "../Cards/MarketplaceCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";

export const MarketplaceList = () => {
  const { cowsRazes, dbCows, cowsHV } = useContext(CowContext);


  return (
    <div>
      {dbCows.map((cow) => (
        <MarketplaceCard
          key={cow.id_vaca}
          cow={cow}
          razes={cowsRazes}
          cowshv={cowsHV}
        />
      ))}
    </div>
  );
};
