import React from 'react';

const ProfilePic = ({image, type}) => {
    
    return ( 
        <div>
                {
                    type == "online"&&
                    <div className='w-[15px] aspect-square  border-2 border-darkGray rounded-full relative top-[15px] bg-tekhelet'></div>
                }
            
            <div className={`w-[50px] ${!image && `p-2`} bg-black border-2 border-midGray aspect-square rounded-full`}>
            
            <img className={` w-full h-full ${image && `rounded-full`}`} src={image} alt="" />
            </div>
            </div>
        
     );
}
 
export default ProfilePic;