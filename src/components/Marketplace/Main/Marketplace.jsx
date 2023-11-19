/**
 * React component for the Marketplace page.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} JSX representation of the Marketplace component.
 */
import { MarketplaceList } from "./MarketplaceList.jsx";
import NavBar from "../../GeneralComponents/NavBar.jsx";
import { useEffect } from "react";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import CowSearch from "../Cards/CowSearch.jsx";

/**
 * @function
 * @description Functional component for the Marketplace page.
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} JSX representation of the Marketplace component.
 */
function Marketplace(props) {
  // Navigation hook for redirection
  const navigate = useNavigate();

  /**
   * @function
   * @description Effect hook to check the user's authentication state.
   * Redirects to the login page if the user is not authenticated.
   */
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });
  }, []);

  // JSX representation of the Marketplace component
  return (
    <div>
      <NavBar />
      <CowSearch />
      <MarketplaceList />
    </div>
  );
}

export default Marketplace;
