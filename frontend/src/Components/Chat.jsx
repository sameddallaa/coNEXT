import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Image, Form, InputGroup, Button } from "react-bootstrap";
import AuthContext from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import UtilsContext from "../Contexts/UtilsContext";
import { Link } from "react-router-dom";
import chatBg from "../assets/img/chatBg.jpg";
import { FaImage, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import PostSnippet from "./PostSnippet";
import NoMessagesYet from "./NoMessagesYet";
const Chat = ({ messages, setMessages, chatId }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const { isImage } = useContext(UtilsContext);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [contact, setContact] = useState({});
  const [message, setMessage] = useState({
    chat: chatId,
    sender: user.user_id,
    receiver: "",
    body: "",
    attachment: null,
  });
  const messagesEndRef = useRef(null);
  const bodyRef = useRef("");
  const imageRef = useRef(null);
  const fileRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    setChat(chatId);
  }, [chatId]);
  useEffect(() => {
    setMessage((prevMessage) => ({ ...prevMessage, receiver: contact.id }));
  }, [contact]);

  useEffect(() => {
    async function fetchContact() {
      if (chat) {
        try {
          const PARTICIPANTS_ENDPOINT = `http://localhost:8000/api/chats/${chat}/participants`;
          const response = await axios.get(PARTICIPANTS_ENDPOINT, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access}`,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setContact(
              data.filter((participant) => participant.id !== user.user_id)[0]
            );
          } else {
            console.log("something went wrong");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchContact();
  }, [chat]);

  useEffect(() => {
    async function fetchMessages() {
      if (chat) {
        if (!hasMore) return;
        try {
          const MESSAGES_ENDPOINT = `http://localhost:8000/api/chats/${chat}/messages?page=${currentPage}`;
          const response = await axios.get(MESSAGES_ENDPOINT, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access}`,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setMessages(data.results);
            setLoading(false);
            if (data.results.length < 50) setHasMore(false);
          } else {
            console.log("something went wrong");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchMessages();
  }, [chat, contact, message, currentPage]);

  useEffect(() => {
    if (chat) {
      const messageList = document.getElementById("messagesContainer");
      const handleScroll = () => {
        if (messageList.scrollTop < 100 && hasMore) {
          setCurrentPage((currentPage) => currentPage + 1);
        }
      };
      messageList.addEventListener("scroll", handleScroll);
      return () => messageList.removeEventListener("scroll", handleScroll);
    }
  }, [hasMore]);

  useEffect(() => {
    setMessage((prevMessage) => ({ ...prevMessage, receiver: contact.id }));
  }, [contact]);
  useEffect(() => {
    const initializeWebSocket = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      const WEBSOCKET_URL = `ws://localhost:8000/ws/chat/${chat}/`;
      socketRef.current = new WebSocket(WEBSOCKET_URL);
      socketRef.current.onopen = (e) => {
        console.log("connection opened!");
      };
      socketRef.current.onclose = (e) => {
        console.log("connection closed!");
      };
      socketRef.current.onerror = (e) => {
        console.log("WebSocket error occurred!", e);
      };
      socketRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    };
    initializeWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [chat]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleChange = (e) => {
    if (e.target.name === "body") {
      setMessage((prevMessage) => ({ ...prevMessage, body: e.target.value }));
      console.log(message);
    } else if (e.target.name === "image" || e.target.name === "file") {
      setMessage((prevMessage) => ({
        ...prevMessage,
        body: e.target.files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socketRef.current.send(JSON.stringify(message));

    bodyRef.current.value = "";
    imageRef.current.value = null;
    fileRef.current.value = null;
  };
  return (
    <>
      {!chat ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p>Please pick a contact</p>
        </div>
      ) : (
        <div style={{ backgroundImage: "url('../assets/img/chatBg.jpg')" }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Lottie
                animationData={loadingAnimation}
                style={{ width: "300px" }}
              />
            </div>
          ) : (
            <>
              <div className="d-flex flex-column align-items-center justify-content-center bg-secondary py-2 px-0">
                {!loading && (
                  <Row className="m-0 d-flex justify-content-center">
                    <Link
                      className="text-decoration-none text-light fw-bold d-flex flex-column align-items-center"
                      to={`/profiles/${contact.id}`}
                    >
                      <Image
                        src={contact.profile_image}
                        roundedCircle
                        width={75}
                        height={75}
                      />
                      {contact.full_name}
                      <p className="m-0">{contact.username}</p>
                      {contact.bio && (
                        <p
                          className="my-1 fw-light "
                          style={{ maxWidth: "25%", wordWrap: "break-word" }}
                        >
                          {contact.bio}
                        </p>
                      )}
                    </Link>
                    <Button
                      variant="success"
                      className="rounded-pill py-1 px-2 mt-2"
                    >
                      <Link
                        className="text-decoration-none text-light fw-bold d-flex justify-content-center"
                        to={`/profiles/${contact.id}`}
                      >
                        Visit profile
                      </Link>
                    </Button>
                  </Row>
                )}
              </div>
              {messages.length > 0 ? (
                <Row>
                  <div
                    className="my-2 d-flex flex-column-reverse"
                    style={{
                      backgroundImage: chatBg,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    id="messagesContainer"
                  >
                    {messages.map((message, index) => (
                      <React.Fragment key={index}>
                        <div className="d-flex w-100 flex-column">
                          <div
                            className={`mx-2 d-flex ${
                              message.sender.id === user.user_id
                                ? "flex-column"
                                : "align-items-end"
                            }`}
                          >
                            {message.sender.id !== user.user_id && (
                              <Image
                                src={message.sender.profile_image}
                                roundedCircle
                                width={35}
                                height={35}
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
                                  <Link
                                    className="rounded pt-4 text-decoration-none text-dark"
                                    style={{ backgroundColor: "#e2e6e9" }}
                                    to={message.attachment}
                                  >
                                    <div className="d-flex align-items-center justify-content-center m-4">
                                      <FaPaperclip />
                                    </div>
                                    <div
                                      className="text-success d-flex justify-content-center align-items-center p-2 rounded-bottom fw-bold"
                                      style={{
                                        wordWrap: "break-word",
                                        backgroundColor: "#bbc4d4",
                                      }}
                                    >
                                      {message.attachment.split("/").pop()}
                                    </div>
                                  </Link>
                                )
                              ) : (
                                <PostSnippet post={message.post} />
                              )}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </Row>
              ) : (
                <Row className="m-0">
                  <NoMessagesYet />
                </Row>
              )}
              <div ref={messagesEndRef}></div>
            </>
          )}
          <div
            className="position-sticky bottom-0 py-1"
            style={{ backgroundColor: "aliceblue" }}
          >
            <Form className="w-100 px-2" onSubmit={handleSubmit}>
              <InputGroup className="m-0 p-0">
                <Form.Control
                  type="text"
                  placeholder="Type in a message"
                  name="body"
                  ref={bodyRef}
                  onChange={handleChange}
                />
                <InputGroup.Text style={{ backgroundColor: "white" }}>
                  <Form.Control
                    type="file"
                    id="imageInput"
                    className="d-none"
                    accept="image/*"
                    ref={imageRef}
                    name="image"
                    onChange={handleChange}
                  />
                  <Form.Label
                    className="m-0 d-flex align-items-center"
                    htmlFor="imageInput"
                  >
                    <FaImage id="imageInput" />
                  </Form.Label>
                </InputGroup.Text>
                <InputGroup.Text style={{ backgroundColor: "white" }}>
                  <Form.Control
                    type="file"
                    id="fileInput"
                    className="d-none"
                    accept=".pdf, .txt, .doc, video/*"
                    ref={fileRef}
                    name="file"
                    onChange={handleChange}
                  />
                  <Form.Label
                    htmlFor="fileInput"
                    className="m-0 d-flex align-items-center"
                  >
                    <FaPaperclip />
                  </Form.Label>
                </InputGroup.Text>
                <InputGroup.Text style={{ backgroundColor: "white" }}>
                  <Button
                    variant="light"
                    className="p-0 d-flex align-items-center"
                    type="submit"
                  >
                    <FaPaperPlane />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
