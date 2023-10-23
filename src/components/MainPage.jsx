import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CowList } from "./CowList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mainPage.css";
import Button from "react-bootstrap/Button";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  },[]);

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
        <Button
          variant="dark"
          onClick={() => {
            supabase.auth.signOut();
            console.log(supabase.auth.getUser());
            navigate("/login");
          }}
        >
          Agregar vaca
        </Button>
      </div>
    </div>
  );
};
