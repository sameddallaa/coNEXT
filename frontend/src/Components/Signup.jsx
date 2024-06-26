import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/LoginAnimation.json";
import classes from "../CSS/Signup.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { InputGroup, Row, Col } from "react-bootstrap";
import { HiOutlineAtSymbol } from "react-icons/hi2";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    birthdate: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const SIGNUP_ENDPOINT = "http://localhost:8000/api/users/signup";
    try {
      const response = await axios.post(SIGNUP_ENDPOINT, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (response.status === 201) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }

    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
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
                <h2 className={`${classes.formHeading}`}>Welcome to CoNEXT!</h2>
                <p className={`${classes.formText}`}>
                  Start your journey with us!
                </p>
              </div>
              <Form noValidate validated={validated}>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
                <Form.Label htmlFor="username">Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <HiOutlineAtSymbol />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Your username should only include alphanumeric characters,
                    underscores, and no whitespaces.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label htmlFor="birthdate">Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  onChange={handleChange}
                  //   className="mb-2"
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  You have to be over 13 years old.
                </Form.Control.Feedback>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="firstName">First name</Form.Label>
                      <Form.Control
                        type="text"
                        id="firstName"
                        name="first_name"
                        onChange={handleChange}
                        // className="mb-2"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label htmlFor="lastName">Last name</Form.Label>
                      <Form.Control
                        type="text"
                        id="lastName"
                        name="last_name"
                        onChange={handleChange}
                        // className="mb-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>
                {/* </FloatingLabel> */}
                {/* <FloatingLabel controlId="floatingPassword" label="Password"> */}
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={!show1 ? "password" : "text"}
                          id="password"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                        <InputGroup.Text
                          onClick={() => {
                            setShow1(!show1);
                          }}
                        >
                          <FaRegEye />
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          Your password has to be atleast 8 characters long.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col>
                      <Form.Label htmlFor="password2">
                        Confirm password
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={!show2 ? "password" : "text"}
                          id="password2"
                          name="password2"
                          onChange={handleChange}
                          required
                        />
                        <InputGroup.Text
                          onClick={() => {
                            setShow2(!show2);
                          }}
                        >
                          <FaRegEye />
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          Passwords do not match
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                {/* </FloatingLabel> */}
                <div className="my-3">
                  <Button
                    variant="primary"
                    className="btn-success rounded-pill w-25 "
                    onClick={handleSubmit}
                  >
                    Signup
                  </Button>
                </div>
              </Form>
              <div className="">
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-success">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </Col>
        <Col className="d-flex m-5 container-fluid">
          <div
            className={`${classes.LoginAnimation} mh-100 d-flex align-items-center rounded-pill`}
            style={{ backgroundColor: "#e6f0dc" }}
          >
            <Lottie animationData={LoginAnimation}></Lottie>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
