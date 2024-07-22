import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UtilsContext from "../Contexts/UtilsContext";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import heartFull from "../assets/img/heartFull.svg";
import heartEmpty from "../assets/img/heartEmpty.svg";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import AuthContext from "../Contexts/AuthContext";
const Post = ({ image, post }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { timeAgo } = useContext(UtilsContext);
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user.user_id));
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDownload = ({ url }) => {
    const fileName = url.split("/").pop();
    console.log(fileName);
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  useEffect(() => {
    async function hasLiked() {
      const ENDPOINT = `http://localhost:8000/api/posts/${post.id}/like`;
      try {
        const response = await axios.get(ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        if (response.status === 200) {
          const { data } = response;
          console.log(`${post.content}: ${data.message}`);
          if (data.message === "liked") {
            setLiked(true);
            console.log(post.id);
          } else if (data.message === "unliked") {
            setLiked(false);
          }
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    hasLiked();
  }, []);

  const likePost = async () => {
    const ENDPOINT = `http://localhost:8000/api/posts/${post.id}/like`;
    try {
      const response = await axios.post(
        ENDPOINT,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(`success`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-light p-2 m-2 rounded">
        {loading ? (
          <Lottie animationData={loadingAnimation} />
        ) : (
          <>
            <div className="d-flex justify-content-between m-2">
              <div className="d-flex align-items-center">
                <Image
                  src={image}
                  alt="Profile picture"
                  roundedCircle
                  width={40}
                  height={40}
                />
                <div className="d-flex flex-column justify-content-center mx-2">
                  <div>
                    <Link
                      style={{ textDecoration: "none", fontWeight: "500" }}
                      className="text-dark"
                      to={"/profiles/" + post.owner.id}
                    >
                      {post.owner_name}
                    </Link>
                  </div>
                  <div>
                    <p className="m-0 text-secondary">
                      {timeAgo(post.posted_at)}
                    </p>
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
              <div
                className="d-flex align-items-center mx-1 btn p-0"
                onClick={() => {
                  setLiked((prevLiked) => {
                    if (prevLiked) {
                      setLikeCount((prevCount) => prevCount - 1);
                    } else {
                      setLikeCount((prevCount) => prevCount + 1);
                    }
                    return !prevLiked;
                  });
                  likePost();
                }}
              >
                {liked ? (
                  <Image src={heartFull} width={20} />
                ) : (
                  <Image src={heartEmpty} width={20} />
                )}
                <p className="my-0 mx-1">{likeCount}</p>
              </div>
              <div className="d-flex align-items-center mx-1 btn p-0">
                <FaRegComment />
                <p className="my-0 mx-1">{post.comment_count}</p>
              </div>
              <div className="d-flex align-items-center mx-1 btn p-0">
                <FiSend />
              </div>
            </div>
          </>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body closeButton className="p-0">
          <Image src={post.attachment} className="w-100 rounded fluid" />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "transparent !important" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => handleDownload(post.attachment)}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
