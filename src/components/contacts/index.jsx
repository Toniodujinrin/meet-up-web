import React, { useState, useRef, useEffect } from "react";
import CurrentContacts from "./currentContacts";
import PendingContactsSent from "./pendingSent";
import PendingContactsReceived from "./pendingReceived";
import AddUsers from "./addContacts";
import BackArrow from "../backArrow";
import ButtonMain from "../buttonMain";

const ContactsComp = () => {
  const [currentPage, setCurrentPage] = useState("current");
  const [dropDownShowing, setDropDownShowing] = useState(false);
  const dropDownRef = useRef();
  const dropDownToggleRef = useRef();
  const handleCloseDropDown = (e) => {
    if (
      dropDownRef.current &&
      dropDownToggleRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !dropDownToggleRef.current.contains(e.target)
    ) {
      setDropDownShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropDown);
    return () => {
      document.removeEventListener("click", handleCloseDropDown);
    };
  });

  return (
    <div className="w-full h-full p-4">
      <div className="w-full flex flex-row items-start justify-between">
        {currentPage === "add" ? (
          <div className=" flex flex-row gap-2 items-center">
            <img
              onClick={() => {
                setCurrentPage("current");
                setDropDownShowing(false);
              }}
              src="../chevron.svg"
              className="w-[25px] h-[25px] rotate-180"
              alt=""
            />
            <div className="text-white text-[26px]">Add Users</div>
          </div>
        ) : (
          <>
            <div className="text-white text-[26px] mb-4 flex flex-row items-center gap-4">
              <BackArrow />
              <p>Contacts</p>
              <img
                ref={dropDownToggleRef}
                onClick={() => setDropDownShowing(!dropDownShowing)}
                className={`w-[30px] h-[30px]  transition-[5000] ${
                  dropDownShowing ? "" : `rotate-90`
                } `}
                src="../chevron.svg"
                alt=""
              />
            </div>
            <button
              className="w-[40px] aspect-square flex items-center justify-center bg-tekhelet rounded-full"
              onClick={() => {
                setCurrentPage("add");
                setDropDownShowing(false);
              }}
            >
              <img
                className="w-[25px] h-[25px]"
                src="../addUserIcon.svg"
                alt=""
              />
            </button>
          </>
        )}
      </div>
      <ul
        ref={dropDownRef}
        className={` ${
          !dropDownShowing && `hidden`
        } bg-midGray w-[200px] rounded-lg border-mainGray  border z-30 absolute  text-white `}
      >
        <li
          onClick={() => {
            setCurrentPage("current");
            setDropDownShowing(false);
          }}
          className=" border-b cursor-pointer flex flex-row items-center justify-between border-mainGray p-2"
        >
          <p>Current</p>
          <img
            className="w-[20px] h-[20px]"
            src="../groupIconWhite.svg"
            alt=""
          />
        </li>
        <li
          onClick={() => {
            setCurrentPage("pending");
            setDropDownShowing(false);
          }}
          className="border-b border-mainGray flex flex-row items-center justify-between cursor-pointer p-2"
        >
          <p>Pending</p>
          <img className="w-[20px] h-[20px]" src="../pendingIcon.svg" alt="" />
        </li>
        <li
          onClick={() => {
            setCurrentPage("requests");
            setDropDownShowing(false);
          }}
          className="flex flex-row items-center justify-between cursor-pointer p-2"
        >
          <p>Requests</p>
          <img className="w-[20px] h-[20px]" src="../requestIcon.svg" alt="" />
        </li>
      </ul>

      {currentPage === "current" && <CurrentContacts />}

      {currentPage === "pending" && <PendingContactsSent />}

      {currentPage === "requests" && <PendingContactsReceived />}
      {currentPage === "add" && <AddUsers />}
    </div>
  );
};

export default ContactsComp;
