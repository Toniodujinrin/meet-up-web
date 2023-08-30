import React from 'react';
import ProfilePic from '../../profilePic';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const ProfileHeader = ({setDrowpDownShowing, dropDownShowing}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    
    return ( 
        <div className='flex flex-row p-4 border-b z-20 w-full justify-between h-[100px] border-midGray items-center'>
            <div onClick={()=> navigate("/settings")} className=' flex flex-row cursor-pointer  gap-4'>
            <ProfilePic image={user.profilePic?user.profilePic.url:"../userIcon.svg"}/>
            <div>
                <p className='text-white'>{user.username}</p>
                <small className='text-mainGray'>My Account</small>
            </div>
            </div>
            
            <div className='flex flex-col' >
            
        
            
            <img onClick={()=>setDrowpDownShowing(!dropDownShowing)} src="../menuIcon.svg" className='w-[30px] z-20 relative aspect-square cursor-pointer' alt="" />
          
           
            </div>
            
        </div>
     );
}
 
export default ProfileHeader;