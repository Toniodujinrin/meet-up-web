import React from "react";

const MessagePic = ({ image, defaultColor, displayName }) => {
  return (
    <div
      style={{ backgroundColor: defaultColor }}
      className={`w-[38px] border-2 border-midGray h-[38px] object-contain overflow-hidden flex items-center justify-center rounded-full`}
    >
      {image && image.url ? (
        <img className={` w-full h-full `} src={image.url} alt="" />
      ) : (
        <p className="text-white text-[14px] font-bold ">
          {displayName.toUpperCase()[0]}
        </p>
      )}
    </div>
  );
};

export default MessagePic;
