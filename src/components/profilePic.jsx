import React from "react";

const ProfilePic = ({ image, type, defaultColor, displayName }) => {
  return (
    <div>
      {type == "online" && (
        <div className="w-[15px] aspect-square  border-2 border-darkGray rounded-full relative top-[15px] bg-tekhelet"></div>
      )}

      <div
        style={{ backgroundColor: defaultColor }}
        className={`w-[50px] aspect-square flex items-center justify-center rounded-full`}
      >
        {image && image.url ? (
          <img
            className={` w-full h-full ${image && `rounded-full`}`}
            src={image.url}
            alt=""
          />
        ) : (
          <p className="text-white font-bold text-[24px]">
            {displayName.toUpperCase()[0]}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePic;
