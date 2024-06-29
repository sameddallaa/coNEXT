import React, { useState, useRef } from "react";
import pfp from "../assets/img/pfp.jpg";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAt, FaImage, FaPaperclip, FaVideo } from "react-icons/fa6";
const AddPost = () => {
  const [post, setPost] = useState("");
  const handleChange = (e) => {
    setPost(e.target.value);
  };
  return (
    <>
      <Form className="w-50 p-2 bg-light m-2 rounded">
        <div className="d-flex">
          <img
            src={pfp}
            alt="profile picture"
            style={{ width: "50px", height: "auto", borderRadius: "5000px" }}
          />
          <InputGroup className="mx-1">
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="What's on your mind?"
              name="postBody"
              onChange={handleChange}
            />
            <InputGroup.Text style={{ border: "none" }}>
              <Form.Group className="d-flex align-items-center">
                <Form.Select
                  aria-label="Default select example"
                  style={{ border: "none" }}
                  className="text-secondary rounded-pill"
                >
                  <option value={"public"} selected>
                    Public
                  </option>
                  <option value={"friends"}>Friends</option>
                  <option value={"me"}>Only me</option>
                </Form.Select>
              </Form.Group>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-evenly my-1">
          <Form.Group>
            <Form.Label
              htmlFor="imageInput"
              className="d-flex align-items-center m-0"
              style={{ cursor: "pointer", fontWeight: "500" }}
            >
              <FaImage className="text-success m-1" />
              Image
            </Form.Label>
            <Form.Control type="file" className="d-none" id="imageInput" />
          </Form.Group>
          <Form.Group>
            <Form.Label
              htmlFor="videoInput"
              className="d-flex align-items-center m-0"
              style={{ cursor: "pointer", fontWeight: "500" }}
            >
              <FaVideo className="text-success m-1" />
              Video
            </Form.Label>
            <Form.Control type="file" className="d-none" id="imageInput" />
          </Form.Group>
          <Form.Group>
            <Form.Label
              htmlFor="fileInput"
              className="d-flex align-items-center m-0"
              style={{ cursor: "pointer", fontWeight: "500" }}
            >
              <FaPaperclip className="text-success m-1" />
              Attachment
            </Form.Label>
            <Form.Control type="file" className="d-none" id="imageInput" />
          </Form.Group>
          {/* <Form.Group> */}
          <Link
            className="d-flex align-items-center text-dark"
            style={{
              cursor: "pointer",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            <FaAt className="text-success m-1" />
            Mention
          </Link>

          <Button
            variant="success"
            className="rounded-pill"
            disabled={post === ""}
          >
            Post
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddPost;
