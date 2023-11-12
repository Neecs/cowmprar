import React from 'react';
import {MarketplaceList} from "./MarketplaceList.jsx";
import NavBar from "../../GeneralComponents/NavBar.jsx";

function Marketplace(props) {
    return (
        <div>
            <NavBar/>
            <MarketplaceList/>
        </div>
    );
}

export default Marketplace;