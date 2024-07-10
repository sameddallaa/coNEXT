import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";

const ChatsSidebar = ({ setChat }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
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
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchChats();
  }, []);
  return (
    <>
      <div className="vh-100 bg-light">
        <div className="d-flex align-items-center justify-content-between ps-3 pe-2 py-2">
          <h4>Chats</h4>
          <div className="d-flex align-items-center me-2">
            <Button
              className="d-flex align-items-center rounded-circle p-2 mx-2"
              variant="success"
            >
              <FaSearch />
            </Button>
            <Button
              className="d-flex align-items-center rounded-circle p-2"
              variant="success"
            >
              <FaPlus />
            </Button>
          </div>
        </div>
        {chats.map((chat, index) => (
          <React.Fragment key={index}>
            <hr className="m-0" />
            <Link
              className="text-decoration-none"
              to={`/chats/${chat.id}`}
              onClick={() => {
                setChat(chat.id);
              }}
            >
              <div className="py-1">
                <div className="py-2 d-flex">
                  <Image
                    src={
                      chat.participants.filter(
                        (participant) => participant.id !== user.user_id
                      )[0].profile_image
                    }
                    roundedCircle
                    width={50}
                    height={50}
                    className="ms-2"
                  />
                  <div className="d-flex justify-content-between align-items-center w-100 mx-2">
                    <div className="d-flex flex-column justify-content-center">
                      <span className="text-decoration-none text-dark">
                        {
                          chat.participants.filter(
                            (participant) => participant.id !== user.user_id
                          )[0].full_name
                        }
                      </span>
                      {chat.last_message.sender.id && (
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
                </div>
              </div>
            </Link>
            <hr className="m-0" />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ChatsSidebar;
