import React from "react";
import Lottie from "lottie-react";
import nothingYet from "../assets/animations/nothingYet.json";
const NoMessagesYet = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Lottie animationData={nothingYet} />
    </div>
  );
};

export default NoMessagesYet;
