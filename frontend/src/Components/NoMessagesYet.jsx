import React from "react";
import Lottie from "lottie-react";
import nothingYet from "../assets/animations/nothingYet.json";
const NoMessagesYet = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Lottie animationData={nothingYet} className="w-50" />
    </div>
  );
};

export default NoMessagesYet;
