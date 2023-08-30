import React from 'react';
import ProfilePic from '../../profilePic';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { useContext } from 'react';
import { ConversationContext } from '../../../contexts/conversationContext';
import { SocketContext } from '../../../contexts/socketContext';
import { useNavigate, useParams } from 'react-router-dom';

const Header = ({setCurrentDisplay}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    dayjs.extend(relativeTime)
    const {conversationDetails} = useContext(ConversationContext)
    const {onlineGroupUsers, leaveConversation } = useContext(SocketContext)
    
    
    return (  
        <div className='bg-darkGray w-full h-[100px] flex border-b border-midGray flex-row items-center justify-between p-4 '>
            <div className='flex flex-row gap-3 items-center'>
            <img onClick={()=>{navigate("/main"); leaveConversation(id)}} src="../chevron.svg" className='w-[30px] h-[30px] cursor-pointer rotate-180 lg:hidden' alt="" />

                <ProfilePic 
                image={conversationDetails.conversationPic.url?conversationDetails.conversationPic.url: conversationDetails.type == "single"?"../userIcon.svg":"../groupIcon.svg"}
                />
                <div>
                    <p className='text-white font-semibold'>{conversationDetails.name}</p>
                    {
                        conversationDetails.type =="single"?
                            <small className={`${onlineGroupUsers.length <= 1? `text-mainGray`:`text-tekhelet`}`}>{`${onlineGroupUsers.length <= 1? `Last seen : ${dayjs(conversationDetails.lastSeen).fromNow()}` : "online"}`}</small>
                            :
                            <div>
                                {}
                            </div>
                    }
                    
                </div>
            </div>

            <div className='flex flex-row gap-4 '>
                <img  className={'w-[25px] cursor-pointer'} src="../phoneIcon.svg" alt="" />
                <img className={'w-[25px] cursor-pointer'} src="../videoIcon.svg" alt="" />
                <img onClick={()=>setCurrentDisplay("info")} className={'w-[25px] cursor-pointer'} src="../menuIcon.svg" alt="" />
            </div>
        </div>
    );
}
 
export default Header;