import { useState, useEffect } from 'react';
import './App.scss';
import Item from './components/Item/Item';
import FormTaskAndGoal from './components/Form/Form';
import Menu from './components/Menu/Menu';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AddingMobileButton from './components/AddingMobileButton/AddingMobileButton';
import Modal from 'react-bootstrap/Modal';
import { useTaskStore } from "./store/taskStore";
import { useGoalStore } from "./store/goalStore";
import { useMenuStore } from "./store/menuStore";

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const tasks = useTaskStore((state) => state.tasks);
  const goals = useGoalStore((state) => state.goals);
  const isActiveInMenu = useMenuStore((state) => state.menu.active);

  useEffect(() => {
    useTaskStore.getState().fetchTasks();
    useGoalStore.getState().fetchGoals();
    useMenuStore.getState().setActive('tasks');
  }, []);

  return (
    <div className="App">
      <Menu />
      <Container>
        <Row>
          <Col className="d-none d-md-block">
            <FormTaskAndGoal />
          </Col>
          <Col>
            <div className="d-md-none overlapping-div" onClick={handleOpenModal}>
              <AddingMobileButton />
            </div>
            <Row>
              <div className="scrolling">
                {isActiveInMenu === 'tasks' ? (
                  tasks.map((task) => (
                    <Item key={task._id} {...task} />
                  ))
                ) : (
                  goals.map((goal) => (
                    <Item key={goal._id} {...goal} />
                  ))
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTaskAndGoal onAdd={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;