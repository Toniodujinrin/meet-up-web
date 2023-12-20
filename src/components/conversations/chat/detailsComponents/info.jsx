import React, { useContext, useState } from "react";
import Contact from "../../../contacts/contact-box-without-select";
import { ConversationContext } from "../../../../contexts/conversationContext";
import ButtonMain from "../../../buttonMain";
import DangerButton from "../../../DangerButton";
import DeletePopUp from "./deletePopUp";
import BigPhoto from "../../../bigPhoto";
import { AnimatePresence, motion } from "framer-motion";

const Info = ({ setCurrentDisplay }) => {
  const { conversationDetails } = useContext(ConversationContext);
  const [deleteShowing, setDeleteShowing] = useState(false);
  const [deleteAction, setDeleteAction] = useState("");
  return (
    <div className="flex items-center  bg-black  justify-center">
      <AnimatePresence>
        {deleteShowing && (
          <DeletePopUp
            setDeleteShowing={setDeleteShowing}
            deleteAction={deleteAction}
          />
        )}
      </AnimatePresence>
      <div
        className={`flex flex-col items-center justify-center ${
          deleteShowing && `blur-lg`
        }   p-4 w-full  `}
      >
        <img
          onClick={() => setCurrentDisplay("chat")}
          className="flex cursor-pointer self-start w-[30px] h-[30px] rotate-180"
          src="../../chevron.svg"
          alt=""
        />
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-end flex-col"
        >
          <BigPhoto
            changeImage={conversationDetails.type == "group"}
            setWebcamShowing={(v) => {
              console.log(v);
            }}
            defaultColor={conversationDetails.defaultConversationColor}
            profilePic={conversationDetails.conversationPic}
            displayName={conversationDetails.name}
          />
        </motion.div>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-white text-[24px] ${
            conversationDetails.type == "single" && `mt-4`
          }`}
        >
          {conversationDetails.name}
        </motion.h2>

        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 30 }}
          className="w-full mt-4"
        >
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-white text-[21px]">Members</h1>
            {conversationDetails.type == "group" && (
              <ButtonMain
                text={"Add"}
                onClick={() => setCurrentDisplay("add")}
              />
            )}
          </div>
          <div className="flex flex-col items-center mb-[50px]  w-full gap-3 mt-4 lg:grid grid-cols-3">
            {conversationDetails.users.map((user) => (
              <Contact
                key={user._id}
                username={user.username}
                image={user.profilePic}
                defaultColor={user.defaultProfileColor}
                _id={user._id}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 self-start">
          <DangerButton
            text={"Leave Conversation"}
            onClick={() => {
              setDeleteShowing(true);
              setDeleteAction("leave");
            }}
            loading={false}
          />
          <DangerButton
            text={"Delete Conversation"}
            onClick={() => {
              setDeleteShowing(true);
              setDeleteAction("delete");
            }}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
