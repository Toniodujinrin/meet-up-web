import React, { useContext } from "react";
import Overview from "../../components/conversations/overview";
import Create from "../../components/conversations/create";
import { UserContext } from "../../contexts/UserContext";
import { useQueries } from "react-query";
import LoadingPage from "../../components/loadingPage";
import ContactPopUp from "../../components/popUps/contactPopUp";

const NewConversation = () => {
  const { getSelf, getConversations, getContacts, contactPopUpShowing } =
    useContext(UserContext);
  const [q1, q2, q3] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["conversations"], queryFn: getConversations },
    { queryKey: ["contacts"], queryFn: getContacts },
  ]);
  return (
    <>
      {q1.isLoading || q2.isLoading || q3.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError || q3.isError ? (
        <div className="w-screen h-screen bg-darkGray"></div>
      ) : (
        <div className="flex w-screen h-screen bg-darkGray justify-between">
          <div className="lg:w-[40%] lg:flex hidden  w-full border-r border-mediumGray ">
            <Overview />
          </div>
          <div
            className={`lg:w-[60%]  ${
              contactPopUpShowing && "justify-center flex flex-col items-center"
            } w-screen h-full `}
          >
            {contactPopUpShowing && <ContactPopUp />}
            <Create />
          </div>
        </div>
      )}
    </>
  );
};

export default NewConversation;
