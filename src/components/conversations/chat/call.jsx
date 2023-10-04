import React, { useEffect } from "react";

const CallComp = ({ conversationDetails, selfVideo, remoteVideo, endCall }) => {
  console.log(conversationDetails);
  return (
    <div className="flex flex-col w-screen justify-between h-screen ">
      {remoteVideo && (
        <video
          className="h-[calc(100vh-70px)]"
          playsInline
          ref={remoteVideo}
          autoPlay
        />
      )}

      <video
        className={`${
          remoteVideo
            ? `w-[300px] h-[300px] rounded-[20px] ml-4 absolute`
            : `w-screen h-screen`
        }`}
        playsInline
        muted
        ref={selfVideo}
        autoPlay
      />

      <div className="w-full h-[70px] bg-midGray flex flex-row items-center justify-center">
        <button
          onClick={() => endCall()}
          className=" bg-red-600 rounded-full w-[50px] aspect-square flex items-center justify-center"
        >
          <img src="../endCallIcon.svg" className="w-[30px] h-[40px]" alt="" />
        </button>
      </div>
    </div>
  );
};

export default CallComp;
