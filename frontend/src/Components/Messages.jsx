import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Messages = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className="text-success w-25 px-3 py-2 rounded-top d-flex align-items-center justify-content-between me-1"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        backgroundColor: "aliceblue",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      <p className="m-0">Messages</p>
      {toggle ? (
        <IoIosArrowUp
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      ) : (
        <IoIosArrowDown
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      )}
    </div>
  );
};

export default Messages;
