import React from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import MessagePic from './messagePic';

const ConversationMessage = ({body,timeStamp, senderId, status}) => {
    
    dayjs.extend(relativeTime)
    const user = JSON.parse(window.localStorage.getItem("user"))
    
    return ( 
        <div className={`flex flex-row gap-3 items-start   ${senderId._id == user._id && `self-end`}`}>
{senderId._id !== user._id &&
    <MessagePic image={senderId.profilePic? senderId.profilePic.url:""}/>
}
        

        <div className={`flex flex-col ${senderId._id == user._id && ` items-end`}  `}>
        <div className={`${senderId._id == user._id?`bg-tekhelet self-end`:`bg-midGray self-start`} w-fit max-w-[300px] flex  px-[9px] py-[6px] text-white rounded-[18px]`}>
            <p>{body}</p>
        </div>
        <div className='flex flex-row gap-2'>
        <small className='text-mainGray self-end flex'>{`${dayjs(timeStamp).fromNow()}`}</small>
        {
            senderId._id == user._id ?
            <small className='text-tekhelet'>{status}</small>
            :
            <small className='text-tekhelet'>{senderId.username}</small>
        }
        </div>
        </div>


        </div>
     );
}
 
export default ConversationMessage;