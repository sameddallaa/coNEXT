import React, { useState, createContext, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAt, FaImage, FaPaperclip } from "react-icons/fa6";
import FilePlaceholder from "./FilePlaceholder";
const AddPost = ({ image }) => {
  const [post, setPost] = useState({
    content: "",
    image: false,
    attachment: null,
    privacy: "friends",
  });

  const imageRef = useRef(null);
  const attachmentRef = useRef(null);
  const handleChange = (e) => {
    if (e.target.name === "content") {
      setPost({ ...post, content: e.target.value });
    } else if (e.target.name === "image") {
      setPost({ ...post, attachment: e.target.files[0], image: true });
    } else if (e.target.name === "attachment") {
      setPost({ ...post, attachment: e.target.files[0], image: false });
    } else if (e.target.name === "privacy") {
      setPost({ ...post, privacy: e.target.value });
    }
    console.log(post);
  };

  return (
    <div className="mb-5">
      <Form className="p-2 py-3 bg-light m-2 rounded">
        <div className="d-flex">
          <img
            src={image}
            alt="profile picture"
            className="me-2"
            style={{ width: "50px", height: "auto", borderRadius: "5000px" }}
          />
          <InputGroup className="mx-1">
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="What's on your mind?"
              name="content"
              onChange={handleChange}
            />
            <InputGroup.Text style={{ border: "none" }}>
              <Form.Group className="d-flex align-items-center">
                <Form.Select
                  style={{ border: "none" }}
                  className="text-secondary rounded-pill"
                  name="privacy"
                  onChange={handleChange}
                >
                  <option value={"public"}>Public</option>
                  <option value={"friends"} defaultValue>
                    Friends
                  </option>
                  <option value={"me"}>Only me</option>
                </Form.Select>
              </Form.Group>
            </InputGroup.Text>
          </InputGroup>
        </div>
        {post.attachment && (
          <FilePlaceholder
            post={post}
            setPost={setPost}
            imageRef={imageRef}
            attachmentRef={attachmentRef}
          />
        )}
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
            <Form.Control
              type="file"
              className="d-none"
              id="imageInput"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={imageRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              htmlFor="attachmentInput"
              className="d-flex align-items-center m-0"
              style={{ cursor: "pointer", fontWeight: "500" }}
            >
              <FaPaperclip className="text-success m-1" />
              Attachment
            </Form.Label>
            <Form.Control
              type="file"
              className="d-none"
              id="attachmentInput"
              name="attachment"
              accept=".pdf, .txt, .doc, video/*"
              onChange={handleChange}
              ref={attachmentRef}
            />
          </Form.Group>
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
            disabled={!(post.content || post.attachment)}
          >
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPost;
