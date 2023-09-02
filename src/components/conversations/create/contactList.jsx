import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Contact from './contact';
const ContactList = ({selected, select}) => {
    const {userContacts} = useContext(UserContext)
    const [contactList,setContactList] = useState([])

    useEffect(()=>{
        const list=[]
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (let letter of alphabets){
            const listOfContacts = []
            userContacts.forEach(contact => {if(contact._id[0].toUpperCase() == letter) listOfContacts.push(contact)})
            if(listOfContacts.length){
                list.push({letter,listOfContacts})
            }
            
        
        }
        setContactList(list)
    },[userContacts])

    

    return ( 
       <>
       {
        contactList.map(alphabet => 
        <div className='flex flex-col my-4 items-start'>
       <h1 className='text-white text-[21px]'>{alphabet.letter}</h1>
       <div className='w-full lg:grid grid-cols-3 flex flex-col  mt-4 gap-4'>
          {
              alphabet.listOfContacts.map(contact => 
                  <Contact key={contact._id} image={contact.profilePic? contact.profilePic.url:"../userIcon.svg"} username={contact.username} _id = {contact._id} selected={selected} select={select}/>
              )
          }
        </div>
        </div>
       )}
       </>
    );
}
 
export default ContactList;