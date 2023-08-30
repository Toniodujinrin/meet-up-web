import React, { useEffect, useState } from 'react';
import InputBox from './inputBox';
import Header from './header';
import { useContext } from 'react';
import { SocketContext } from '../../../contexts/socketContext';
import { useParams } from 'react-router-dom';
import { useRef} from 'react';
import Message from './message';
import Typing from './typing';
import { ConversationContext } from '../../../contexts/conversationContext';
import ConversationMessage from './conversationMessage';
import Info from './detailsComponents/info';
import Add from "./detailsComponents/add"


const Chat = () => {

    const ref = useRef()
    const [currentDisplay, setCurrentDisplay] = useState("chat")

    const {messages, sendMessage, sendTyping, typing} = useContext(SocketContext)
    const {conversationDetails} = useContext(ConversationContext)
    const [value,setValue] = useState("")
    const [isTyping,setIsTyping] = useState(false )
    const [typingTimeout, setTypingTimeout] = useState()
    

    const handleTypingStart = ()=>{
        if(typingTimeout) clearTimeout(typingTimeout)
        setIsTyping(true)
    }

    const handleTyinpingStop = ()=>{
        if(typingTimeout) clearTimeout(typingTimeout)
        const timeout = setTimeout(()=>{
            setIsTyping(false)
        },1500)
        setTypingTimeout(timeout)
    }

    const {id} = useParams()
    const handleSendMessage = ()=>{
        const paylaod = {
            body:value,
            conversationId:id
        }
        sendMessage(paylaod)
        setValue("")
    }


    useEffect(()=>{
       
        sendTyping(isTyping)
    
    },[isTyping])
    
    useEffect(()=>{

       if(ref.current){
       ref.current.scrollTop = ref.current.scrollHeight
       }
     
    })

   
    
    return ( 
        <>
        {
            currentDisplay == "chat" &&
            

            <div className='h-screen w-full flex flex-col'>
            <Header setCurrentDisplay = {setCurrentDisplay}/>
            <div className='bg-black flex justify-center items-center flex-col w-full h-[calc(100vh-200px)]'>
                <div className='mx-auto w-fit p-2 mt-3 items-center flex flex-row gap-3 rounded-md bg-midGray'>
                    <img src="../lockIcon.svg" className='w-[20px] h-[20px]' alt="" />
                    <p className='text-mainGray'>End to End Encrypted</p>
                </div>
                <div ref={ref}  className=' flex overflow-scroll scrol  overflow-x-hidden h-[calc(100%-50px)] flex-col gap-4 w-full p-3 '>
                {
                        messages.map((message,index) =>
                            conversationDetails.type == "single"
                                ?
                                <Message 
                                key={index} 
                                body={message.body} 
                                senderId={message.senderId} 
                                timeStamp={message.timeStamp} 
                                status={message.status}
                                />
                                :
                                <ConversationMessage 
                                key={index} 
                                body={message.body} 
                                senderId={message.senderId} 
                                timeStamp={message.timeStamp} 
                                status={message.status} 
                                />
                        )
                        }
                    {
                        typing.length>0 &&
                        <Typing user={typing[0]}/>
                    }
                </div>
            </div>
            <InputBox 
            handleTypingStart={handleTypingStart} 
            handleTypingStop={handleTyinpingStop} 
            value={value} setValue={setValue} 
            handleSendMessage={handleSendMessage}
            />
            </div> 
         }
            
        {
            currentDisplay == "info" &&

            <Info  setCurrentDisplay={setCurrentDisplay} />
           
            
            
        }
        {
            currentDisplay == "add" &&
            <Add setCurrentDisplay={setCurrentDisplay}/>
        }
           
        
        </>
    );
}
 
export default Chat;