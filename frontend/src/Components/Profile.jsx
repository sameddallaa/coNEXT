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
import Post from "./Post";
import AddPost from "./AddPost";
const Profile = () => {
  const { profileId } = useParams();
  const { user, profileImage } = useContext(AuthContext);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(false);
  const handleChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const PROFILE_ENDPOINT = `http://localhost:8000/api/users/${user.user_id}/edit`;
      const response = await axios.put(PROFILE_ENDPOINT, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      if (response.status === 200) {
        console.log("success");
        setProfileUpdated((prevUpdated) => !prevUpdated);
      }
    } catch (err) {
      const { response } = err;
      if (response) {
        const { data } = response;
        setErrors(data);
      }
    }
  };
  useEffect(() => {
    if (editing) {
      setErrors({});
    }
  }, [editing]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        username: profile.username,
        // profile_image: profile.profile_image,
      });
    }
  }, [profile]);
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
          setProfileData(data);
          console.log(data);
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile();
  }, [profileId, profileUpdated]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const POSTS_ENDPOINT = `http://localhost:8000/api/users/${profile.id}/posts`;
        const response = await axios.get(POSTS_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        const data = response.data;
        if (response.status === 200) {
          setPosts(data);
          console.log(data);
          setLoading(false);
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [profile]);
  return (
    <>
      <Row className="m-0 sticky-top">
        <SiteNavbar />
      </Row>
      <Row className="m-0 d-flex justify-content-center">
        {loading ? (
          <Lottie animationData={loadingAnimation} style={{ width: "300px" }} />
        ) : (
          <>
            <Col className="vh-100" lg={4}>
              <div className="p-3">
                <div className="d-flex flex-column">
                  <div
                    className="rounded-top py-3 d-flex justify-content-center"
                    style={{ backgroundColor: "#969696" }}
                  >
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
                              defaultValue={profile.first_name}
                              onChange={handleChange}
                              name="first_name"
                              className="m-1"
                            />
                            <Form.Control
                              type="text"
                              defaultValue={profile.last_name}
                              onChange={handleChange}
                              name="last_name"
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
                                name="username"
                                defaultValue={profile.username}
                                onChange={handleChange}
                              />
                            </InputGroup>
                          </Form>
                        )}
                      </span>
                    </div>
                    {!editing ? (
                      <p className="m-1 fs-5">{profile.bio}</p>
                    ) : (
                      <Form>
                        <Form.Control
                          as="textarea"
                          defaultValue={profile.bio}
                          onChange={handleChange}
                          name="bio"
                        />
                      </Form>
                    )}
                    <Link className="mx-2 text-decoration-none text-dark">
                      {profile.friends.length} friends
                    </Link>
                    {errors && !editing && (
                      <div className="">
                        {Object.keys(errors).map((error, index) => (
                          <>
                            <span className="text-danger" key={index}>
                              {errors[error]}
                            </span>
                            <br />
                          </>
                        ))}
                      </div>
                    )}
                    <div className="d-flex justify-content-center mt-3">
                      {profile.id === user.user_id ? (
                        editing ? (
                          <Button
                            className="rounded-pill mx-1"
                            variant="success"
                            onClick={(e) => {
                              setEditing((prevEditing) => !prevEditing);
                              handleSubmit(e);
                            }}
                          >
                            Save changes
                          </Button>
                        ) : (
                          <Button
                            className="rounded-pill mx-1"
                            variant="success"
                            onClick={() => {
                              setEditing((prevEditing) => !prevEditing);
                            }}
                          >
                            Edit profile
                          </Button>
                        )
                      ) : (
                        <Button className="rounded-pill mx-1" variant="success">
                          Add friend
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
            </Col>
            <Col>
              <div className="m-3 p-2 rounded bg-secondary">
                <AddPost image={profileImage} />
                <span className="ms-3 text-light">
                  {profile.first_name}'s posts
                </span>
                {posts?.map((post, index) => (
                  <Post image={profile.profile_image} post={post} key={index} />
                ))}
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default Profile;
