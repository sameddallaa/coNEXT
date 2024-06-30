import React from "react";
import SiteNavbar from "./SiteNavbar";
import AddPost from "./AddPost";
import Post from "./Post";
import img from "../assets/img/pfp.jpg";

const Homepage = () => {
  // owner, content, posted_at, attachment, likes, comments
  const post = {
    owner: "John Doe",
    content:
      "Last night was one for the history books :)\nThank you @samantha_br13 for everything.",
    posted_at: new Date(Date.now() - 30525800000),
    attachment: img,
    likes: 10,
    comment_count: 3,
    comments: [
      {
        owner: "Jane Smith",
        content: "Nice post!",
        posted_at: new Date(),
      },
      {
        owner: "Mike Johnson",
        content: "I agree with Jane!",
        posted_at: new Date(),
      },
      {
        owner: "Sarah Brown",
        content: "I love your post!",
        posted_at: new Date(),
      },
    ],
  };
  return (
    <div className="bg-secondary">
      <SiteNavbar />
      <AddPost />
      <Post post={post} />
      <div>Homepage</div>
    </div>
  );
};

export default Homepage;
