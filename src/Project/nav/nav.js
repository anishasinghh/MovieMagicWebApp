import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SiMusicbrainz } from "react-icons/si";
import './nav.css'; // Import the CSS file

function NavBar() {
  return (
<Navbar expand="lg" className="navbar" fluid>
  <Container className="navbar-container" fluid>
    <Navbar.Brand as={Link} to="/home" className="navbar-brand"><h3> <SiMusicbrainz /> Harmony Hub</h3></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav ms-auto">
          <Nav.Link as={Link} to="/home" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/search" className="nav-link">Search</Nav.Link>
          <Nav.Link as={Link} to="/account" className="nav-link">Account</Nav.Link>
        </Nav>
      <Nav className="navbar-nav ml-auto">
        <Nav.Link as={Link} to="/signin" className="nav-link"><button type="button" class="btn btn-outline-light">Sign In</button></Nav.Link>
        <Nav.Link as={Link} to="/signup" className="nav-link"><button type="button" class="btn custom-purple-btn">Sign Up</button></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>



  );
}

export default NavBar;
