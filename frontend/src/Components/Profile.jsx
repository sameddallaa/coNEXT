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
      <Row className="m-0 sticky-top">
        <SiteNavbar />
      </Row>
      <Row className="m-0">
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
              <div className="m-3 p-3 rounded bg-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                amet magnam harum illum maxime libero velit, molestiae corrupti
                voluptatem animi cumque possimus eaque facilis at rerum pariatur
                quisquam vitae dolorem eos! Autem voluptatum libero velit,
                voluptates natus dicta fugiat cum expedita obcaecati nisi eos
                incidunt provident optio adipisci! Provident consequatur
                voluptatum obcaecati praesentium exercitationem voluptates,
                cumque delectus quibusdam cupiditate amet ipsam voluptate
                molestiae inventore. Soluta, id maxime! Dolore dolorum
                consequatur totam officiis corporis sapiente ullam unde ipsum
                eveniet. Molestias accusantium dolorum commodi obcaecati
                officiis distinctio fugiat vitae et, eos ratione facilis ad enim
                hic temporibus nemo eius soluta dicta aspernatur earum placeat
                optio nesciunt assumenda. At sint delectus numquam ad saepe
                voluptas veniam veritatis iste. Maxime tempore rem quod suscipit
                cum quam, voluptate fugit eum nostrum eligendi quia odit a
                veniam obcaecati odio soluta eaque qui labore pariatur, placeat
                vel voluptatibus nobis iste. Aliquam, odit animi. Rem similique
                corporis iste odio veniam accusamus odit beatae ex, ullam modi
                distinctio voluptate autem cumque laborum mollitia consequuntur
                cupiditate deleniti ut culpa quod deserunt ipsum sint facilis
                dignissimos. Eveniet ex delectus doloremque maxime qui eos
                ratione eum harum soluta maiores ab, at rem minus animi dicta
                quidem atque iusto neque vero necessitatibus distinctio odio?
                Esse ex similique soluta omnis atque commodi tenetur in!
                Sapiente earum repellat quis molestias ea veniam quam tenetur
                aliquam error iure ex facere dolore vitae, asperiores veritatis
                libero dolor illum iste quae, beatae voluptas eaque assumenda
                consequatur! Molestiae aliquam, delectus sapiente cupiditate
                quidem explicabo distinctio magni at sed architecto quam harum
                dignissimos possimus laborum beatae atque ratione et earum quo
                ducimus quos excepturi sint facere? Obcaecati dolore voluptates
                vitae sequi rerum possimus architecto id consectetur, fuga modi
                aliquam quo amet delectus quas. Laborum vero quae in, adipisci
                enim pariatur at autem labore fugit modi cumque! Accusantium
                aliquam alias sit ipsa repellat quam porro accusamus doloremque?
                Aspernatur molestiae facere facilis vel itaque deleniti quis
                nesciunt quibusdam consequatur? Quasi aperiam dolor voluptas
                numquam aliquid saepe fuga esse culpa molestias, libero
                laboriosam perferendis error quod beatae! Ullam deserunt, quis
                sequi explicabo beatae est magni laboriosam. Placeat quisquam
                inventore ipsa accusamus voluptatem voluptatibus quas officia,
                consequuntur id eveniet optio corporis excepturi sit delectus
                voluptates accusantium facilis provident, debitis explicabo cum?
                Earum, aperiam. Recusandae esse eius ea praesentium dolorum qui
                quibusdam ratione maxime quidem mollitia molestiae temporibus
                reiciendis, cum provident nisi soluta earum voluptatibus autem,
                corrupti fugiat aliquid veniam. Sunt expedita at, obcaecati
                inventore alias maxime, quam deleniti enim ad sit nihil ducimus
                quia repudiandae aut non facere unde temporibus nisi, soluta
                impedit asperiores molestiae eligendi. Voluptatum, laboriosam!
                Maxime qui reprehenderit accusantium non libero blanditiis
                perferendis labore autem deserunt totam? Quae adipisci, commodi
                laudantium officia excepturi in voluptate nobis esse laboriosam
                voluptatum sequi inventore aspernatur minus a nam praesentium,
                sed, eius reiciendis cum nulla quas doloribus quidem numquam.
                Similique recusandae ullam officia tempora? Porro consequuntur
                ex dolores molestias odit sequi esse exercitationem ut quo eaque
                ipsa itaque labore placeat voluptates, reprehenderit nostrum
                neque ullam pariatur. Nulla distinctio corporis qui dolorum
                quaerat dignissimos maxime reprehenderit!
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default Profile;
