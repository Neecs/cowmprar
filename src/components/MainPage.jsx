import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CowList } from "./CowList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mainPage.css";
import Button from "react-bootstrap/Button";
import {supabase} from "../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/login");
        }
      },
      [navigate]
    );
  }, []);

  return (
    <div className="main-page">
      <div className="navbar-main">
        <Navbar>
          <Navbar.Brand href="#home">Cowmprar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <br />
      <div className="main-page-body">
        <CowList />
        <br />
        <Link to="form-cow">
          <Button variant="dark">Agregar vaca</Button>
        </Link>
        <br />
        <br />
        <Button
          variant="dark"
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
