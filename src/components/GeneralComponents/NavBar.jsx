import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {supabase} from "../../supabase/data/constants/api_credentials.js";

function NavBar() {
    return (
        <div className="navbar-main">
            <Navbar id="navbar-menu">
                <Navbar.Brand className="navbarText" href="/">
                    Cowmprar
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className="navbarText" href="/">
                        Tus vacas
                    </Nav.Link>
                    <Nav.Link className="navbarText" href="marketplace">
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
                        await supabase.auth.signOut();
                    }}
                    className="sign-out">
                    Cerrar sesión
                </Button>
            </Navbar>
        </div>
    );
}

export default NavBar;