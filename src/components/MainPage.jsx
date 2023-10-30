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
import { useState } from "react";
import { getAllUserCows } from "../supabase/usecases/cows/get_cow.js";

export const MainPage = () => {
  const navigate = useNavigate();
  const [cowsData, setCowsData] = useState({});

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    async function fetchData() {
      const data = await getAllUserCows();
      setCowsData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="main-page">
      <div className="navbar-main">
        <Navbar>
          <Navbar.Brand className="navbarText" href="#home">Cowmprar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbarText" href="#home">Home</Nav.Link>
            <Nav.Link className="navbarText" href="#features">Features</Nav.Link>
            <Nav.Link className="navbarText" href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Button
            variant="dark"
            onClick={async () => {
              supabase.auth.signOut();
            }}
          >
            Cerrar sesión
          </Button>
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
      </div>
    </div>
  );
};
