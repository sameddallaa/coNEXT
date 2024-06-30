import React from "react";
import SiteNavbar from "./SiteNavbar";
import AddPost from "./AddPost";
import Post from "./Post";
import Feed from "./Feed";
import img from "../assets/img/pfp.jpg";
import { Row, Col } from "react-bootstrap";

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
  const posts = [
    {
      owner: "John Doe",
      content: "This is a test post.\nI hope you like it!",
      posted_at: new Date(Date.now() - 21600000000),
      attachment: null,
      likes: 5,
      comment_count: 2,
      comments: [
        {
          owner: "Jane Smith",
          content: "I agree with you!",
          posted_at: new Date(),
        },
        {
          owner: "Mike Johnson",
          content: "Thanks for your feedback!",
          posted_at: new Date(),
        },
      ],
    },
    {
      owner: "Jane Smith",
      content:
        "This is another test post.\nI'm excited to see what else I can create!",
      posted_at: new Date(Date.now() - 18900000000),
      attachment: null,
      likes: 8,
      comment_count: 1,
      comments: [
        {
          owner: "Mike Johnson",
          content: "I agree with you!",
          posted_at: new Date(),
        },
      ],
    },
    {
      owner: "Mike Johnson",
      content: "This is a third test post.\nI'm really proud of you!",
      posted_at: new Date(Date.now() - 1577836800000),
      attachment: null,
      likes: 3,
      comment_count: 0,
      comments: [],
    },
    {
      owner: "Sarah Brown",
      content:
        "This is a fourth test post.\nI'm really grateful for your help!",
      posted_at: new Date(Date.now() - 1262304000000),
      attachment: null,
      likes: 7,
      comment_count: 3,
      comments: [
        {
          owner: "John Doe",
          content: "Thank you for your kind words!",
          posted_at: new Date(),
        },
        {
          owner: "Mike Johnson",
          content: "I'm glad I could help!",
          posted_at: new Date(),
        },
        {
          owner: "Sarah Brown",
          content: "I'm proud of you too!",
          posted_at: new Date(),
        },
      ],
    },
  ];
  return (
    <div className="bg-secondary">
      <Row className="m-0">
        <SiteNavbar />
      </Row>
      <Row className="px-3 m-0">
        <AddPost />
        <Feed posts={posts} />
        <div>Homepage</div>
      </Row>
    </div>
  );
};

export default Homepage;
