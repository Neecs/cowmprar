/**
 * React component for the list of cows in the Marketplace.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the MarketplaceList component.
 */
import { useContext } from "react";
import { MarketplaceCard } from "../Cards/MarketplaceCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";

/**
 * @function
 * @description Functional component for the list of cows in the Marketplace.
 * @returns {JSX.Element} JSX representation of the MarketplaceList component.
 */
export const MarketplaceList = () => {
  // Destructuring context values
  const { cowsRazes, dbCows, cowsHV, sellers  } = useContext(CowContext);

  // JSX representation of the MarketplaceList component
  return (
    <div>
      {dbCows.map((cow) => (
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
