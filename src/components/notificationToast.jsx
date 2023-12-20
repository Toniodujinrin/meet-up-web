import React from "react";

import { toast } from "react-hot-toast";
const NotificationToast = ({ t, newNotification, navigate, location }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full h-[60px] bg-black shadow-lg rounded-[30px] pointer-events-auto  cursor-pointer flex border-2 border-mainGray`}
    >
      <div
        onClick={() => {
          location.pathname !=
            `/main/conversation/${newNotification.conversationId}` &&
            navigate(`/main/conversation/${newNotification.conversationId}`, {
              replace: true,
            });
          toast.dismiss(t.id);
        }}
        className="flex-1 w-0 p-4"
      >
        <div className="flex items-start justify-center">
          <img
            className="w-[25px] h-[25px]"
            src="../../newMessageNotification.svg"
            alt=""
          />
          <div className="ml-3 flex-1 text-white">
            <p className="text-[18px] font-semibold">{`${
              newNotification.conversationDetails &&
              newNotification.conversationDetails.name
            } `}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-[90%] border mr-4 bg-white border-transparent  h-fit rounded-[20px] px-4 py-2 flex items-center justify-center text-[16px] font-medium text-balck "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
