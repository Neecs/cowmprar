/**
 * React component for the password recovery form.
 * Allows users to reset their password after receiving a recovery link.
 */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./restoreForm.css";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";

/**
 * @component
 * @description Functional component for the password recovery form.
 * @returns {JSX.Element} JSX representation of the password recovery form.
 */
export const RestoreForm = () => {
  // States to manage form validation and error/success messages
  const [validated, setValidated] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [successfulRecovery, setSuccessfulRecovery] = useState(false);

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handles the submission of the password recovery form.
   * Updates the user's password and displays error/success messages.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const password = form.password.value;

    const updatePassword = async () => {
      // Update the user's password using Supabase authentication API
      await supabase.auth.updateUser({
        password: password,
      });
    };

    if (password !== form.passwordConfirmation.value) {
      event.preventDefault();
      event.stopPropagation();
      setErrorPassword(true);
    } else {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // If form validation is successful, update the password and display success message
        updatePassword();
        setSuccessfulRecovery(true);
        navigate("/");
        alert("Password changed successfully");
      }
    }

    setValidated(true);
  };

  return (
    <div className="form-pass">
      <div className="form-pass-space">
        <div className="header-title">
          <h4>Enter your new password</h4>
          <p>Enter your new password to regain access to your account.</p>
        </div>
        <div className="infoSpace">
          {/* Form to input the new password */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <p>Enter your new password</p>

            {/* Input field for the new password */}
            <Form.Group as={Col} md="4" controlId="password">
              <Form.Floating className="mb-3">
                <Form.Control type="password" placeholder=" " required />
                <Form.Label>Password</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>

            <p>Re-enter the password</p>

            {/* Input field to confirm the new password */}
            <Form.Group as={Col} md="4" controlId="passwordConfirmation">
              <Form.Floating className="mb-3">
                <Form.Control type="password" placeholder=" " required />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>

            {/* Confirmation and return buttons */}
            <div className="buttons">
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" className="btn btn-dark btn-md">
                Confirm Change
              </Button>
              <span style={{ marginRight: "10px" }}></span>
              <Link to="/">
                <Button type="button" className="btn btn-dark btn-md">
                  Return
                </Button>
              </Link>
            </div>

            {/* Display an error message if passwords do not match */}
            {errorPassword && (
              <Alert key="danger" variant="danger">
                Passwords do not match
              </Alert>
            )}

            {/* Display a success message and email confirmation instruction */}
            {successfulRecovery && (
              <Alert key="success" variant="success">
                Perform the confirmation in your email
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
