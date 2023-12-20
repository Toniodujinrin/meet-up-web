import React from "react";
import DangerButton from "../../../DangerButton";
import { ConversationContext } from "../../../../contexts/conversationContext";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext } from "react";
import { motion } from "framer-motion";
const DeletePopUp = ({ setDeleteShowing, deleteAction }) => {
  const { leaveConversation, deleteConversation, conversationProcessLoading } =
    useContext(ConversationContext);
  const { deleteAccount, deleteAccountLoading } = useContext(UserContext);
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -30, opacity: 0 }}
      exit={{ y: 30, opacity: 0 }}
      className="lg:w-[400px] w-[80%] flex items-center  flex-col p-3 h-[300px] absolute bg-black z-30  border border-midGray rounded-md"
    >
      <img
        onClick={() => setDeleteShowing(false)}
        src="../close.svg"
        className=" flex self-end w-[20px] h-[20px] cursor-pointer"
        alt=""
      />
      {deleteAction == "leave" && (
        <h1 className="text-white text-[21px] my-8 text-center">
          Are you sure you want to leave this conversation, you wiNll not be
          able to enter join again untill someone adds you back
        </h1>
      )}
      {deleteAction == "account" && (
        <h1 className="text-white text-[21px] my-8 text-center">
          Are you sure you want to delete your account, This action is
          irreversible !
        </h1>
      )}
      {deleteAction == "delete" && (
        <h1 className="text-white text-[21px] my-8 text-center">
          Are you sure you want to delete this conversation? This action is
          irreversible.
        </h1>
      )}
      {deleteAction == "leave" && (
        <DangerButton
          loading={conversationProcessLoading}
          onClick={() => leaveConversation()}
          text={"Leave Conversation"}
        />
      )}
      {deleteAction == "account" && (
        <DangerButton
          loading={deleteAccountLoading}
          onClick={() => {
            deleteAccount();
          }}
          text={"Delete Account"}
        />
      )}

      {deleteAction == "delete" && (
        <DangerButton
          text={"Delete Conversation"}
          onClick={() => {
            deleteConversation();
          }}
          loading={conversationProcessLoading}
        />
      )}
    </motion.div>
  );
};

export default DeletePopUp;
