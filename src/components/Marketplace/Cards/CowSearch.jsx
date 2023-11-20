import React, { useState, useContext } from "react";
import { CowContext } from "../../../context/CowContext.jsx";

export const CowSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { dbCows, setFilteredCows } = useContext(CowContext);

    const handleSearch = () => {
        const regex = new RegExp(searchTerm, 'i');
        const filteredCows = dbCows.filter(cow => regex.test(cow.nombre_vaca));
        setFilteredCows(filteredCows);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by cow name..."
            />
            <button >Search</button>
        </div>
    );
};

export default CowSearch;
