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
      className="lg:w-[400px] w-[80%] flex items-center  flex-col p-3 h-fit absolute  bg-black z-30  border border-mainGray rounded-md"
    >
      <img
        onClick={() => setContactPopUpShowing(false)}
        src="../../close.svg"
        className=" flex self-end w-[20px] h-[20px] cursor-pointer"
        alt=""
      />
      {getUserDetailsLoading ? (
        <div className="flex items-center w-full h-full justify-center">
          <div className="dot-typing"></div>
        </div>
      ) : userDetails ? (
        <div className="w-full flex flex-row text-white items-center space-x-2">
          <BigPhoto
            displayName={userDetails.username}
            defaultColor={userDetails.defaultProfileColor}
            profilePic={userDetails.profilePic}
            medium={true}
          />
          <div className="flex flex-col max-w-[calc(100%-100px)] overflow-hidden ">
            <p className="text-[21px] w-full font-semibold">
              {userDetails._id}
            </p>
            <p className="text-mainGray font-semibold text-[21px]">{`@${userDetails.username}`}</p>
            <div className="space-x-2">
              <span className="text-mainGray text-[21px]">Bio:</span>
              <span className="text-white text-[21px]">{userDetails.bio}</span>
            </div>

            <div className="space-x-2">
              <span className="text-mainGray text-[21px]">Joined:</span>
              <span className="text-white text-[21px]">
                {dayjs(userDetails.registration).fromNow()}
              </span>
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
