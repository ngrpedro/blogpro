import React from "react";

const Messages = ({ message, type }) => {
  console.log(type);
  return (
    <>
      {type === "error" ? (
        <div
          className={`bg-red-700 p-8 rounded-lg border-2 border-red-900 text-white`}
        >
          {message}
        </div>
      ) : (
        <div
          className={`bg-green-700 p-8 rounded-lg border-2 border-green-900 text-white`}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Messages;
