import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ConversationContext } from '../../../../contexts/conversationContext';
import { SocketContext } from '../../../../contexts/socketContext';
import ContactList from '../../create/contactList';

const Add = ({setCurrentDisplay}) => {
    const [selected,setSelected] = useState([])
   
    const {conversationDetails,addToConversation, conversationProcessLoading } = useContext(ConversationContext)
    const {groupKey} = useContext(SocketContext)
    
    
    
    
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
       
           <ContactList select={select} selected={selected}/>
        </div>
    );
}
 
export default Add;