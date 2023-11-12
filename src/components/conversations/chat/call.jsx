import React, { useEffect } from "react";

const CallComp = ({ conversationDetails, selfVideo, remoteVideo, endCall }) => {
  return (
    <div className="flex flex-col w-full justify-between h-screen ">
      <div className="h-[calc(100%-70px)] overflow-hidden flex flex-col justify-evenly items-center w-full">
        {remoteVideo && (
          <video
            className="h-auto w-screen"
            playsInline
            ref={remoteVideo}
            autoPlay
          />
        )}

        <video
          className={` h-auto w-screen`}
          playsInline
          muted
          ref={selfVideo}
          autoPlay
        />
      </div>

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
