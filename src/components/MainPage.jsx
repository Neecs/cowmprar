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
import {getAllUserCows} from "../supabase/usecases/cows/get_cow.js";

export const MainPage = () => {
  const navigate = useNavigate();
  const [cowsData, setCowsData] = useState({});

  useEffect(() => {

    async function fetchData(){
      console.log("Running")
      const data = await getAllUserCows()
      setCowsData(data)
    }
    fetchData()
  },[]);

  console.log(cowsData)

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
          onClick={async () => {
            supabase.auth.signOut();
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
