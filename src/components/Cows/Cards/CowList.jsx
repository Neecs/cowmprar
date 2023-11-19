/**
 * React component for displaying a list of cow cards.
 * Fetches cow data from the CowContext and renders individual CowCard components.
 */
import { CowCard } from "./CowCard.jsx";
import { CowContext } from "../../../context/CowContext.jsx";
import { useContext, useEffect } from "react";

/**
 * @component
 * @description Functional component for displaying a list of cow cards.
 * @returns {JSX.Element} JSX representation of the cow list component.
 */
export const CowList = () => {
  // Retrieve cow-related data from the CowContext using useContext hook
  const { cowsData, cowsRazes, cowsHV, cowHerds } = useContext(CowContext);

  return (
    <div>
      {/* Map through the cowData array and render a CowCard component for each cow */}
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
