import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../CSS/Friend.module.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
const Friend = ({ friend, setFriends, userId }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  console.log(userId);
  console.log(user.user_id);
  const handleRemove = async (id) => {
    const REQUEST_ENDPOINT = `http://localhost:8000/api/users/requests/${id}`;
    try {
      const response = await axios.post(
        REQUEST_ENDPOINT,
        { status: "remove" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("success");
        setFriends((prevFriends) => prevFriends.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link className="text-decoration-none text-dark">
      <div className="d-flex justify-content-center">
        <div
          className={`m-1 py-1 px-3 rounded d-flex align-items-center justify-content-between w-75 ${classes.friendContainer}`}
          style={{ backgroundColor: "#d1d1d1" }}
        >
          <div className="d-flex align-items-center">
            <Image
              src={friend.profile_image}
              width={50}
              height={50}
              roundedCircle
              className="m-2"
            />
            <div>
              <span className={`fw-bold`}>{friend.full_name}</span>
              <p
                style={{ wordBreak: "break-word" }}
                className="m-0 text-secondary"
              >
                {friend.bio}
              </p>
            </div>
          </div>
          {userId == user.user_id && (
            <Button
              variant="outline-danger rounded-pill"
              className={`d-flex align-items-center ${classes.deleteBtn}`}
              onClick={() => handleRemove(friend.id)}
            >
              <FaTrash className="me-1" />
              Delete friend
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Friend;
