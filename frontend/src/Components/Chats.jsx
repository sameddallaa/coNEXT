import React from "react";
import ChatsSidebar from "./ChatsSidebar";
import { Row, Col } from "react-bootstrap";

const Chats = () => {
  return (
    <Row>
      <Col xs={3}>
        <ChatsSidebar />
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Chats;
