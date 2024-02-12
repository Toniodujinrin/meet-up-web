import React from "react";
import ProfilePic from "../../profilePic";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { SocketContext } from "../../../contexts/socketContext";
const OnlineUsers = () => {
  const { userContacts } = useContext(UserContext);
  const { onlineContacts } = useContext(SocketContext);

  return (
    <div className="w-full px-4 ">
      <h1 className="text-white text-[21px]">Online</h1>
      <div className="flex flex-row space-x-4  overflow-scroll overflow-y-hidden scroll ">
        {userContacts.map((user, index) => (
          <div
            key={index}
            className={`items-center ${
              !onlineContacts.includes(user._id) && `hidden`
            } flex flex-col`}
          >
            <ProfilePic
              image={user.profilePic}
              defaultColor={user.defaultProfileColor}
              displayName={user.username}
              type={"online"}
            />
            <p className=" text-white">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
