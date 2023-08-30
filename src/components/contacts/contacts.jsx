import React from 'react';
import ProfilePic from '../profilePic';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const Contact = ({username, image, _id}) => {
    const user = JSON.parse(window.localStorage.getItem("user"))
    const {pendingReceived, userContacts, pendingSent, sendRequest , acceptRequest} = useContext(UserContext)
    const contacts = userContacts.map(contact => {return contact._id})
    const received = pendingReceived.map(contact => {return contact._id})
    const sent = pendingSent.map(contact => {return contact._id})
    return ( 
        <div className='bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full  justify-between p-3 h-[80px] items-center flex flex-row '>
            <div className='flex flex-row gap-3 items-center'>
            <ProfilePic image={image}/>
            <div className='flex flex-col'>
            <p className='text-white'>{username}</p>
            <small className='text-mainGray'>{_id}</small>
            {
                sent.includes(_id)&&
                <small className='text-tekhelet '>pending</small>
            }
            </div>
            </div>
            {
                !contacts.includes(_id) && !received.includes(_id) && !sent.includes(_id)&& user._id !== _id&&
                <img onClick={()=>sendRequest(_id)} className='w-[30px] h-[30px]' src="../addIcon.svg" alt="" />
            }

            {
                received.includes(_id)&&
                <img onClick={()=>acceptRequest(_id)} src="../accept.svg" alt="" className='w-[20px] ml-3 h-[20px]' />
            }

            
        </div>
     );
}
 
export default Contact;