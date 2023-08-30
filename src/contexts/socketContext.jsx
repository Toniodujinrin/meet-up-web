import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import Encryption from "../encryption";
import { TokenContext } from "./TokenContext";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";


 const URL = "https://meetup-server.top/"

//  const URL = "https://localhost:3004/"


export const SocketContext = createContext()
const sock = io(URL,{autoConnect:false,  withCredentials:true, secure:true})

const SocketContextProvider = ({children})=>{
    const location = useLocation()
    const queryClient = useQueryClient()
    const user = JSON.parse(window.localStorage.getItem("user"))
    const encryption = new Encryption()
    const [socket,setSocket] = useState()
    const navigate = useNavigate()
    const {checkForToken} = useContext(TokenContext)
    const [onlineContacts,setOnlineContacts] = useState([])
    const [messages,setMessages] = useState([])
    const [onlineGroupUsers,setOnlineGroupUsers] = useState([])
    const [groupKey, setGroupKey] = useState("")
    const [previousMessages, setPreviousMessages] = useState([])
    const [newMessage,setNewMessage] = useState({})
    const [encryptedGroupKey,setEncryptedGroupKey] = useState()
    const [currentConversation,setCurrentConversation] = useState('')
    const [finishedTyper, setFinishedTyper] = useState("")
    const [newTyper, setNewTyper] = useState("")
    const [typing, setTyping] = useState([])
    const [newNotification,setNewNotification] = useState([])
    const [notifications, setNotifications] = useState([])
    
    useEffect(()=>{
        //perform connection again when the page is re-loaded redirect user to main page
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        sock.on("new_notification",args => setNewNotification(args))
        sock.on("notification",args => setNotifications(args))
        sock.on("conn_error",()=>{toast.error("connection error")})
        navigate("/main",{replace:true})
        setSocket(sock)
        return ()=>{
            sock.disconnect()
        }
    },[])

    useEffect(()=>{
        if(newTyper && newTyper !== user._id){
            setTyping([newTyper,...typing])
        }
    },[newTyper])


    useEffect(()=>{
        if(finishedTyper){
        let  _typing = [...typing]
        _typing = _typing.filter(typer => typer != finishedTyper)
        setTyping(_typing)
        }
    },[finishedTyper])

    useEffect(()=>{
        setNewTyper("")
        setFinishedTyper("")
    },[typing])

    const connect = ()=>{
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        sock.on("new_notification",args => setNewNotification(args))
        sock.on("notification",args => setNotifications(args))
        setSocket(sock)
    }

    useEffect(()=>{
        try {
            queryClient.invalidateQueries(["conversations"])
            if(newMessage && groupKey){
                const _newMessage = newMessage
                _newMessage.body = JSON.parse(encryption.decryptMessage(_newMessage.body, groupKey))
                if(_newMessage.senderId._id !== user._id){
                    socket.emit("messageRead",{conversationId:currentConversation})
                }
                setMessages([...messages,_newMessage])
        }
        } catch (error) {
            
        }
    },[newMessage])

    useEffect(()=>{
        if(encryptedGroupKey && user){
            setGroupKey(encryption.decryptGroupKey(user.keyPair.privateKey,encryptedGroupKey))
        }
    },[encryptedGroupKey])

    useEffect(()=>{
        try{
        if(groupKey && previousMessages){
            const _previousMessages = [...previousMessages]
            _previousMessages.map(message => {
                if(typeof message.body == "string") message.body = JSON.parse(encryption.decryptMessage(message.body,groupKey))
            })
            setMessages(_previousMessages)
            setPreviousMessages()
        }
       }
       catch(error){
        
       }
    },[groupKey,previousMessages])




    useEffect(()=>{
        if(newNotification.length >0){
            queryClient.invalidateQueries(["conversations"])
            setNotifications(newNotification)
            toast.custom((t) => (
                <div
                  onClick={()=>{ location.pathname != `/conversation/${newNotification[0].conversationId}` && navigate(`/conversation/${newNotification[0].conversationId}`,{replace:true}); toast.dismiss(t.id)}}
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-black shadow-lg rounded-lg pointer-events-auto cursor-pointer flex border-2 border-mainGray`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="ml-3 flex-1 text-white">
                      <p className="text-[18px] font-semibold">New Message</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l-2  border-mainGray">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-tekhelet hover:text-indigo-500 "
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))
              setNewNotification([])
        }
    },[newNotification])










    const disconnect = ()=>{
        if(socket){
            socket.disconnect()
        }
        
    }

    const joinConversation = (conversationId)=>{
        if(socket){
            if(currentConversation){
                leaveConversation(currentConversation)
            }
            setCurrentConversation(conversationId)
            socket.emit("join",{conversationId})
            socket.on("typing", args =>setNewTyper(args))
            socket.on("notification", args => setNotifications(args))
            socket.on("new_notification",args => setNewNotification(args))
            socket.on("finished typing", args => setFinishedTyper(args))
            socket.on("previousMessages", args =>setPreviousMessages(args))
            socket.on("groupKey", args => setEncryptedGroupKey(args))
            socket.on("onlineUsers", args => setOnlineGroupUsers(args))
            socket.on("new_message", args => setNewMessage(args))
        }
    }

    const leaveConversation = (conversationId)=>{
        if(socket){
            socket.emit("leaveRoom",{conversationId})
            setMessages([])
        }
        
    }

    const sendMessage = (payload)=>{
        if(groupKey && socket){
        payload.body = encryption.encryptMessage(payload.body, groupKey)
        socket.emit("message",payload)
        }
        else toast.error("could not send message")
    }

    const sendTyping = (isTyping)=>{
        if(isTyping){
            return socket.emit("typing",{conversationId:currentConversation})
        }
        socket.emit("finished typing",{conversationId:currentConversation})
    }

    

    return(
        <SocketContext.Provider value={{joinConversation, connect, messages, onlineGroupUsers, sendMessage, onlineContacts, leaveConversation,disconnect, sendTyping, typing, notifications, groupKey}}>
            {children}
        </SocketContext.Provider>
    )

}

export default SocketContextProvider