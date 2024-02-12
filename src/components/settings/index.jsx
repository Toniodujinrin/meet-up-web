import React, { useState } from "react";
import BackArrow from "../backArrow";
import Details from "./details";
import WebcamCapture from "./webcam";

const SettingsComp = () => {
  const [webcamShowing, setWebcamShowing] = useState(false);
  return (
    <div className="p-4 h-screen overflow-y-scroll lg:w-[60%] w-full flex flex-col ">
      <div className="flex flex-row gap-3 items-center">
        <BackArrow />
        <h1 className="text-white text-[26px]">Settings</h1>
      </div>

      {webcamShowing ? (
        <WebcamCapture setWebcamShowing={setWebcamShowing} />
      ) : (
        <Details setWebcamShowing={setWebcamShowing} />
      )}
    </div>
  );
};

export default SettingsComp;
