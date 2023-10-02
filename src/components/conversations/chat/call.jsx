import React from "react";

const CallComp = ({ conversationDetails, selfVideo, remoteVideo }) => {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <video playsInline ref={remoteVideo} autoPlay />
      <video playsInline muted ref={selfVideo} autoPlay />
    </div>
  );
};

export default CallComp;
