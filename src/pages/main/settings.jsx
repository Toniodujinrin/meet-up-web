import React, { useContext } from "react";
import Overview from "../../components/conversations/overview";
import { UserContext } from "../../contexts/UserContext";
import { useQueries } from "react-query";
import LoadingPage from "../../components/loadingPage";
import SettingsComp from "../../components/settings";

const Settings = () => {
  const { getSelf, getConversations } = useContext(UserContext);
  const [q1, q2] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["conversations"], queryFn: getConversations },
  ]);
  return (
    <>
      {q1.isLoading || q2.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError ? (
        <div className="w-screen h-screen bg-black"></div>
      ) : (
        <div className="flex w-screen min-h-screen bg-black  justify-between">
          <div className="lg:w-[40%] lg:flex hidden bg-darkGray  w-full border-r border-mediumGray ">
            <Overview />
          </div>
          <div className="lg:w-[60%] w-full h-screen overflow-y-scroll">
            <SettingsComp />
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
