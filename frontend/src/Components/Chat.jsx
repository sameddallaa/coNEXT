import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import UtilsContext from "../Contexts/UtilsContext";
const Chat = ({ chat }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const { isImage } = useContext(UtilsContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

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
          console.log(data.messages);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="vh-100">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Lottie animationData={loadingAnimation} style={{ width: "300px" }} />
        </div>
      ) : messages.length > 0 ? (
        <div className="d-flex flex-column-reverse">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className="d-flex w-100 flex-column">
                <div
                  className={`d-flex ${
                    message.sender.id === user.user_id
                      ? "bg-success align-self-end"
                      : "bg-secondary align-self-start"
                  } rounded my-1`}
                  style={{ maxWidth: "50%" }}
                >
                  {message.body ? (
                    <p className={`m-2 text-light small`}>{message.body}</p>
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
            </React.Fragment>
          ))}
        </div>
      ) : (
        "nothing yet"
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Chat;
