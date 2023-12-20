import React, { useContext, useEffect, useState } from "react";
import Overview from "../../components/conversations/overview";
import { UserContext } from "../../contexts/UserContext";
import { useQueries } from "react-query";
import LoadingPage from "../../components/loadingPage";

const Main = () => {
  const { getSelf, getConversations, getContacts, getPendingReceived } =
    useContext(UserContext);
  const [q1, q2, q3, q4] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["conversations"], queryFn: getConversations },
    { queryKey: ["contacts"], queryFn: getContacts },
    { queryKey: ["pendingReceived"], queryFn: getPendingReceived },
  ]);
  return (
    <>
      {q1.isLoading || q2.isLoading || q3.isLoading || q4.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError || q1.isError || q2.isError ? (
        <div className="w-screen h-screen bg-darkGray"></div>
      ) : (
        <div className="flex w-screen min-h-screen bg-darkGray justify-between">
          <div className="lg:w-[40%] w-full bg-darkGray border-r border-mediumGray ">
            <Overview />
          </div>
          <div
            id="main-paper"
            className="lg:w-[60%] lg:flex hidden bg-repeat bg-darkGray  "
          ></div>
        </div>
      )}
    </>
  );
};

export default Main;
