import { useContext } from "react";
import { MarketplaceCard } from "../Cards/MarketplaceCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";

export const MarketplaceList = () => {
  const { cowsRazes, filteredCows, cowsHV, sellers} = useContext(CowContext);

  return (
      <div>
        {filteredCows.map((cow) => (
            <MarketplaceCard
                key={cow.id_vaca}
                cow={cow}
                razes={cowsRazes}
                cowshv={cowsHV}
                seller={sellers}
            />
        ))}
      </div>
  );
};
