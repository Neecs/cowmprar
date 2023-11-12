import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./formCvCow.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createCow } from "../../../supabase/usecases/cows/create_cow.js";
import { supabase } from "../../../supabase/data/constants/api_credentials.js";
import { useParams } from "react-router-dom";

export const FormCvCow = () => {
  useEffect(() => {
    console.log(cowId);
  }, []);

  const [validated] = useState(false);
  const navigate = useNavigate();
  const { cowId } = useParams();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const color = form.color.value;
    const location = form.location.value;

    const updateHV = async () => {
      const user = await supabase.auth.getUser();
      await createCow(razeId, genderId, bornDate, name, user.data.user.id);
    };
    createNewCow();
    navigate("/");
  };

  return (
    <div className="form-cow-cv">
      <div className="form-space-cow">
        <div className="header-title-cow">
          <h4 className="title">Hoja de vida</h4>
          {/* <p className="category">Ingrese los datos del Bovino</p> */}
        </div>
        <div className="data-cow">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col md="3">
              <h2 className="subtitle">Información</h2>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="color">
                <Form.Floating className="mb-3">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Color</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Cambia el Color.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Col md="3">
              <h2 className="subtitle">Ubicación</h2>
            </Col>
            <Row></Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="location">
                <Form.Floating className="mb-3 long-text-field">
                  <Form.Control type="text" placeholder=" " required />
                  <Form.Label>Hato</Form.Label>
                </Form.Floating>
              </Form.Group>
            </Row>

            <div className="buttons-cow">
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" className="button-common button-aceptar">
                Modificar
              </Button>
              <span style={{ marginRight: "10px" }}></span>
              <Link to="/">
                <Button type="button" className="button-common button-regresar">
                  Regresar
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
