import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";

const FilePlaceholder = ({ post, setPost }) => {
  useEffect(() => {
    console.log("i'm running again");
  }, [post.attachment]);

  const handleClose = () => {
    setPost({ ...post, attachment: null, image: false });
  };
  return (
    <div className="mx-3">
      <div className="d-flex justify-content-end w-25">
        <span style={{ cursor: "pointer" }} onClick={handleClose}>
          <FaRegCircleXmark />
        </span>
      </div>
      {post.image ? (
        <Image
          src={URL.createObjectURL(post.attachment)}
          alt="image placeholder"
          className="ms-3 my-2 rounded"
          style={{
            width: "90px",
            height: "auto",
            //   filter: "opacity(50%)",
          }}
          thumbnail
        />
      ) : (
        <div
          className="rounded pt-4 w-25"
          style={{ backgroundColor: "#e2e6e9" }}
        >
          <div className="d-flex align-items-center justify-content-center my-4">
            <FaPaperclip />
          </div>
          <div
            className="d-flex justify-content-center align-items-center py-2 rounded-bottom"
            style={{ wordWrap: "break-word", backgroundColor: "#bbc4d4" }}
          >
            {post.attachment.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePlaceholder;
