import React from "react";
import ProfilePic from "../profilePic";

const ContactBoxWithSelect = ({
  username,
  image,
  _id,
  selected,
  select,
  defaultColor,
}) => {
  return (
    <div
      onClick={() => select(_id)}
      className="bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full gap-3 p-3 h-[70px] items-center flex flex-row"
    >
      <div
        className={`w-[20px] h-[20px] ${
          selected.includes(_id) && "bg-tekhelet border-0"
        }  border-mainGray border-2 rounded-full`}
      ></div>
      <ProfilePic
        image={image}
        defaultColor={defaultColor}
        displayName={username}
      />
      <div>
        <p className="text-white">{username}</p>
        <small className="text-mainGray">{_id}</small>
      </div>
    </div>
  );
};

export default ContactBoxWithSelect;
