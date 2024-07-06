import React from "react";
import Post from "./Post";
import { Form } from "react-bootstrap";
const Feed = ({ posts, image }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} image={image} />
      ))}
    </div>
  );
};

export default Feed;
