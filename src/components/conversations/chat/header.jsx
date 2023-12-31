import React from "react";
import ProfilePic from "../../profilePic";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from "react";
import { ConversationContext } from "../../../contexts/conversationContext";
import { SocketContext } from "../../../contexts/socketContext";
import { useNavigate } from "react-router-dom";

const Header = ({ setCurrentDisplay, makeCall }) => {
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const { conversationDetails } = useContext(ConversationContext);
  const { onlineGroupUsers, leaveConversation } = useContext(SocketContext);

  return (
    <div className="bg-midGray w-full h-[100px] flex border-b border-mediumGray flex-row items-center justify-between p-4 ">
      <div className="flex flex-row gap-3 items-center">
        <img
          onClick={() => {
            navigate("/main");
            leaveConversation();
          }}
          src="../../chevron.svg"
          className="w-[30px] h-[30px] cursor-pointer rotate-180 lg:hidden"
          alt=""
        />

        <ProfilePic
          image={conversationDetails.conversationPic}
          defaultColor={conversationDetails.defaultConversationColor}
          displayName={conversationDetails.name}
        />
        <div
          className="cursor-pointer"
          onClick={() => setCurrentDisplay("info")}
        >
          <p className="text-white font-semibold">{conversationDetails.name}</p>
          {conversationDetails.type == "single" ? (
            <small
              className={`${
                onlineGroupUsers.length <= 1 ? `text-mainGray` : `text-tekhelet`
              }`}
            >{`${
              onlineGroupUsers.length <= 1
                ? `Last seen : ${dayjs(conversationDetails.lastSeen).fromNow()}`
                : "online"
            }`}</small>
          ) : (
            <div>{}</div>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4 ">
        {conversationDetails.type == "single" && (
          <>
            <img
              onClick={() => {
                makeCall();
                setCurrentDisplay("call");
              }}
              className={"w-[25px] cursor-pointer"}
              src="../../videoIcon.svg"
              alt=""
            />
          </>
        )}
        <img
          onClick={() => setCurrentDisplay("info")}
          className={"w-[25px] cursor-pointer"}
          src="../../menuIcon.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
