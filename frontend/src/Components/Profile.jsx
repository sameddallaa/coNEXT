import React from "react";
import { useParams } from "react-router";
import SiteNavbar from "./SiteNavbar";
import { Row, Col } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
const Profile = () => {
  const { profileId } = useParams();
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
