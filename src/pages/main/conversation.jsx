import React, { useContext, useEffect, useState } from "react";
import Overview from "../../components/conversations/overview";
import Chat from "../../components/conversations/chat";
import { UserContext } from "../../contexts/UserContext";
import { useQueries } from "react-query";
import LoadingPage from "../../components/loadingPage";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../contexts/socketContext";
import { ConversationContext } from "../../contexts/conversationContext";
import ContactPopUp from "../../components/popUps/contactPopUp";

const Conversation = () => {
  const { id } = useParams();
  const { getConversation, conversationDetails } =
    useContext(ConversationContext);
  const { joinConversation } = useContext(SocketContext);
  useEffect(() => {
    getConversation(id);
    joinConversation(id);
  }, [id]);
  const { getSelf, getConversations, contactPopUpShowing } =
    useContext(UserContext);
  const [q1, q2] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["conversations"], queryFn: getConversations },
  ]);
  return (
    <>
      {q1.isLoading || q2.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError ? (
        <div className="w-screen h-screen bg-black"></div>
      ) : (
        <div className="flex w-screen min-h-screen bg-black justify-between">
          <div className="lg:w-[40%] lg:flex hidden bg-darkGray  w-full border-r border-mediumGray ">
            <Overview />
          </div>
          <div
            className={`lg:w-[60%]  ${
              contactPopUpShowing && "justify-center flex flex-col items-center"
            } w-screen h-full `}
          >
            {contactPopUpShowing && <ContactPopUp />}
            {conversationDetails && <Chat />}
          </div>
        </div>
      )}
    </>
  );
};

export default Conversation;
