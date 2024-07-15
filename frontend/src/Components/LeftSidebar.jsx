import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
const LeftSidebar = ({ owner }) => {
  return (
    <div className="py-2 position-fixed top-25 start-0 w-25">
      <div className="d-flex flex-column bg-light rounded p-2 mx-2">
        <div className="d-flex align-items-center">
          <Image
            src={owner.profile_image}
            alt="profile picture"
            roundedCircle
            className="me-1"
            width={50}
            height={50}
          />
          <div className="d-flex flex-column">
            <Link
              className="text-decoration-none text-dark"
              style={{ fontWeight: 500 }}
              to={`/profiles/${owner.id}`}
            >
              {owner.full_name}
            </Link>
            {owner.bio && (
              <div>
                <p className="text-secondary m-0">{owner.bio}</p>
              </div>
            )}
          </div>
        </div>
        <hr className="mx-3" />
        {owner.top_friends ? (
          <div>
            <p className="text-secondary m-0">Top friends</p>
            <div className="d-flex flex-column mx-1">
              {owner.top_friends.map((friend, index) => (
                <Link
                  key={index}
                  className="text-decoration-none text-success"
                  style={{ fontWeight: 500 }}
                >
                  {friend.full_name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column mx-1">{"No friends yet :("}</div>
        )}
        <hr className="mx-3 my-2" />
        <div className="">
          <Link
            className="text-decoration-none mx-1 text-success"
            style={{ fontWeight: 500 }}
          >
            Discover friends
          </Link>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-between mx-3">
          <Link className="text-secondary me-1">Privacy terms</Link>
          <Link className="text-secondary me-1">Advertising</Link>
          <Link className="text-secondary me-1">Cookies</Link>
        </div>
        <p className="ms-3 my-0 text-secondary">CoNEXT © 2024</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
