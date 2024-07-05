import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
const LeftSidebar = ({ owner }) => {
  return (
    <div className="d-flex flex-column bg-light rounded p-2 m-2">
      <div className="d-flex align-items-center">
        <Image
          src={owner.profile_image}
          alt="profile picture"
          roundedCircle
          className="me-1"
          style={{ width: "50px", height: "auto" }}
        ></Image>
        <div className="d-flex flex-column">
          <Link
            className="text-decoration-none text-dark"
            style={{ fontWeight: 500 }}
          >
            {owner.full_name}
          </Link>
          {owner.bio ? (
            <div>
              <p className="text-secondary m-0">{owner.bio}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr className="mx-3" />
      <div>
        <p className="text-secondary">Top friends</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
