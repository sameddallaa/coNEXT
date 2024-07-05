import React from "react";
import Post from "./Post";
import { Form } from "react-bootstrap";
const Feed = ({ posts, image }) => {
  return (
    <div>
      <Form
        className="d-flex justify-content-end align-items-center p-2"
        style={{
          border: "none",
        }}
      >
        <Form.Select
          style={{
            border: "none",
          }}
          className="text-secondary justify-content-end custom-select w-25"
        >
          <option selected>Sort by</option>
          <option value={"top"}>Top</option>
          <option value={"recent"}>Recent</option>
        </Form.Select>
      </Form>

      {posts.map((post, index) => (
        <Post key={index} post={post} image={image} />
      ))}
    </div>
  );
};

export default Feed;
