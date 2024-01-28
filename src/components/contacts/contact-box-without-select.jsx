import React from "react";
import ProfilePic from "../profilePic";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ContactBoxWithoutSelect = ({ username, image, _id, defaultColor }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const {
    pendingReceived,
    userContacts,
    pendingSent,
    sendRequest,
    acceptRequest,
    getUserDetails,
    setContactPopUpShowing,
  } = useContext(UserContext);
  const contacts = userContacts.map((contact) => {
    return contact._id;
  });
  const received = pendingReceived.map((contact) => {
    return contact._id;
  });
  const sent = pendingSent.map((contact) => {
    return contact._id;
  });
  return (
    <div className="bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full  justify-between p-3 h-[80px] items-center flex flex-row ">
      <div
        onClick={() => {
          getUserDetails(_id);
          setContactPopUpShowing(true);
        }}
        className="flex flex-row gap-3 items-center"
      >
        <ProfilePic
          image={image}
          defaultColor={defaultColor}
          displayName={username}
        />
        <div className="flex flex-col">
          <p className="text-white">{username}</p>
          <small className="text-mainGray">{_id}</small>
          {sent.includes(_id) && (
            <small className="text-tekhelet ">pending</small>
          )}
        </div>
      </div>
      {!contacts.includes(_id) &&
        !received.includes(_id) &&
        !sent.includes(_id) &&
        user._id !== _id && (
          <img
            onClick={() => sendRequest(_id)}
            className="w-[30px] h-[30px]"
            src="../addIcon.svg"
            alt=""
          />
        )}

      {received.includes(_id) && (
        <img
          onClick={() => acceptRequest(_id)}
          src="../accept.svg"
          alt=""
          className="w-[20px] ml-3 h-[20px]"
        />
      )}
    </div>
  );
};

export default ContactBoxWithoutSelect;
