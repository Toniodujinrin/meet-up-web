import React from 'react';
import ProfilePic from '../../profilePic';

const Contact = ({username, image, _id, selected, select}) => {
    return ( 
        <div onClick={()=>select(_id)} className='bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full gap-3 p-3 h-[70px] items-center flex flex-row'>
            <div  className={`w-[20px] h-[20px] ${selected.includes(_id) && "bg-tekhelet"}  border-mainGray border-2 rounded-full`}></div>
            <ProfilePic image={image}/>
            <div>
            <p className='text-white'>{username}</p>
            <small className='text-mainGray'>{_id}</small>
            </div>
        </div>
     );
}
 
export default Contact;