import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useMenuStore } from '../../store/menuStore';

function Menu() {
  const active = useMenuStore((state) => state.menu.active);
  const setActive = useMenuStore((state) => state.setActive);

  return (
    <Navbar expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav activeKey={active} onSelect={(selectedKey) => setActive(selectedKey || 'tasks')}>
            <Nav.Link eventKey='tasks'>Tareas</Nav.Link>
            <Nav.Link eventKey='goals'>Metas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;