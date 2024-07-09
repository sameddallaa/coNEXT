import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import { Link } from "react-router-dom";
const Messages = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchChats() {
      try {
        const CHATS_ENDPOINT = `http://localhost:8000/api/users/chats/${user.user_id}`;
        const response = await axios.get(CHATS_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        const data = response.data;
        if (response.status === 200) {
          setChats(data.chats);
          console.log(data.chats);
          setLoading(false);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchChats();
  }, []);
  return (
    <div
      style={{ position: "fixed", bottom: 0, right: 0 }}
      className="w-25 d-flex flex-column me-1"
    >
      <div
        className="text-success px-3 py-2 rounded-top d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "aliceblue",
          fontWeight: "500",
          cursor: "pointer",
        }}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <p className="m-0">Messages</p>
        {toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      {toggle && (
        <div className="" style={{ backgroundColor: "#cfebff" }}>
          {loading ? (
            <Lottie animationData={loadingAnimation} />
          ) : (
            chats.map((chat, index) => (
              <div
                key={index}
                className=""
                style={{ backgroundColor: "#bfe4ff" }}
              >
                <div className="d-flex flex-column py-1 px-2">
                  <Link
                    className="text-decoration-none text-dark"
                    style={{ fontWeight: 500 }}
                  >
                    {
                      chat.participants.filter(
                        (participant) => participant.id !== user.user_id
                      )[0].full_name
                    }
                  </Link>
                  {chat.last_message && (
                    <p className="m-0 text-secondary">
                      {chat.last_message.body
                        ? chat.last_message.body
                        : chat.last_message.attachment
                        ? chat.last_message.sender.id === user.user_id
                          ? "You: Attachment"
                          : "Attachment"
                        : chat.last_message.sender.id === user.user_id
                        ? "You: Post"
                        : "Post"}
                    </p>
                  )}
                </div>
                <hr className="m-0" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
