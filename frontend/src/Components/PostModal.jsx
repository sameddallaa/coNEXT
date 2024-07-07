import React from "react";
import { Modal, Button } from "react-bootstrap";
const PostModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.success ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.success
              ? "Your post has been made successfully."
              : "There was a problem creating the post."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            variant={`${props.success ? "success" : "danger"}`}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
