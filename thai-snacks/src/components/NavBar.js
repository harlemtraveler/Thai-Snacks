import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar'
import {Nav, NavbarBrand, NavLink} from "react-bootstrap";
import Button from 'react-bootstrap/Button'

const NavBar = ({ user, handleSignout }) => (
  <Navbar bg="dark" variant="dark">
      <Container>
        <NavbarBrand href="/">Thai Snacks</NavbarBrand>
        <Nav className="justify-content-end">
          <Navbar.Text>
            Hello, {user.username}
          </Navbar.Text>

          {/*<NavbarBrand>*/}
          {/*  <img src="../img/person.svg" alt=""/>*/}
          {/*</NavbarBrand>*/}
          <NavLink href="profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </NavLink>
          <Button variant="outline-danger" size="sm" onClick={handleSignout}>Signout</Button>
        </Nav>
      </Container>
  </Navbar>
)


export default NavBar;