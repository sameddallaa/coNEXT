import React, { useState } from "react";
import ChatsSidebar from "./ChatsSidebar";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Chat from "./Chat";

const Chats = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(chatId);
  return (
    <Row className="m-0">
      <Col xs={4} className="p-0 vh-100 overflow-auto">
        <ChatsSidebar setChat={setChat} />
      </Col>
      <Col className="p-0 vh-100 overflow-auto">
        <Chat chat={chat} />
      </Col>
    </Row>
  );
};

export default Chats;
