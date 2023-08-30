import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import Contact from '../../create/contact';
import { ConversationContext } from '../../../../contexts/conversationContext';
import { SocketContext } from '../../../../contexts/socketContext';

const Add = ({setCurrentDisplay}) => {
    const [selected,setSelected] = useState([])
    const {userContacts} = useContext(UserContext)
    const {conversationDetails,addToConversation, conversationProcessLoading } = useContext(ConversationContext)
    const {groupKey} = useContext(SocketContext)
    

    const users = conversationDetails.users.map(user => {return user._id})
    const listOfContacts = userContacts.filter(contact => !users.includes(contact._id))
    
    
    const select = (_id)=>{
       
        if(selected.includes(_id)){
         const _selected = selected.filter(item => item !== _id)
         setSelected(_selected)
       }
       else setSelected([_id,...selected])
     
    }

    const handleAdd = ()=>{
        
        const payload = {
            conversationId:conversationDetails._id,
            users:selected,
            groupKey
        }
        addToConversation(payload)

    }

    return (  
        <div className='w-full h-full bg-black p-4'>
            <div className='flex flex-row justify-between mb-4'>
            <div className='flex gap-3 items-center'>
            <img onClick={()=>setCurrentDisplay("info")} src="../chevron.svg" className='w-[30px] h-[30px] cursor-pointer rotate-180 ' alt="" />
            <h1 className='text-white font-semibold text-[32px]'>Add</h1>
            </div>
            <button onClick={handleAdd} disabled={selected.length == 0}  className='py-2 w-[100px] flex items-center justify-center bg-tekhelet rounded-lg text-white'>
                {
                    conversationProcessLoading?
                    <div className='dot-flashing'></div>
                    :
                    <p>Add</p>
                }
                
            </button>
            </div>
       
            <div className='w-full lg:grid grid-cols-3 flex flex-col  mt-4 gap-4'>
            {
                listOfContacts.map(contact => 
                    <Contact key={contact._id} image={contact.profilePic? contact.profilePic.url:""} username={contact.username} _id = {contact._id} selected={selected} select={select}/>
                )
            }
            </div>
        </div>
    );
}
 
export default Add;