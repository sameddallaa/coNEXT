import React from "react";
import SiteNavbar from "./SiteNavbar";
import AddPost from "./AddPost";

const Homepage = () => {
  return (
    <div className="bg-secondary">
      <SiteNavbar />
      <AddPost />
      <div>Homepage</div>
    </div>
  );
};

export default Homepage;
