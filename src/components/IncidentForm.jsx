import Form from 'react-bootstrap/Form';

export const IncidentForm = () => {
  return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Nombre</Form.Label>
        <Form.Control as="text" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Fecha</Form.Label>
        <Form.Control type="date" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  )
}
