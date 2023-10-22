import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CowList } from "./CowList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mainPage.css";
import Button from 'react-bootstrap/Button';

export const MainPage = () => {
  return (
    <div className="main-page">
      <div className="navbar-main">
      <Navbar >
        <Navbar.Brand href="#home">Cowmprar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
      </div>
      <br/>
      <div className="main-page-body">
      <CowList/>
        <br />
      <Button variant="dark">Agregar vaca</Button>
      </div>
    </div>
  );
};
