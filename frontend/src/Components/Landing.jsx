import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/LoginAnimation.json";
import classes from "../CSS/Landing.module.css";
import { Button } from "react-bootstrap";
const Landing = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={`${classes.landing} bg-dark d-flex justify-content-center p-1 container-fluid`}
    >
      <main
        className={`${classes.main} p-1 container bg-body-tertiary rounded row`}
      >
        <div
          className={`${classes.formContainer} col d-flex flex-column justify-content-evenly`}
        >
          <div className="">
            <h2 className={`${classes.formHeading}`}>
              Welcome back to CoNEXT!
            </h2>
            <p className={`${classes.formText}`}>
              Provide your login credentials to proceed.
            </p>
          </div>
          <Form className="ms-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="rounded-pill"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-pill"
              />
            </FloatingLabel>
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
                  className="btn-lg btn-success rounded-pill w-25 mt-2"
                >
                  Login
                </Button>
              </div>
            </div>
          </Form>
          <div className="ms-3">
            <p>
              Don't have an account?{" "}
              <a href="" className="text-success">
                Signup
              </a>
            </p>
          </div>
        </div>
        <div className={`${classes.LoginAnimation} mh-100 col bg-white-50`}>
          <Lottie animationData={LoginAnimation}></Lottie>
        </div>
      </main>
    </div>
  );
};

export default Landing;
