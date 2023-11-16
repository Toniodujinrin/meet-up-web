import React, { useEffect } from "react";

const CallComp = ({
  conversationDetails,
  selfVideo,
  remoteVideo,
  endCall,
  toggleVideo,
  videoEnabled,
  audioEnabled,
  toggleAudio,
}) => {
  return (
    <div className="flex flex-col w-full justify-between h-screen ">
      <div className="h-[calc(100%-70px)]  overflow-hidden flex flex-col items-center w-full">
        {remoteVideo && (
          // remoteVideo.current &&
          // remoteVideo.current.srcObject &&
          <div className="h-screen">
            <video
              className="h-full object-cover  w-screen"
              playsInline
              ref={remoteVideo}
              autoPlay
            />
          </div>
        )}

        <video
          className={` w-[200px] mt-4 mr-4 object-cover flex self-end absolute rounded-[25px] h-[300px]`}
          playsInline
          muted
          ref={selfVideo}
          autoPlay
        />
      </div>

      <div className="w-full h-[70px] bg-midGray flex flex-row gap-4 items-center justify-center">
        <button
          onClick={() => {
            toggleAudio();
          }}
          className=" bg-mediumGray rounded-full w-[50px] aspect-square flex items-center justify-center"
        >
          <img
            src={audioEnabled ? "../phoneIconWhite.svg" : "../mutedIcon.svg"}
            className="w-[30px] h-[40px]"
            alt=""
          />
        </button>
        <button
          onClick={() => {
            toggleVideo();
            console.log(remoteVideo, selfVideo);
          }}
          className=" bg-mediumGray rounded-full w-[50px] aspect-square flex items-center justify-center"
        >
          <img
            src={videoEnabled ? "../videoIcon.svg" : "../disabledVideoIcon.svg"}
            className="w-[30px] h-[40px]"
            alt=""
          />
        </button>
        <button
          onClick={() => endCall()}
          className=" bg-red-600 rounded-full w-[70px] h-[50px] flex items-center justify-center"
        >
          <img src="../endCallIcon.svg" className="w-[30px] h-[40px]" alt="" />
        </button>
      </div>
    </div>
  );
};

export default CallComp;
