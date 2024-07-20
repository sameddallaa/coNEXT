import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import SiteNavbar from "./SiteNavbar";
import { Row, Col, Image, Button, Form, InputGroup } from "react-bootstrap";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const Profile = () => {
  const { profileId } = useParams();
  const { user } = useContext(AuthContext);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const handleChange = (e) => {};
  useEffect(() => {
    async function fetchProfile() {
      try {
        const PROFILE_ENDPOINT = `http://localhost:8000/api/users/${profileId}`;
        const response = await axios.get(PROFILE_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokens.access,
          },
        });
        const data = response.data;
        if (response.status === 200) {
          setProfile(data);
          console.log(data);
          setLoading(false);
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile();
  }, [profileId]);
  return (
    <>
      <Row className="m-0">
        <SiteNavbar />
      </Row>
      <Row className="m-0 d-flex justify-content-center align-items-center">
        {loading ? (
          <Lottie animationData={loadingAnimation} style={{ width: "300px" }} />
        ) : (
          <Col className="position-sticky top-25">
            <div className="p-3">
              <div className="d-flex flex-column w-25">
                <div className="bg-secondary rounded-top py-3 d-flex justify-content-center">
                  <div className="position-relative">
                    <Image
                      src={profile.profile_image}
                      width={150}
                      height={150}
                      roundedCircle
                    />
                    {editing && (
                      <span
                        className="bg-light text-success rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "30px",
                          height: "30px",
                          position: "absolute",
                          top: "4px",
                          left: "4px",
                        }}
                      >
                        <FaPencil />
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="pb-3 px-2 rounded-bottom"
                  style={{ backgroundColor: "#e3e3e3" }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <span className="mt-2 fw-bold">
                      {!editing ? (
                        profile.full_name
                      ) : (
                        <Form className="d-flex px-2">
                          <Form.Control
                            type="text"
                            value={profile.first_name}
                            onChange={handleChange}
                            className="m-1"
                          />
                          <Form.Control
                            type="text"
                            value={profile.last_name}
                            onChange={handleChange}
                            className="m-1"
                          />
                        </Form>
                      )}
                    </span>
                    <span className="text-secondary">
                      {!editing ? (
                        `@${profile.username}`
                      ) : (
                        <Form className="my-1">
                          <InputGroup>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control
                              type="text"
                              value={profile.username}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form>
                      )}
                    </span>
                  </div>
                  <p className="m-1 px-1">
                    {!editing ? (
                      profile.bio
                    ) : (
                      <Form>
                        <Form.Control
                          as="textarea"
                          value={profile.bio}
                          onChange={handleChange}
                        />
                      </Form>
                    )}
                  </p>
                  <Link className="mx-2 text-decoration-none text-dark">
                    {profile.friends.length} friends
                  </Link>
                  <div className="d-flex justify-content-center mt-3">
                    {profile.id === user.user_id ? (
                      <Button
                        className="rounded-pill mx-1"
                        variant="success"
                        onClick={() => {
                          setEditing((prevEditing) => !prevEditing);
                        }}
                      >
                        {editing ? "Save changes" : "Edit profile"}
                      </Button>
                    ) : (
                      <Button className="rounded-pill mx-1" variant="success">
                        Edit profile
                      </Button>
                    )}
                    <Button
                      className="rounded-pill mx-1"
                      variant="outline-success"
                    >
                      Send message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Profile;
