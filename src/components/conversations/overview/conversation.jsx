import React, { useEffect, useState } from "react";
import ProfilePic from "../../profilePic";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../../../contexts/socketContext";

const Conversation = ({
  name,
  image,
  _id,
  lastMessage,
  defaultConversationColor,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications } = useContext(SocketContext);
  const [amount, setAmount] = useState(0);
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    const notification = notifications.find(
      (notification) => notification.conversationId == _id
    );
    if (notification) setAmount(notification.amount);
    else setAmount(0);
  }, [notifications]);

  return (
    <div
      onClick={() => {
        location.pathname != `/conversation/${_id}` &&
          navigate(`/main/conversation/${_id}`, { replace: true });
      }}
      className="w-full  px-4 cursor-pointer border-b  border-mediumGray gap-4 flex flex-row  items-center justify-between h-[80px]"
    >
      <div className="flex items-center gap-4">
        <ProfilePic
          image={image}
          defaultColor={defaultConversationColor}
          displayName={name}
        />
        <div>
          <h2 className="text-white text-[18px] font-bold">{name}</h2>

          {/* code for underlying text conversation overview */}
          <small className="text-mainGray">
            {lastMessage && user && (
              <div>
                {user._id == lastMessage.senderId ? (
                  <div className="flex flex-row items-center gap-2">
                    <img
                      className="w-[20px] aspect-square"
                      src={`${
                        lastMessage.status == "delivered"
                          ? `../../sendIconPurple.svg`
                          : `../../sendIconOutlinedPurple.svg`
                      }`}
                      alt=""
                    />
                    <p className="text-[16px]">
                      {lastMessage.status == "delivered"
                        ? "delivered"
                        : "received"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2">
                    <img
                      className="w-[18px] aspect-square"
                      src={`${
                        amount > 0
                          ? `../../newMessageIcon.svg`
                          : `../../readMessageIcon.svg`
                      }`}
                      alt=""
                    />
                    <p className="text-[16px]">
                      {amount > 0 ? "new Message" : "opened"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </small>
        </div>
      </div>

      {amount > 0 && (
        <div className="w-[26px] h-[21px] bg-tekhelet rounded-[20px] flex items-center justify-center text-white">
          {amount}
        </div>
      )}
    </div>
  );
};

export default Conversation;
