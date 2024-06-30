import React, { useContext, useState } from "react";
import pfp from "../assets/img/pfp.jpg";
import { Container, Image, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UtilsContext from "../Contexts/UtilsContext";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Post = ({ post }) => {
  // owner, content, posted_at, attachment, likes, comment_count, comments
  const { timeAgo, getFileType } = useContext(UtilsContext);
  const [show, setShow] = useState(false);
  console.log(post.attachment);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="bg-light p-2 m-2 rounded">
        <div className="d-flex justify-content-between m-2">
          <div className="d-flex align-items-center">
            <img
              src={pfp}
              alt=""
              style={{ width: "40px", height: "auto", borderRadius: "5000px" }}
            />
            <div className="d-flex flex-column justify-content-center mx-2">
              <div>
                <Link
                  style={{ textDecoration: "none", fontWeight: "500" }}
                  className="text-dark"
                >
                  {post.owner}
                </Link>
              </div>
              <div>
                <p className="m-0 text-secondary">{timeAgo(post.posted_at)}</p>
              </div>
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
        <div className="d-flex">
          <Image
            src={post.attachment}
            className="w-100 rounded fluid"
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          />
        </div>
        <div className="d-flex w-50 my-2 ms-3">
          <div className="d-flex align-items-center mx-1">
            <FaRegHeart />
            <p className="my-0 mx-1">{post.likes}</p>
          </div>
          <div className="d-flex align-items-center mx-1">
            <FaRegComment />
            <p className="my-0 mx-1">{post.comment_count}</p>
          </div>
          <div className="d-flex align-items-center mx-1">
            <FiSend />
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        // className={`${show ? "blur-background" : ""}`}
      >
        {/* <Modal.Header closeButton>
          {/* <Modal.Title>{`${post.owner}'s picture`}</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body closeButton className="p-0">
          <Image src={post.attachment} className="w-100 rounded fluid" />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "transparent !important" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              return;
            }}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
