import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss';

function FormTaskAndGoal() {
   return (
  <div className='space form-margin'>
    <Form>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Button type="submit" variant="info">
        Add Goal
      </Button>

    </Form>
  </div>
);
}

export default FormTaskAndGoal;