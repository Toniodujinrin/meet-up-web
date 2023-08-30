import React from 'react';
import Conversation from './conversation';
import { useNavigate } from 'react-router-dom';
import ButtonMain from '../../buttonMain';
const Conversations = ({searchResults}) => {
    const navigate = useNavigate()
    
  
    return ( 
        <div className='bg-darkGray h-full w-full p-4'>
            <div className='w-full flex flex-row justify-between items-center'>
            <h1 className='text-[21px] text-white'>Conversations</h1>
            <ButtonMain onClick={()=>navigate("/create")} text={"New"}/>
            
            </div>
            {
                searchResults.map(conversation =>
                    <Conversation 
                    _id = {conversation._id}
                    lastMessage={conversation.lastMessage} 
                    key={conversation._id} 
                    name={conversation.name} 
                    image={conversation.conversationPic && conversation.conversationPic.url? conversation.conversationPic.url:conversation.type =="single"? "../userIcon.svg":"../groupIcon.svg"} 
                    />
                )
            }

        </div>
     );
}
 
export default Conversations;