/**
 * React component for the password restoration form.
 * Allows users to request a password reset link via email.
 */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./restorePass.css";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";

/**
 * @component
 * @description Functional component for the password restoration form.
 * @returns {JSX.Element} JSX representation of the password restoration form.
 */
export const RestorePassword = () => {
  // States to manage form validation and success message
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(false);

  /**
   * Handles the submission of the password restoration form.
   * Sends a password reset email to the provided email address.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const email = form.email.value;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    /**
     * Sends a password reset email to the provided email address.
     * Redirects the user to the specified URL after a successful reset.
     */
    const sendEmail = async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/profile/update",
      });
    };
    
    // Execute the sendEmail function, display success message, and set form as validated
    sendEmail();
    setMessage(true);
    setValidated(true);
  };

  return (
    <div className="form-pass-recovery">
      <div className="form-pass-recovery-space">
        <div className="form-password-header-title">
          <h4 className="title">Enter your registered email on cowmprar</h4>
          <p className="restore-category">
            If your email is registered, you will receive a link to reset your password.
          </p>
        </div>
        <br />
        <br />
        <div className="restore-password-info-space">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Floating className="mb-3 restore-password-field">
              <Form.Control
                type="email"
                placeholder="example@mail.com"
                required
              />
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control.Feedback type="invalid">
                Ingrese un correo válido
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

            {/* Confirmation and return buttons */}
            <div className="buttons">
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" className="btn btn-dark btn-md">
                Send Email
              </Button>
              <span style={{ marginRight: "10px" }}></span>
              <Link to="/">
                <Button type="button" className="btn btn-dark btn-md">
                  Return
                </Button>
              </Link>
            </div>

            <br />
            <br />
          </Form>
        </div>

        {/* Display a success message after sending the password reset email */}
        {message && (
          <Alert key="info" variant="info">
            Check your email for the recovery link.
          </Alert>
        )}
      </div>
    </div>
  );
};
