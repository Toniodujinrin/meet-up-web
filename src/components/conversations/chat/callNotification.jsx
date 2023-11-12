import React from "react";

const CallNotification = ({
  answerCall,
  setCallAccepted,
  setIncomingCall,
  setCurrentDisplay,
  rejectCall,
  call,
}) => {
  return (
    <div className="w-[300px] h-fit  absolute p-4  flex flex-col items-center  bg-midGray rounded-lg">
      <h1 className="text-white text-[28px] mb-4 font-semibold">
        Incoming Call{" "}
      </h1>
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => {
            rejectCall();
          }}
          className=" bg-red-600 rounded-full w-[50px] aspect-square flex items-center justify-center"
        >
          <img src="../endCallIcon.svg" className="w-[30px] h-[40px]" alt="" />
        </button>

        <button
          className=" bg-green-600 rounded-full w-[50px] flex items-center justify-center aspect-square"
          onClick={() => {
            answerCall(call);
            setCallAccepted(true);
            setIncomingCall(false);
            setCurrentDisplay("call");
          }}
        >
          <img
            src="../phoneIconWhite.svg"
            className="w-[30px] h-[30px]"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default CallNotification;
