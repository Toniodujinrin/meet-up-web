import React, { useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../../../contexts/socketContext';



const CallComp = ({conversationDetails}) => {
    const remoteVideoRef = useRef()
    
    const streamRef = useRef()
    const {remoteStream, stream,peersConnected } = useContext(SocketContext)
   
    useEffect(()=>{
        
        if(remoteVideoRef.current && remoteStream){
            remoteVideoRef.current.srcObject = remoteStream
        }

        if(streamRef.current && stream){
            streamRef.current.srcObject = stream
        }
    })

    return ( 
        <div className='flex flex-col justify-between h-screen '>
        {
            peersConnected &&
            (
            remoteStream?
            <video className='' ref={remoteVideoRef} autoPlay playsInline></video>:
            <div className='w-full bg-darkGray flex justify-center items-center h-[50%]'>
            <div className='bg-black rounded-full object-cover w-[200px] h-[200px]'>
            <img className='w-full h-full rounded-full' src={conversationDetails.conversationPic.url? conversationDetails.conversationPic.url : "../userIcon.svg"} alt="" />
            </div>
            </div>
            )
        }
        
        <video  className={`${peersConnected? `w-full h-[50%]`:`w-full h-screen outline-none` }`} ref={streamRef} autoPlay ></video>
        
        </div>
     );
}
 
export default CallComp;