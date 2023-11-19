/**
 * React component for searching cows by name.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the CowSearch component.
 */
import React, { useState, useContext } from "react";
import { CowContext } from "../../../context/CowContext.jsx";

/**
 * @function
 * @description Functional component for searching cows by name.
 * @returns {JSX.Element} JSX representation of the CowSearch component.
 */
export const CowSearch = () => {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Accessing the CowContext to get the cow data and set filtered cows
  const { dbCows, setFilteredCows } = useContext(CowContext);

  /**
   * @function
   * @description Handles the search operation based on the inputted cow name.
   */
  const handleSearch = () => {
    // Creating a case-insensitive regular expression from the search term
    const regex = new RegExp(searchTerm, "i");

    // Filtering cows based on the regex test of their names
    const filteredCows = dbCows.filter((cow) => regex.test(cow.nombre_vaca));

    // Setting the filtered cows in the context
    setFilteredCows(filteredCows);
  };

  // JSX representation of the CowSearch component
  return (
    <div>
      {/* Input for entering the cow name search term */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by cow name..."
      />

      {/* Button to trigger the search operation */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CowSearch;
