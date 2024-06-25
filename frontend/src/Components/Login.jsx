import React from "react";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/LoginAnimation.json";
import classes from "../CSS/Login.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { InputGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const Login = () => {
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      login(email, password);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`${classes.landing} d-flex justify-content-center p-1 container-fluid`}
      style={{ backgroundColor: "#c1e899" }}
    >
      <Row className="m-0">
        <Col className="d-flex m-5 container-fluid">
          <main
            className={`${classes.main} p-4 container rounded d-flex`}
            style={{ backgroundColor: "#e6f0dc" }}
          >
            <div
              className={`${classes.formContainer} d-flex flex-column justify-content-evenly`}
            >
              <div className="">
                <h2 className={`${classes.formHeading}`}>
                  Welcome back to CoNEXT!
                </h2>
                <p className={`${classes.formText}`}>
                  Provide your login credentials to proceed.
                </p>
              </div>
              <Form>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  // className="mb-2"
                  // className="rounded-pill"
                />
                {/* </FloatingLabel> */}
                {/* <FloatingLabel controlId="floatingPassword" label="Password"> */}
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      placeholder="Your password should be atleast 8 characters long."
                      id="password"
                      name="password"
                      onChange={handleChange}
                    />
                    <InputGroup.Text>
                      <FaRegEye />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {/* </FloatingLabel> */}
                <div className="my-3">
                  <div className="d-flex flex-column">
                    <div
                      className={`${classes.bottomContainer} d-flex justify-content-between mx-2`}
                    >
                      <Form.Check
                        type="checkbox"
                        className={`${classes.checkbox}`}
                        label="Remember me"
                      />
                      <a className="text-success" href="#">
                        Forgot Password?
                      </a>
                    </div>
                    <Button
                      variant="primary"
                      className="btn-success rounded-pill w-25 mt-2"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
              <div className="ms-3">
                <p>
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="text-success">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </Col>
        <Col>
          <div
            className={`${classes.LoginAnimation} mh-100 m-5 rounded-pill`}
            style={{ backgroundColor: "#e6f0dc" }}
          >
            <Lottie animationData={LoginAnimation}></Lottie>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
