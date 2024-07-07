import React, { useState, useEffect, useContext } from "react";
import SiteNavbar from "./SiteNavbar";
import AddPost from "./AddPost";
import AuthContext from "../Contexts/AuthContext";
import Feed from "./Feed";
import img from "../assets/img/pfp.jpg";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import LeftSidebar from "./LeftSidebar";
import Messages from "./Messages";
const Homepage = () => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFeed() {
      try {
        const HOME_ENDPOINT = `http://localhost:8000/api/users/feed/${user.user_id}`;
        const response = await axios.get(HOME_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setFeed(data);
        }
      } catch (error) {
        console.error(error);
        console.log(token.access);
      } finally {
        setLoading(false);
        console.log("Fetch completed");
        console.log(feed);
      }
    }
    fetchFeed();
  }, [user.user_id, token.access]);

  return (
    <div className="" style={{ backgroundColor: "#a0a0a0" }}>
      <Row className="m-0 sticky-top">
        <SiteNavbar />
      </Row>
      <Row className="px-0 m-0 mt-2 d-flex justify-content-center">
        {loading ? (
          <Lottie animationData={loadingAnimation} className="w-50" />
        ) : feed ? (
          <>
            <Col xs={3} className="px-0">
              <LeftSidebar owner={feed} />
            </Col>
            <Col>
              <AddPost image={feed.profile_image} />
              {feed ? (
                <Feed posts={feed.posts} image={feed.profile_image} />
              ) : (
                <div>Homepage</div>
              )}
            </Col>
          </>
        ) : (
          "nothing yet"
        )}
      </Row>
    </div>
  );
};

export default Homepage;
