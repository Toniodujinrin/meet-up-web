import React from 'react';
import ProfilePic from '../../profilePic';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { SocketContext } from '../../../contexts/socketContext';
const OnlineUsers = () => {
    const {userContacts} = useContext(UserContext)
    const {onlineContacts} = useContext(SocketContext)
    

    
    return ( 
        <div className='w-full p-4 '>
            <h1 className='text-white text-[21px]'>Online</h1>
            <div className='flex flex-row gap-4 mt-3 overflow-scroll overflow-y-hidden scroll  pb-3'>
                {
                    userContacts.map((user,index)=>
                    
                        <div key={index}  className={`items-center ${!onlineContacts.includes(user._id) && `hidden` } flex flex-col`}>
                        <ProfilePic 
                        image={user.profilePic? user.profilePic.url: "../userIcon.svg"} 
                        type={'online'}
                        />
                        <p  className=' text-mainGray'>{user.username}</p>
                    </div>
                    )
                }
            </div>
        </div>
     );
}
 
export default OnlineUsers;