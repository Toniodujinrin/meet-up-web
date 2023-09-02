import React from 'react';

import { toast } from 'react-hot-toast';
const NotificationToast = ({t,newNotification,navigate,location}) => {
   
    return (
        <div
        onClick={()=>{ location.pathname != `/conversation/${newNotification[0].conversationId}` && navigate(`/conversation/${newNotification[0].conversationId}`,{replace:true}); toast.dismiss(t.id)}}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-black shadow-lg rounded-lg pointer-events-auto cursor-pointer flex border-2 border-mainGray`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1 text-white">
            <p className="text-[18px] font-semibold">New Message</p>
            </div>
          </div>
        </div>
        <div className="flex border-l-2  border-mainGray">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-tekhelet hover:text-indigo-500 "
          >
            Close
          </button>
        </div>
      </div>
      );
}
 
export default NotificationToast;