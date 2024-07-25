import React, { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import SiteNavbar from "./SiteNavbar";
import AuthContext from "../Contexts/AuthContext";
import axios from "axios";
import { useParams } from "react-router";
import Friend from "./Friend";
import Lottie from "lottie-react";
import noFriendAnimation from "../assets/animations/noFriends.json";
const Friends = () => {
  const { user } = useContext(AuthContext);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const [friends, setFriends] = useState([]);
  const [profile, setProfile] = useState({});
  const { user_id } = useParams();
  const [userId, setUserId] = useState(user_id ? user_id : user.user_id);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  useEffect(() => {
    async function fetchProfile() {
      if (userId != user.user_id) {
        const PROFILE_ENDPOINT = `http://localhost:8000/api/users/${userId}`;
        try {
          const response = await axios.get(PROFILE_ENDPOINT, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access}`,
            },
          });
          if (response.status === 200) {
            const { data } = response;
            console.log(data);
            setProfile(data);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setProfile(user);
      }
    }
    fetchProfile();
  }, [userId]);
  useEffect(() => {
    async function fetchFriends() {
      const FRIENDS_ENDPOINT = `http://localhost:8000/api/users/${userId}/friends`;
      try {
        const response = await axios.get(FRIENDS_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        if (response.status === 200) {
          const { data } = response;
          setFriends(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchFriends();
  }, [userId]);

  return (
    <>
      <Row className="m-0">
        <SiteNavbar />
      </Row>
      <Row className="mx-1 p-0">
        <div className="py-2 bg-secondary vh-100 mt-1 rounded-top">
          <h1>
            {profile?.user_id ? "Your" : profile.full_name + "'s"} friends
          </h1>
          <div className="d-flex flex-column align-items-center">
            {friends.length > 0 ? (
              friends.map((friend, index) => {
                return (
                  <Friend
                    friend={friend}
                    setFriends={setFriends}
                    key={index}
                    userId={userId}
                  />
                );
              })
            ) : (
              <>
                <Lottie
                  animationData={noFriendAnimation}
                  style={{ width: "240px" }}
                />
                <h3 className="text-light">No friends, yet</h3>
              </>
            )}
          </div>
        </div>
      </Row>
    </>
  );
};

export default Friends;
