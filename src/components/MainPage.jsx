import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CowList } from "./CowList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mainPage.css";
import Button from "react-bootstrap/Button";
import { supabase } from "../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="main-page">
      <div className="navbar-main">
        <Navbar id="navbar-menu">
          <Navbar.Brand className="navbarText" href="#home">
            Cowmprar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbarText" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="navbarText" href="#features">
             Marketplace
            </Nav.Link>
            <Nav.Link className="navbarText" href="#pricing">
              Settings
            </Nav.Link>
          </Nav>
          <Button
              id="close-session-button"
            variant="dark"
            onClick={async () => {
              supabase.auth.signOut();
            }}
          className="sign-out">
            Cerrar sesión
          </Button>
        </Navbar>
      </div>
      <br />
      <div className="main-page-body">
        <CowList />
        <br />
        <Link to="form-cow" id="add-new-cow">
          <Button variant="dark" id="add-cow-button">Agregar vaca</Button>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
};
