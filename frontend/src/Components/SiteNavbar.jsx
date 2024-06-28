import { Navbar, Nav, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHome, FaUserFriends } from "react-icons/fa";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { BiSolidMessage } from "react-icons/bi";
import { FaBell, FaGear, FaPowerOff } from "react-icons/fa6";
import { PiAtom } from "react-icons/pi";
const SiteNavbar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <PiAtom className="text-success" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={`me-auto my-2 ${
              width >= 992 ? "d-flex align-items-center" : ""
            } `}
          >
            {/* <Nav.Link href="#home"> */}
            <div>
              <Form>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch className="text-success" />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
                {/* <Link to="/search">
                  <FaSearch className="text-success" />
                </Link> */}

                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
            </div>
            <>
              {/* </Nav.Link> */}
              <Nav.Link
                className="d-flex align-items-center mx-1 text-dark"
                href="#about"
                style={{ fontWeight: "500" }}
              >
                <FaHome className="me-1 text-success" />
                Homepage
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center mx-1 text-dark"
                href="#services"
                style={{ fontWeight: "500" }}
              >
                <FaUserFriends className="me-1 text-success" />
                Friends
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center mx-1 text-dark"
                href="#contact"
                style={{ fontWeight: "500" }}
              >
                <BiSolidMessage className="me-1 text-success" />
                Messages
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center mx-1 text-dark"
                href="#contact"
                style={{ fontWeight: "500" }}
              >
                <FaBell className="me-1 text-success" />
                Notifications
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center mx-1 text-dark"
                href="#contact"
                style={{ fontWeight: "500" }}
              >
                <FaGear className="me-1 text-success" />
                Settings
              </Nav.Link>
              {width < 992 && (
                <Nav.Link
                  className="d-flex align-items-center mx-1 text-dark"
                  href="#contact"
                  style={{ fontWeight: "500" }}
                >
                  <FaPowerOff className="me-1 text-success" />
                  Log out
                </Nav.Link>
              )}
            </>
          </Nav>
        </Navbar.Collapse>
        {width >= 992 && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              More
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-0">
              <Dropdown.Item>Logout</Dropdown.Item>
              <Dropdown.Item>Credits</Dropdown.Item>
              <Dropdown.Item>Contact us</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
