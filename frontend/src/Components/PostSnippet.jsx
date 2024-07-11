import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import UtilsContext from "../Contexts/UtilsContext";
import { FaPaperclip } from "react-icons/fa";

const PostSnippet = ({ post }) => {
  const { isImage } = useContext(UtilsContext);
  return (
    <div className="rounded" style={{ backgroundColor: "#d4d4d4" }}>
      <div className="p-3">
        <Link className="text-dark text-decoration-none">
          <Image
            src={post.owner.profile_image}
            width={40}
            height={40}
            roundedCircle
            className="me-2"
          />
          {post.owner.full_name}
        </Link>
        <hr className="m-0 mt-2" />
      </div>
      <Link className="text-decoration-none text-dark">
        {post.content && <p className="px-2">{post.content}</p>}
        {post.attachment && (
          <div>
            {isImage(post.attachment) ? (
              <Image src={post.attachment} className="rounded-bottom w-100" />
            ) : (
              <div
                className="rounded-bottom pt-4 text-decoration-none text-dark"
                style={{ backgroundColor: "#e2e6e9" }}
              >
                <div className="d-flex align-items-center justify-content-center m-4">
                  <FaPaperclip />
                </div>
                <div
                  className="text-success d-flex justify-content-center align-items-center p-2 rounded-bottom fw-bold"
                  style={{
                    wordWrap: "break-word",
                    backgroundColor: "#bbc4d4",
                  }}
                >
                  {post.attachment.split("/").pop()}
                </div>
              </div>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

export default PostSnippet;
