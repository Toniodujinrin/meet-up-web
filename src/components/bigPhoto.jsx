import React from "react";
const BigPhoto = ({
  profilePic,
  setWebcamShowing,
  displayName,
  defaultColor,
  changeImage = true,
}) => {
  return (
    <>
      <div
        style={{ backgroundColor: defaultColor }}
        className={` lg:w-[200px] w-[180px] bg-black flex items-center justify-center border-4 border-midGray aspect-square overflow-hidden rounded-full`}
      >
        {profilePic && profilePic.url ? (
          <img
            className={`w-full aspect-square `}
            src={profilePic.url}
            alt=""
          />
        ) : (
          <p className="text-white lg:text-[60px] text-[45px] font-bold">
            {displayName.toUpperCase()[0]}
          </p>
        )}
      </div>
    </>
  );
};

export default BigPhoto;
