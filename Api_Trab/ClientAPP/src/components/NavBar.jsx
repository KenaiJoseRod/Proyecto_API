import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    key={expand} // ✅ key agregada
                    expand={expand}
                    className="bg-body-tertiary mb-3"
                >
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Brand href="/">Proyecto con React/sql/vite/boostrap/api</Navbar.Brand>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default NavBar;