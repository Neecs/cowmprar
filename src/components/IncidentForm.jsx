import Form from "react-bootstrap/Form";
import "../styles/incidentForm.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const IncidentForm = () => {
  const handleSumbit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    const name = form.name.value;
    const dateIn = form.dateIn.value;
    const description = form.description.value;

    const data = {
      name,
      dateIn,
      description,
    };

    console.log(data);
  };



  return (
    <div className="inc-form-page">
      <h1>Registrar Incidente</h1>
      <br />
      <br />
      <div className="inc-form">
        <Form onSubmit={handleSumbit}>
          <div className="inc-name">
            <Form.Group as={Col} md="4" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder=" " required />
            </Form.Group>
          </div>
          <div className="date-in">
            <Form.Group className="mb-3" controlId="dateIn">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" placeholder="name@example.com" />
            </Form.Group>
          </div>
          <div className="text-area-des">
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>
          <div className="buttons">
            <Button type="submit" className="btn btn-dark btn-lg">
              Guardar
            </Button>
            <span style={{ marginRight: "10px" }}></span>
            <Link to="/">
              <Button type="button" className="btn btn-dark btn-lg">
                Regresar
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
