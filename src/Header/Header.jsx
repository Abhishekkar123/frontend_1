import { Container, Nav, Navbar, NavDropdown,Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import RegisterModal from './Modal/Modal';
import './header.css'
import { useState,useContext } from 'react';
import { DataContext } from '../context/DataProvider';
function Header() {

  const [showModal, setShowModal] = useState(false);
  const { account,setAccount } = useContext(DataContext);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

   
  const logout = () => {
    setAccount('');
    localStorage.removeItem('account');
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  };
  return (
    <>
    <Navbar expand="lg" fixed="top" className="bg-transparent blur" >
      <Container>
        <Navbar.Brand as={Link} to="#" exact>PropertyEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" >Home</Nav.Link>
            {account ? (
                <Nav.Link as={Link} to="/listing/properties/form">Post Free Add</Nav.Link>
              ) : ''}
            <Nav.Link as={Link} to="/listing/properties">View Properties</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="#">Action 3.1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Action 3.2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Action 3.3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#">Action 3.4</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {account ? (
              <NavDropdown title={account.slice(0, 4)} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="outline-primary" onClick={handleShow}>
                Register/Post free Add
              </Button>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <RegisterModal show={showModal} handleClose={handleClose} />

</>


  );
}

export default Header;
