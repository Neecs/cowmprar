/**
 * React component for user settings.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the UserSettings component.
 */
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import './UserSettings.css'
import {
  updateEmail,
  updatePhone,
} from "../../../supabase/usecases/user/update_user";

/**
 * 
 * @function
 * @description Functional component for user settings.
 * @returns {JSX.Element} JSX representation of the UserSettings component.
 */
const UserSettings = () => {
  // State variables
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [succesfullRegister, setSuccesfullRegister] = useState(false);
  const { userId } = useParams();

  /**
   * @function
   * @description Handles form submission for updating user information.
   * @param {Object} event - Form submission event.
   */
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;

    // Update phone number if not empty
    if (phoneNumber !== "") {
      updatePhone(phoneNumber, userId);
    }

    // Update email if not empty
    if (email !== "") {
      updateEmail(email, userId);
    }

    // Reset success message
    setSuccesfullRegister(false);
  };

  // JSX representation of the UserSettings component
  return (
    <div className="user-settings-page">
      <div className="user-settings-space">
        <div className="user-settings-welcome">
          <h1>Cambiar datos de usuario</h1>
        </div>
        {/* User settings form */}
        <Form className="user-settings" noValidate validated={true} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Phone number input */}
            <Form.Group as={Col} md="4" controlId="phoneNumber">
              <Form.Floating className="mb-3">
                <Form.Control
                  className="user-fields"
                  type="text"
                  placeholder=" "
                  pattern="[0-9]*"
                  required
                />
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Ingrese un número de teléfono válido
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Email input */}
            <Form.Group as={Col} md="4" controlId="email">
              <Form.Floating className="mb-3">
                <Form.Control
                  className="user-fields"
                  type="email"
                  placeholder="example@mail.com"
                  required
                />
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Ingrese un correo válido
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>

          <div className="buttons">
            {/* Submit button */}
            <Form.Group className="mb-3"></Form.Group>
            <Button type="submit" className="btn btn-dark btn-lg">
              Editar información
            </Button>
            <span style={{ marginRight: "10px" }}></span>
            {/* Link to go back */}
            <Link to="/">
              <Button type="button" className="btn btn-dark btn-lg">
                Regresar
              </Button>
            </Link>
          </div>
          <br />
          {/* Display error and success messages */}
          {errorSignUp && (
            <Alert key="danger" variant="danger">
              Ingresa datos correctos
            </Alert>
          )}
          {errorPassword && (
            <Alert key="danger" variant="danger">
              Las contraseñas no coinciden
            </Alert>
          )}
          {succesfullRegister && (
            <Alert key="success" variant="success">
              Datos cambiados correctamente
            </Alert>
          )}
        </Form>
        <p id="update-hint">
          Si quieres actualizar contraseña, cierra sesión y luego ve a recuperar
          contraseña.
        </p>
      </div>
    </div>
  );
};

export default UserSettings;
