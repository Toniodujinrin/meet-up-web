import React, { useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../../../contexts/socketContext';
import ReactPlayer from 'react-player';


const CallComp = ({conversationDetails}) => {
  
    const {remoteStream, stream,peersConnected } = useContext(SocketContext)
        

    return ( 
        <div className='flex flex-col justify-between h-screen '>
        {
            peersConnected &&
            (
            remoteStream?
            
            <ReactPlayer playing  url={remoteStream}/>:
            <div className='w-full bg-darkGray flex justify-center items-center h-[50%]'>
            <div className='bg-black rounded-full object-cover w-[200px] h-[200px]'>
            {/* <img className='w-full h-full rounded-full' src={conversationDetails.conversationPic.url? conversationDetails.conversationPic.url : "../userIcon.svg"} alt="" /> */}
            </div>
            </div>
            )
        }
        
        {
            stream?
            <ReactPlayer playing muted url={stream}/>:
            <div className={`w-full ${peersConnected?`border-t border-mainGray` :`h-screen` } bg-darkGray flex justify-center items-center h-[50%]`}>
            <div className='bg-black rounded-full object-cover w-[200px] h-[200px]'>
            {/* <img className='w-full h-full rounded-full' src={conversationDetails.conversationPic.url? conversationDetails.conversationPic.url : "../userIcon.svg"} alt="" /> */}
            </div>
            </div>
        }
        
        
        </div>
     );
}
 
export default CallComp;