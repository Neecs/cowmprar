/**
 * React component for the login page.
 * Handles user authentication using Supabase.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

/**
 * @component
 * @description Functional component for the login page.
 * @returns {JSX.Element} JSX representation of the login page.
 */
export const Login = () => {
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // State to manage login errors
  const [errorLogin, setErrorLogin] = useState(false);

  /**
   * Effect hook to listen for changes in authentication state.
   * Redirects users based on authentication status.
   */
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  /**
   * Handles form submission.
   * Attempts user login using Supabase authentication.
   * Updates state based on the success or failure of the authentication.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const email = form.email.value;
    const password = form.password.value;

    // Attempt to sign in using Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Update state based on authentication success or failure
    if (!data.session) {
      setErrorLogin(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-space">
        <div className="welcome">
          <h1>Bienvenido a cowmprar</h1>
        </div>

        {/* Display an error alert if login fails */}
        {errorLogin && (
          <Alert key="danger" variant="danger">
            Usuario o contraseña incorrectos
          </Alert>
        )}

        {/* Login form using React Bootstrap components */}
        <Form onSubmit={handleSubmit}>
          {/* Email input field */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              className="formulary-field"
            />
            <Form.Text id="text-muted">
              <p id="privacy">
                Cowmprar no compartirá tu correo con nadie.
              </p>
            </Form.Text>
          </Form.Group>

          {/* Password input field */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              className="formulary-field"
            />
          </Form.Group>

          {/* Additional options and login button */}
          <Form.Group>
            <Row>
              {/* Links for password recovery and user registration */}
              <Col className="secondary-options col-3">
                <a href="/restore" id="forgot-password-text">¿Olvidaste tu contraseña?</a>
                <br />
                <br />
                <a href="/register" id="signup-text">
                  No tienes una cuenta? Registrate
                </a>
              </Col>

              {/* Login button */}
              <Col>
                <Button variant="dark" type="submit" id="login-button">
                  Ingresar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
