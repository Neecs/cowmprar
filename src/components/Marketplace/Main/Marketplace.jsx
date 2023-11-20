import { MarketplaceList } from "./MarketplaceList.jsx";
import NavBar from "../../GeneralComponents/NavBar.jsx";
import { useEffect } from "react";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import './Marketplace.css'

function Marketplace(props) {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="marketplace-space">
      <NavBar />
      <div className="marketplace-body">
        <MarketplaceList />
      </div>
    </div>
  );
}

export default Marketplace;
