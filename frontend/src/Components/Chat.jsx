import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
const Chat = ({ chat }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <div className="vh-100">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Lottie animationData={loadingAnimation} style={{ width: "300px" }} />
        </div>
      ) : messages.length > 0 ? (
        messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.sender.id === user.user_id ? (
              <div className="bg-success">hi</div>
            ) : (
              <div className="bg-secondary">hello</div>
            )}
          </React.Fragment>
        ))
      ) : (
        "nothing yet"
      )}
    </div>
  );
};

export default Chat;
