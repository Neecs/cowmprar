import { MarketplaceList } from "./MarketplaceList.jsx";
import NavBar from "../../GeneralComponents/NavBar.jsx";
import { useEffect } from "react";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";

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
    <div>
      <NavBar />
      <MarketplaceList />
    </div>
  );
}

export default Marketplace;
