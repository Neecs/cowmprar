import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CowList } from './CowList';
import 'bootstrap/dist/css/bootstrap.min.css';


export const MainPage = () => {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Cowmprar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Vacas</Nav.Link>
            <Nav.Link href="#features">Marketplace</Nav.Link>
            <Nav.Link href="#pricing">Vacunos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <CowList/>
      </>
  )
}
