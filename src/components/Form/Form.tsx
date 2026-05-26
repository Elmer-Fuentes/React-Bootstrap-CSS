import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.scss';
import { useTaskStore } from '../../store/taskStore';
import { useGoalStore } from '../../store/goalStore';
import { useMenuStore } from '../../store/menuStore';
import { useRef } from 'react';

type FormTaskAndGoalProps = {
  onAdd?: () => void;
}

function FormTaskAndGoal({ onAdd }: FormTaskAndGoalProps) {
  // 1. Referencias para los inputs
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefDescription = useRef<HTMLTextAreaElement>(null);
  const inputRefDueDate = useRef<HTMLInputElement>(null);

  // 2. Selectores de Zustand (Deben estar aquí adentro)
  const isActiveInMenu = useMenuStore((state) => state.menu.active);
  const addTask = useTaskStore((state) => state.addTask);
  const addGoal = useGoalStore((state) => state.addGoal);

  // 3. Función para manejar el envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = inputRefName.current?.value;
    const description = inputRefDescription.current?.value;
    const dueDate = inputRefDueDate.current?.value;

    if (name && description && dueDate) {
      if (isActiveInMenu === 'tasks') {
        // Envio de datos a la API de tareas
        addTask({ name, description, duedate: dueDate });
      } else {
        // Envio de datos a la API de metas
        addGoal({ name, description, duedate: dueDate });
      }

      // Limpiar campos después de agregar
      if (inputRefName.current) inputRefName.current.value = '';
      if (inputRefDescription.current) inputRefDescription.current.value = '';
      if (inputRefDueDate.current) inputRefDueDate.current.value = '';

      if (onAdd) {
        onAdd();
      }
    }
  };

  return (
    <div className='space form-margin'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={inputRefName} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} ref={inputRefDescription} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" ref={inputRefDueDate} />
        </Form.Group>

        <Button type="submit" variant="info">
          {isActiveInMenu === 'tasks' ? 'Add Task' : 'Add Goal'}
        </Button>
      </Form>
    </div>
  );
}

export default FormTaskAndGoal;