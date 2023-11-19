/**
 * React component representing the navigation bar of the application.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the NavBar component.
 */
import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { supabase } from "../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import './NavBar.css'

/**
 * @function
 * @description Functional component representing the navigation bar of the application.
 * @returns {JSX.Element} JSX representation of the NavBar component.
 */
function NavBar() {
  const navigate = useNavigate();
  const [userID, setUserId] = useState("");

  useEffect(() => {
    // Fetch the user ID on component mount
    getUserId();
  }, []);

  /**
   * @function
   * @description Fetches the user ID from the authentication session.
   */
  const getUserId = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      const id = session.user.id;
      setUserId(id);
    });
  };

  /**
   * @function
   * @description Navigates to the user settings page.
   */
  const goToSettings = () => {
    navigate(`/settings/${userID}`);
  };

  // JSX representation of the NavBar component
  return (
    <div className="navbar-main">
      {/* Bootstrap Navbar component */}
      <Navbar id="navbar-menu">
        {/* Navbar Brand */}
        <Navbar.Brand className="navbar-text" href="/">
          Cowmprar
        </Navbar.Brand>
        {/* Navigation Links */}
        <Nav className="me-auto">
          <Nav.Link className="navbar-text" href="/">
            Tus vacas
          </Nav.Link>
          <Nav.Link className="navbar-text" href="/marketplace">
            Marketplace
          </Nav.Link>
          <Nav.Link className="navbar-text" onClick={goToSettings}>
            Editar usuario
          </Nav.Link>
        </Nav>
        {/* Sign Out Button */}
        <Button
          id="close-session-button"
          variant="dark"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
          className="sign-out"
        >
          Cerrar sesión
        </Button>
      </Navbar>
    </div>
  );
}

export default NavBar;
