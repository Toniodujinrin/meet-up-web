import React from "react";
const BigPhoto = ({
  profilePic,
  setWebcamShowing,
  displayName,
  defaultColor,
  medium = false,
  changeImage = true,
}) => {
  return (
    <>
      <div
        style={{ backgroundColor: defaultColor }}
        className={` ${
          medium ? "w-[70px]" : "lg:w-[200px] w-[180px]"
        }  bg-black flex items-center justify-center  aspect-square overflow-hidden rounded-full`}
      >
        {profilePic && profilePic.url ? (
          <img
            className={`w-full aspect-square `}
            src={profilePic.url}
            alt=""
          />
        ) : (
          <p
            className={`text-white  font-bold ${
              medium ? `text-[36px]` : `lg:text-[60px] text-[45px]`
            }`}
          >
            {displayName.toUpperCase()[0]}
          </p>
        )}
      </div>
    </>
  );
};

export default BigPhoto;
