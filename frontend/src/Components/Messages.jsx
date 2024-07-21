import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
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

          setLoading(false);
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
      className="w-25 d-flex flex-column me-3"
    >
      <div
        className="text-success p-3 rounded-top d-flex align-items-center justify-content-between"
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
        <>
          <hr className="m-0" />
          <div
            className="overflow-auto"
            style={{ backgroundColor: "#dedede", maxHeight: "225px" }}
          >
            {loading ? (
              <Lottie animationData={loadingAnimation} />
            ) : (
              chats.map((chat, index) => (
                <>
                  <div
                    key={index}
                    className="d-flex p-2 align-items-center justify-content-between"
                    style={{ backgroundColor: "#e9f6ff", cursor: "pointer" }}
                  >
                    <div className="d-flex">
                      <div className="py-1">
                        {chat.participants.filter(
                          (participant) => participant.id !== user.user_id
                        )[0].profile_image && (
                          <Image
                            src={
                              chat.participants.filter(
                                (participant) => participant.id !== user.user_id
                              )[0].profile_image
                            }
                            roundedCircle
                            width={50}
                            height={50}
                          />
                        )}
                      </div>

                      <div className="d-flex flex-column p-2 justify-content-center">
                        <Link
                          className="text-decoration-none text-dark small"
                          style={{
                            fontWeight: 500,
                          }}
                          to={`/chats/${chat.id}`}
                        >
                          {
                            chat.participants.filter(
                              (participant) => participant.id !== user.user_id
                            )[0].full_name
                          }
                        </Link>
                        {chat.last_message.sender && (
                          <p
                            className={`m-0 ps-1 small ${
                              chat.last_message.sender.id !== user.user_id &&
                              chat.last_message.status !== "read"
                                ? "text-dark"
                                : "text-secondary"
                            }`}
                            style={{
                              fontWeight:
                                chat.last_message.sender.id !== user.user_id &&
                                chat.last_message.status !== "read"
                                  ? 700
                                  : 400,
                            }}
                          >
                            {chat.last_message.body
                              ? chat.last_message.sender.id === user.user_id
                                ? `You: ${
                                    chat.last_message.body.length > 20
                                      ? chat.last_message.body.slice(0, 20) +
                                        "..."
                                      : chat.last_message.body
                                  }`
                                : chat.last_message.body.length > 20
                                ? chat.last_message.body.slice(0, 20) + "..."
                                : chat.last_message.body
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
                    </div>
                    {chat.unread_messages > 0 && (
                      <p
                        className="m-0 rounded-circle bg-danger d-flex align-items-center justify-content-center text-light"
                        style={{ width: "30px", height: "30px" }}
                      >
                        {chat.unread_messages >= 100
                          ? "99+"
                          : chat.unread_messages}
                      </p>
                    )}
                  </div>
                  <hr className="m-0" />
                </>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
