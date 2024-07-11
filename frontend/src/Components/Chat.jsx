import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import UtilsContext from "../Contexts/UtilsContext";
import { Link } from "react-router-dom";
import chatBg from "../assets/img/chatBg.jpg";
const Chat = ({ chat }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const { isImage } = useContext(UtilsContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [contact, setContact] = useState({});

  useEffect(() => {
    async function fetchMessages() {
      try {
        const MESSAGES_ENDPOINT = `http://localhost:8000/api/chats/${chat}/messages`;
        const response = await axios.get(MESSAGES_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        const data = response.data;
        if (response.status === 200) {
          setMessages(data.messages);
          setContact(
            data.participants.filter(
              (participant) => participant.id !== user.user_id
            )[0]
          ),
            setLoading(false);
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessages();
  }, [chat]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Lottie animationData={loadingAnimation} style={{ width: "300px" }} />
        </div>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center bg-secondary py-2">
            {!loading && (
              <>
                <Link className="text-decoration-none text-light fw-bold d-flex flex-column align-items-center">
                  <Image
                    src={contact.profile_image}
                    roundedCircle
                    width={75}
                    height={75}
                  />
                  {contact.full_name}
                  <p className="m-0">{contact.username}</p>
                </Link>
                {contact.bio && <p className="m-0">{contact.bio}</p>}
                <Link className="text-decoration-none text-light fw-bold bg-success rounded-pill py-1 px-2 mt-2">
                  Visit profile
                </Link>
              </>
            )}
          </div>
          {messages.length > 0 ? (
            <div
              className="my-2 d-flex flex-column-reverse"
              style={{
                backgroundImage: chatBg,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  <div className="d-flex w-100 flex-column">
                    <div
                      className={`mx-2 d-flex ${
                        message.sender.id === user.user_id
                          ? "flex-column"
                          : "align-items-center"
                      }`}
                    >
                      {message.sender.id !== user.user_id && (
                        <Image
                          src={message.sender.profile_image}
                          roundedCircle
                          width={50}
                          height={50}
                        />
                      )}
                      <div
                        className={`d-flex ${
                          message.sender.id === user.user_id
                            ? "bg-success me-2 align-self-end"
                            : "bg-secondary ms-2 align-self-start"
                        } rounded my-1`}
                        style={{ maxWidth: "50%" }}
                      >
                        {message.body ? (
                          <p className={`m-2 text-light small`}>
                            {message.body}
                          </p>
                        ) : message.attachment ? (
                          isImage(message.attachment) ? (
                            <Image
                              src={message.attachment}
                              rounded
                              style={{ maxWidth: "100%" }}
                            />
                          ) : (
                            "File"
                          )
                        ) : (
                          "Post"
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            "nothing yet"
          )}
          <div ref={messagesEndRef}></div>
        </>
      )}
    </div>
  );
};

export default Chat;
