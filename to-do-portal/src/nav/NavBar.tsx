import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, NavbarText, NavItem } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";

export function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const onLoginButtonClick = () => {
    navigate("/login");
  };

  const onSignUpButtonClick = () => {
    navigate("/register");
  };

  const onLogoutButtonClick = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ToDo App
          </Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn && (
              <Nav.Link as={Link} to="/items">
                Items
              </Nav.Link>
            )}
          </Nav>
          {!isLoggedIn && (
            <NavItem style={{ marginLeft: "10px" }}>
              <Button onClick={onLoginButtonClick}>Login</Button>
            </NavItem>
          )}
          {!isLoggedIn && (
            <NavItem style={{ marginLeft: "10px" }}>
              <Button onClick={onSignUpButtonClick}>Sign Up</Button>
            </NavItem>
          )}
          {isLoggedIn && (
            <>
              <NavbarText>
                <IconContext.Provider
                  value={{ style: { verticalAlign: "middle" } }}
                >
                  <CgProfile size={20} /> {user.name}
                </IconContext.Provider>
              </NavbarText>
              <NavItem style={{ marginLeft: "10px" }}>
                <Button onClick={onLogoutButtonClick}>Logout</Button>
              </NavItem>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}
