import React, { useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import SiteNavbar from "./SiteNavbar";
import AuthContext from "../Contexts/AuthContext";

const Friends = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    async function fetchFriends(){
        c
    }
  }, [friends]);

  return (
    <>
      <Row>
        <SiteNavbar />
      </Row>
      <Row>
        <h1>{user.name}'s Friends</h1>
      </Row>
    </>
  );
};

export default Friends;
