import React, { useContext } from "react";
import { ConversationContext } from "../../../contexts/conversationContext";
import MessagePic from "./messagePic";

const Typing = ({ user }) => {
  const { conversationDetails } = useContext(ConversationContext);

  const userDetails = conversationDetails.users.find(
    (profile) => profile._id == user
  );

  return (
    <div className="flex flex-row gap-3 items-start ">
      <MessagePic
        defaultColor={userDetails && userDetails.defaultProfileColor}
        displayName={userDetails && userDetails.username}
        image={userDetails && userDetails.profilePic}
      />
      <div className="text-white">
        <div
          className={`bg-midGray  w-[60px] flex  py-[12px] justify-center items-center text-white rounded-[18px]`}
        >
          <div className="dot-typing"></div>
        </div>
        <small
          style={{ color: userDetails && userDetails.defaultProfileColor }}
        >
          {userDetails ? userDetails.username : ""}
        </small>
      </div>
    </div>
  );
};

export default Typing;
