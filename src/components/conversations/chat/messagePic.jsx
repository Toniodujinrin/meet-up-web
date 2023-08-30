import React from 'react';

const MessagePic = ({image}) => {
    
    return ( 
       
         
            <div className={`w-[38px] ${!image && `p-2`} bg-black border-2 border-midGray aspect-square rounded-full`}>
            
            <img className={` w-full h-full ${image && `rounded-full`}`} src={image?image:"../userIcon.svg"} alt="" />
            </div>
          
        
     );
}
 
export default MessagePic;