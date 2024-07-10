import React, { useState } from "react";
import ChatsSidebar from "./ChatsSidebar";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Chat from "./Chat";

const Chats = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(chatId);
  return (
    <Row>
      <Col xs={4} className="vh-100" style={{ overflowY: "auto" }}>
        <ChatsSidebar setChat={setChat} />
      </Col>
      <Col className="vh-100" style={{ overflowY: "auto" }}>
        <Chat chat={chat} />
      </Col>
    </Row>
  );
};

export default Chats;
