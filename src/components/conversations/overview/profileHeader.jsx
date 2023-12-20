import React from "react";
import ProfilePic from "../../profilePic";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({
  setDrowpDownShowing,
  dropDownShowing,
  dropDownToggleRef,
}) => {
  const { user, pendingReceived } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row p-4 bg-midGray border-b z-20 w-full justify-between h-[100px] border-mediumGray items-center">
      <div
        onClick={() => navigate("/main/settings")}
        className=" flex flex-row cursor-pointer  gap-4"
      >
        <ProfilePic
          image={user.profilePic}
          defaultColor={user.defaultProfileColor}
          displayName={user.username}
        />
        <div>
          <p className="text-white font-bold">{user.username}</p>
          <small className="text-mainGray">My Account</small>
        </div>
      </div>

      <div className="flex flex-row items-center ">
        <div
          onClick={() =>
            navigate("/main/contacts", { state: { type: "requests" } })
          }
          className={`bg-tekhelet text-white font-bold w-[25px] h-[20px] flex items-center justify-center cursor-pointer rounded-full ${
            !pendingReceived.length && `hidden`
          }`}
        >
          <p>{pendingReceived.length}</p>
        </div>
        <img
          ref={dropDownToggleRef}
          onClick={() => setDrowpDownShowing(!dropDownShowing)}
          src="../../menuIcon.svg"
          className="w-[30px] z-20 relative aspect-square cursor-pointer"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
