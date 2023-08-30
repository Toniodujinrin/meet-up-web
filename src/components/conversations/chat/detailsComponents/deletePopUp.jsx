import React from 'react';
import DangerButton from '../../../DangerButton';
import { ConversationContext } from '../../../../contexts/conversationContext';
import { useContext } from 'react';
const DeletePopUp = ({setDeleteShowing, deleteAction}) => {
    const {leaveConversation, deleteConversation, conversationProcessLoading} = useContext(ConversationContext)
    return ( 
        <div className='w-[400px] flex items-center  flex-col p-3 h-[300px] absolute bg-black z-30  border border-midGray rounded-md'>
            <img onClick={()=> setDeleteShowing(false)} src="../close.svg" className=' flex self-end w-[20px] h-[20px] cursor-pointer' alt="" />
            {
                 deleteAction =="leave" &&
                <h1 className='text-white text-[21px] my-8 text-center'>Are you sure you want to leave this conversation, you will not be able to enter join again untill someone adds you back</h1>
            }
            {
               deleteAction == "delete" &&
                <h1 className='text-white text-[21px] my-8 text-center'>Are you sure you want to delete this conversation? This action is irreversible.</h1>
            }
            {
                deleteAction =="leave" &&
                <DangerButton loading={conversationProcessLoading} onClick={()=>leaveConversation()} text={"Leave Conversation"}/>
            }

            {
                deleteAction == "delete" &&
                <DangerButton  text={"Delete Conversation"} onClick={()=>{deleteConversation()}} loading={conversationProcessLoading}/>
            }
            
        </div>
     );
}
 
export default DeletePopUp;