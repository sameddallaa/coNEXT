import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SiteNavbar from "./SiteNavbar";
import { Row, Col } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import axios from "axios";
const Profile = () => {
  const { profileId } = useParams();
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const [profile, setProfile] = useState({});
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
      <Row className="m-0">Profile {profileId}</Row>
    </>
  );
};

export default Profile;
