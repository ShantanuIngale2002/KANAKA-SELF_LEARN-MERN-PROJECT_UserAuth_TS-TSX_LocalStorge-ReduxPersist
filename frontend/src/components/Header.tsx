import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useLogoutMutation } from "../store/slices/usersApiSlice.ts";
import { logout } from "../store/slices/authSlice.ts";

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      // const customError = err as {
      //   data?: { message?: string };
      //   error?: string;
      // };
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>MERN AUTH</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <Nav.Link as={Link} to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/logout">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </Nav.Link>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
