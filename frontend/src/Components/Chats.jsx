import React, { useState } from "react";
import ChatsSidebar from "./ChatsSidebar";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import SiteNavbar from "./SiteNavbar";
import Chat from "./Chat";

const Chats = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(chatId);
  return (
    <>
      <Row className="m-0">
        <Col xs={4} className="p-0 vh-100 overflow-auto">
          <ChatsSidebar messages={messages} setChat={setChat} />
        </Col>
        <Col className="p-0 m-0 vh-100 overflow-auto">
          <Chat chatId={chat} messages={messages} setMessages={setMessages} />
        </Col>
      </Row>
    </>
  );
};

export default Chats;
