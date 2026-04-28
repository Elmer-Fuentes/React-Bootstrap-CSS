import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Item.scss';
import type {task} from '../../store/taskStore';
import type {goal} from '../../store/goalStore';
import { useTaskStore } from "../../store/taskStore";
import { useGoalStore } from "../../store/goalStore";
import { useMenuStore } from "../../store/menuStore";

const { removeTask } = useTaskStore.getState();
const { removeGoal } = useGoalStore.getState();

function Item(props: task | goal) {

  const isActiveInMenu = useMenuStore((state) => state.menu.active);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isActiveInMenu === 'tasks') {
      removeTask(props as task);
    } else {
      removeGoal(props as goal);
    }
  };
  return (
    <Card >
      <Card.Body>
        <Card.Title >{props.name}</Card.Title>
        <Card.Text className="fw-bold">
          Descripción
        </Card.Text>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text className="fw-bold">
          {props.dueDate}
        </Card.Text>
        <Card.Text>
          15/05/2026
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Button onClick={(e) => handleRemove(e)}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default Item;