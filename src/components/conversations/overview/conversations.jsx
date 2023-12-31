import React from "react";
import Conversation from "./conversation";
import { useNavigate } from "react-router-dom";

const Conversations = ({ searchResults }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-darkGray overflow-y-scroll">
      <div className="w-full flex p-4 flex-row justify-between items-center">
        <h1 className="text-[21px]  text-white">Conversations</h1>
        <button
          onClick={() => navigate("/main/create")}
          className="rounded-full bg-tekhelet  w-[40px] aspect-square flex items-center justify-center"
        >
          <img className="w-[25px] h-[25px]" src="../../penIcon.svg" alt="" />
        </button>
      </div>
      <div className="w-full ">
        {searchResults.map((conversation) => (
          <Conversation
            _id={conversation._id}
            lastMessage={conversation.lastMessage}
            key={conversation._id}
            name={conversation.name}
            defaultConversationColor={conversation.defaultConversationColor}
            image={conversation.conversationPic}
          />
        ))}
      </div>
    </div>
  );
};

export default Conversations;
