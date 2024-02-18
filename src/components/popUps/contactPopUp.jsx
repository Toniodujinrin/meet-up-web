import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { motion } from "framer-motion";
import BigPhoto from "../bigPhoto";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const ContactPopUp = () => {
  const { userDetails, setContactPopUpShowing, getUserDetailsLoading } =
    useContext(UserContext);
  dayjs.extend(relativeTime);
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -30, opacity: 0 }}
      exit={{ y: 30, opacity: 0 }}
      className="lg:w-[400px] w-[80%] flex flex-col p-3 h-fit  min-h-[200px] absolute  bg-black z-30  border border-mainGray rounded-md"
    >
      <img
        onClick={() => setContactPopUpShowing(false)}
        src="../../close.svg"
        className=" flex self-end w-[20px] h-[20px] cursor-pointer"
        alt=""
      />
      {getUserDetailsLoading ? (
        <div className="flex items-center justify-center  w-full h-[180px] ">
          <div className="dot-typing"></div>
        </div>
      ) : userDetails ? (
        <div className="w-full flex flex-row text-white items-start space-x-2">
          <BigPhoto
            displayName={userDetails.username}
            defaultColor={userDetails.defaultProfileColor}
            profilePic={userDetails.profilePic}
            medium={true}
          />
          <div className="flex flex-col max-w-[calc(100%-100px)] text-[16px] overflow-hidden ">
            <p className=" w-full font-semibold">{userDetails._id}</p>
            <p className="text-mainGray font-semibold mb-4 ">{`@${userDetails.username}`}</p>
            <div className="flex flex-row space-x-2 items-start">
              <img
                className="w-[20px] aspect-square"
                src="../../bioIcon.svg"
                alt=""
              />
              <div className="text-white ">{userDetails.bio}</div>
            </div>

            <div className="flex flex-row">
              <img
                className="w-[20px] aspect-square"
                src="../../ballonIcon.svg"
                alt=""
              />
              <div className="text-white ">
                {dayjs(userDetails.registration).fromNow()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full h-full justify-center">
          <p className="text-white">Contact details not found</p>
        </div>
      )}
    </motion.div>
  );
};

export default ContactPopUp;
