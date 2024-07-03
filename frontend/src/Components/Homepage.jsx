import React, { useState, useEffect, useContext } from "react";
import SiteNavbar from "./SiteNavbar";
import AddPost from "./AddPost";
import AuthContext from "../Contexts/AuthContext";
import Feed from "./Feed";
import img from "../assets/img/pfp.jpg";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
const Homepage = () => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    async function fetchFeed() {
      try {
        const FEED_ENDPOINT = `http://localhost:8000/api/users/feed/${user.user_id}`;
        const response = await axios.get(FEED_ENDPOINT, {
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
      }
    }
    fetchFeed();
  }, []);

  return (
    <div className="bg-secondary">
      <Row className="m-0">
        <SiteNavbar />
      </Row>
      <Row className="px-3 m-0">
        <AddPost />
        {feed ? <Feed posts={feed.posts} /> : <div>Homepage</div>}
      </Row>
    </div>
  );
};

export default Homepage;
