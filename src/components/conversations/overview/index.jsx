import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./searchBar";
import ProfileHeader from "./profileHeader";
import OnlineUsers from "./onlineUsers";
import Conversations from "./conversations";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { useRef } from "react";

// const dropDownOptions = [
//   {
//     onClick:()=>{
//       navigate("/main/contacts");
//       setDrowpDownShowing(false);
//     },
//     title:"Contacts",

//   }
// ]

const Overview = () => {
  const navigate = useNavigate();
  const dropDownRef = useRef();
  const dropDownToggleRef = useRef();
  const [search, setSeach] = useState("");
  const [dropDownShowing, setDrowpDownShowing] = useState(false);
  const { userConversations, logout } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState(userConversations);

  useEffect(() => {
    setSearchResults(userConversations);
  }, [userConversations]);

  useEffect(() => {
    if (search.length > 0) {
      const results = userConversations.filter((conversation) =>
        conversation.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(userConversations);
    }
  }, [search]);

  const handleCloseDropDown = (e) => {
    if (
      dropDownRef.current &&
      dropDownToggleRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !dropDownToggleRef.current.contains(e.target)
    ) {
      setDrowpDownShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropDown);
    return () => {
      document.removeEventListener("click", handleCloseDropDown);
    };
  });

  return (
    <div className="flex w-full h-screen overflow-hidden flex-col items-end">
      <ProfileHeader
        dropDownToggleRef={dropDownToggleRef}
        setDrowpDownShowing={setDrowpDownShowing}
        dropDownShowing={dropDownShowing}
      />
      {dropDownShowing && (
        <ul
          ref={dropDownRef}
          className={` bg-midGray w-[200px] top-[80px] mr-3  rounded-lg border-mainGray  border   text-white absolute z-30 `}
        >
          <li
            onClick={() => {
              navigate("/main/settings");
              setDrowpDownShowing(false);
            }}
            className=" border-b cursor-pointer flex flex-row items-center justify-between border-mainGray p-2"
          >
            <p>Settings</p>
            <img
              className="w-[20px] h-[20px]"
              src="../../settingsIcon.svg"
              alt=""
            />
          </li>
          <li
            onClick={() => {
              navigate("/main/contacts");
              setDrowpDownShowing(false);
            }}
            className="border-b border-mainGray flex flex-row items-center justify-between cursor-pointer p-2"
          >
            <p>Contacts</p>
            <img
              className="w-[20px] h-[20px]"
              src="../../groupIconWhite.svg"
              alt=""
            />
          </li>
          <li
            onClick={logout}
            className="flex flex-row items-center justify-between text-red-600 cursor-pointer p-2"
          >
            <p>Log out</p>
            <img
              className="w-[20px] h-[20px]"
              src="../../logoutIcon.svg"
              alt=""
            />
          </li>
        </ul>
      )}

      <div className="w-[90%] flex self-center ">
        <SearchBar
          placeholder={"Search for users or converations"}
          value={search}
          setValue={setSeach}
        />
      </div>
      <OnlineUsers />
      <Conversations searchResults={searchResults} />
    </div>
  );
};

export default Overview;
