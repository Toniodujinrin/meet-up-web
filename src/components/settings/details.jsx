import React, { useEffect } from "react";
import { useState, useContext } from "react";
import InputGroup from "../inputGroup";
import { UserContext } from "../../contexts/UserContext";
import { verifyAccountSchema } from "../../schemas";
import DangerButton from "../DangerButton";
import DeletePopUp from "../conversations/chat/detailsComponents/deletePopUp";
import BigPhoto from "../bigPhoto";
import { AnimatePresence, motion } from "framer-motion";
const Details = ({ setWebcamShowing }) => {
  const { user, updateUser, updateProcessLoading } = useContext(UserContext);
  const [username, setusername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);
  const [phone, setPhone] = useState(user.phone);
  const [deletePopUpShowing, setDeletePopUpShowing] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const _user = { ...user };
    delete _user.lastSeen;
    delete _user.registration;
    delete _user._id;
    delete _user.profilePic;
    delete _user.defaultProfileColor;
    const payload = { bio, firstName, lastName, phone, username };
    if (JSON.stringify(_user) == JSON.stringify(payload)) {
      setDisabled(true);
    } else setDisabled(false);
  }, [username, firstName, lastName, bio, phone]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const noErrors = {
      username: "",
      firstName: "",
      lastName: "",
      bio: "",
      phone: "",
    };
    const validatorObject = {
      username: "",
      firstName: "",
      lastName: "",
      bio: "",
      phone: "",
    };
    const { error } = verifyAccountSchema.validate(
      { username, firstName, lastName, bio, phone },
      { abortEarly: false }
    );
    if (error) {
      for (let item of error.details) {
        if (!validatorObject[item.path[0]])
          validatorObject[item.path[0]] = item.message;
      }
    }
    setErrors(validatorObject);
    if (JSON.stringify(noErrors) == JSON.stringify(validatorObject)) {
      updateUser({ bio, firstName, lastName, phone, username });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
        {deletePopUpShowing && (
          <DeletePopUp
            deleteAction={"account"}
            setDeleteShowing={setDeletePopUpShowing}
          />
        )}
      </AnimatePresence>
      <div
        className={`w-full h-full ${
          deletePopUpShowing && `blur-lg`
        } flex flex-col lg:gap-8  mt-4 items-center`}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className=" self-start mb-4"
        >
          <BigPhoto
            setWebcamShowing={setWebcamShowing}
            profilePic={user.profilePic}
            defaultColor={user.defaultProfileColor}
            displayName={user.username}
          />
        </motion.div>

        <div className="flex flex-col w-full items-center  " action="">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:grid flex flex-col grid-cols-2 mb-[50px] w-full gap-6 "
          >
            <InputGroup
              icon={"../userIcon.svg"}
              type={"string"}
              placeholder={"First Name"}
              value={firstName}
              setValue={setFirstName}
              error={errors.firstName}
            />
            <InputGroup
              icon={"../userIcon.svg"}
              type={"string"}
              placeholder={"Last Name"}
              value={lastName}
              setValue={setLastName}
              error={errors.lastName}
            />
            <InputGroup
              icon={"../userIcon.svg"}
              type={"string"}
              placeholder={"Username"}
              value={username}
              setValue={setusername}
              error={errors.username}
            />
            <InputGroup
              icon={"../phoneIcon.svg"}
              type={"string"}
              placeholder={"Phone Number"}
              value={phone}
              setValue={setPhone}
              error={errors.phone}
            />
            <InputGroup
              icon={"../bioIcon.svg"}
              type={"string"}
              placeholder={"Bio"}
              value={bio}
              setValue={setBio}
              error={errors.bio}
            />
          </motion.div>

          <motion.button
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            disabled={disabled}
            onClick={(e) => {
              handleUpdate(e);
            }}
            className={`${
              disabled ? `bg-midGray` : `bg-tekhelet`
            } text-white py-2 self-start rounded-[5px] flex items-center justify-center w-[200px] mb-4 `}
          >
            {updateProcessLoading ? (
              <div className="dot-flashing"></div>
            ) : (
              <p>Update</p>
            )}
          </motion.button>
          <motion.button
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              setWebcamShowing(true);
            }}
            className={`bg-midGray
            } text-white py-2 self-start rounded-[5px] flex items-center justify-center w-[200px] mb-4 `}
          >
            <img
              className="w-[25px] aspect-square"
              src="../camera2.svg
            "
              alt="camera icon"
            />
            <p>Change Photo</p>
          </motion.button>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="self-start flex"
          >
            <DangerButton
              onClick={() => setDeletePopUpShowing(true)}
              text={"Delete Account"}
              loading={false}
            />
          </motion.div>
          <motion.button
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              //setWebcamShowing(true);
            }}
            className={`bg-midGray
            } text-white py-2 mt-4 self-start rounded-[5px] flex items-center justify-center w-[200px] mb-4 `}
          >
            <img
              className="w-[25px] aspect-square"
              src="../camera2.svg
            "
              alt="camera icon"
            />
            <p>Remove Photo</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Details;
