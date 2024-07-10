import React, { createContext, useState } from "react";

const UtilsContext = createContext();
export default UtilsContext;

export const UtilsProvider = ({ children }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    if (interval === 1) {
      return `a year ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    if (interval === 1) {
      return `a month ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    if (interval === 1) {
      return `a day ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    if (interval === 1) {
      return `an hour ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    if (interval === 1) {
      return `a minute ago`;
    }

    if (seconds > 1) {
      return `${seconds} seconds ago`;
    }
    return `just now`;
  };
  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/svg+xml",
  ];

  const isImage = (file) => {
    const pattern = /\.(jpg|jpeg|png|gif|svg)$/i;
    return pattern.test(file);
  };

  const contextData = {
    timeAgo: timeAgo,
    isImage: isImage,
  };
  return (
    <UtilsContext.Provider value={contextData}>
      {children}
    </UtilsContext.Provider>
  );
};
