import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Contact from './contact';
import InputGroup from '../../inputGroup';
import { ConversationContext } from '../../../contexts/conversationContext';
import BackArrow from '../../backArrow';
import ButtonMain from '../../buttonMain';

const Create = () => {
    const {userContacts} = useContext(UserContext)
    const {createConversation} = useContext(ConversationContext)
    const [selected,setSelected] = useState([])
    const [name, setName] = useState("")
    
    const handleCreate = ()=>{
     let payload = {
        users:selected
     }
     if(selected.length ==1 ){
        payload.type = "single"
     }
     else{
        payload.type = "group"
        payload.name = name 
     }
     createConversation(payload)
    }


    const select = (_id)=>{
       if(selected.includes(_id)){
         let _selected = [...selected]
         _selected = _selected.filter(item => item !== _id)
         setSelected(_selected)
       }
       else setSelected([...selected,_id])
    }

    return (  
        <div className='w-full h-full bg-black p-4'>
            <div className='flex flex-row justify-between mb-4'>
            <div className='flex gap-3 items-center'>
            <BackArrow/>
            <h1 className='text-white font-semibold text-[32px]'>New</h1>
            </div>
            <ButtonMain onClick={handleCreate} disabled={selected.length == 0 || (selected.length > 1 && name.length ===0)} text={"Create"}/>
           
            </div>
            {
                selected.length > 1 &&
                <InputGroup placeholder={"Conversation Name"} icon={"../groupIcon.svg"} value={name} setValue={setName} />

            }
            <div className='w-full lg:grid grid-cols-3 flex flex-col  mt-4 gap-4'>
            {
                userContacts.map(contact => 
                    <Contact key={contact._id} image={contact.profilePic? contact.profilePic.url:"../userIcon.svg"} username={contact.username} _id = {contact._id} selected={selected} select={select}/>
                )
            }
            </div>
        </div>
    );
}
 
export default Create;