import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Navigation() {
  const warning = (props) => (
    <Tooltip id="search-tooltip" {...props}>
      You must be logged in to search
    </Tooltip>
  )

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <OverlayTrigger
              placement="right"
              delay={{show: 250, hide: 400}}
              overlay={warning}
            >
            <Nav.Link as={Link} to="/search">
              SEARCH
            </Nav.Link>
            </OverlayTrigger>
            <Nav.Link as={Link} to="/favourites">
              FAVOURITES
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
