import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <div className="flex flex-col items-center ">
        <img className="w-[70px] aspect-square" src="../logo.svg" alt="" />
        <p className="text-tekhelet text-[26px]">Meetup</p>
      </div>
      <span className="loader-purple mt-3"></span>

      <div className="text-mainGray bg-midGray mt-6  rounded-lg flex flex-row gap-3  w-fit p-2 ">
        <img className="w-[20px]" src="../lockIcon.svg" alt="" />
        <p>End to End Encrypted</p>
      </div>
    </div>
  );
};

export default LoadingPage;
