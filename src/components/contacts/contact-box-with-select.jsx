import React from "react";
import ProfilePic from "../profilePic";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
const ContactBoxWithSelect = ({
  username,
  image,
  _id,
  selected,
  select,
  defaultColor,
}) => {
  const { getUserDetails, setContactPopUpShowing } = useContext(UserContext);

  return (
    <div className="bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full gap-3 p-3 h-[70px] items-center flex flex-row">
      <div
        onClick={() => select(_id)}
        className={`w-[20px] h-[20px] ${
          selected.includes(_id) && "bg-white border-0"
        }  border-mainGray border-2 rounded-full`}
      ></div>
      <div
        onClick={() => {
          getUserDetails(_id);
          setContactPopUpShowing(true);
        }}
        className="w-full h-full flex space-x-3 flex-row"
      >
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
    </div>
  );
};

export default ContactBoxWithSelect;
