import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { motion } from "framer-motion";
const ContactPopUp = () => {
  const { userDetails, setContactPopUpShowing, getUserDetailsLoading } =
    useContext(UserContext);
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -30, opacity: 0 }}
      exit={{ y: 30, opacity: 0 }}
      className="lg:w-[400px] w-[80%] flex items-center  flex-col p-3 h-[300px] absolute bg-black z-30  border border-mainGray rounded-md"
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
        <div></div>
      ) : (
        <div className="flex items-center w-full h-full justify-center">
          <p className="text-white">Contact details not found</p>
        </div>
      )}
    </motion.div>
  );
};

export default ContactPopUp;
