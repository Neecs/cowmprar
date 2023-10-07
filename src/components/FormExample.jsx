import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "../styles/formNewUser.css";

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="form-space">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nombres </Form.Label>
          <Form.Control 
            required
            type="text"
            placeholder="Nombres"
            
          />
          <Form.Control.Feedback>Correcto</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellidos"
            
          />
          <Form.Control.Feedback>Correcto</Form.Control.Feedback>
        </Form.Group>

        
        </Row>

        <Row className='mb-3'>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="example@mail.com"
          />
          <Form.Control.Feedback>Correcto</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup hasValidation>
            
            <Form.Control
              type="password"
              placeholder="Contraseña"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Elija una contraseña.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Confirmar contraseña</Form.Label>
          <InputGroup hasValidation>
            
            <Form.Control
              type="password"
              placeholder="Contraseña"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Elija una contraseña.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control type="text" placeholder="Ciudad" required />
          <Form.Control.Feedback type="invalid">
          Introduzca una ciudad valida.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Departamento</Form.Label>
          <Form.Control type="text" placeholder="Departamento" required />
          <Form.Control.Feedback type="invalid">
            Introduzca una departamento valido.
          </Form.Control.Feedback>
        </Form.Group>
      
      </Row>
      <Form.Group className="mb-3">
        
      </Form.Group>
      <Button type="submit" className="btn btn-dark">Registrarse</Button>
    </Form>
    </div>
    
  );
}

export default FormExample;