import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import Encryption from "../encryption";
import { TokenContext } from "./TokenContext";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import axios from "axios";
import NotificationToast from "../components/notificationToast";
import SimplePeer from "simple-peer";


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
    const [newOnlineContact,setNewOnlineContact] = useState("")
    const [newOfflineContact,setNewOfflineContact] = useState("")
    const [peer, setPeer] = useState(null)
    const [stream, setStream] = useState(null)
    const [call, setNewCall] = useState(null)
    const [remoteStream,setRemoteStream] = useState(null)
    const [peersConnected, setPeersConnected] = useState(false)
 
    
    
    
    useEffect(()=>{
        if(location.pathname !== "/"){
        //perform connection again when the page is re-loaded redirect user to main page
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        sock.on("new_notification",args => setNewNotification(args))
        sock.on("notification",args => setNotifications(args))
        sock.on("newOnlineContact", args => setNewOnlineContact(args))
        sock.on("newOfflineContact", args => setNewOfflineContact(args))
        sock.on("conn_error",()=>{toast.error("connection error")})
        sock.on("offerSignalError", (e)=>{console.log(e)})
        sock.on("signaling_error", (e)=> console.log(e))
        sock.on("call",args=>setNewCall(args))
        setSocket(sock)
        navigate("/main",{replace:true})
        
        return ()=>{
            sock.disconnect()
        }
        }
    },[])



    useEffect(()=>{
        if(call){
            navigate(`/call/${call.conversationId}`)
            const p = new SimplePeer({initiator:false, trickle:false})
            navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((selfStream)=>{p.addStream(selfStream);setStream(selfStream)}).catch((err)=>console.log("could not get user media"))
            setPeer(p)
           p.signal(call.offer)
           p.on("stream", remoteStream=>{setRemoteStream(remoteStream)})
           p.on("signal",(data)=>{
                
              socket.emit("call_response",{answer:data, conversationId:call.conversationId})
            })
           p.on("connect",args => setPeersConnected(true))
           p.on("error",(err)=>{p.destroy(); setPeersConnected(false);navigate("/main"); console.log(err); })
           //p.on("close",(err)=>{p.destroy();  setPeersConnected(false);navigate("/main"); console.log(err)})
        }
        return () => {
            if (peer) {
              peer.destroy();
           }  
        }
        
    },[call])

    const makeCall = ()=>{
        navigate(`/call/${currentConversation}`)
        const p = new SimplePeer({initiator:true, trickle:false})
        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((selfStream)=>{setStream(selfStream); p.addStream(selfStream)}).catch((err)=> console.log("could not set Media"))
        p.on("signal", (data)=>{
            
            socket.emit("call",{offer:data,conversationId:currentConversation})
        })
        socket.on("call_response", answer => p.signal(answer))
        p.on("connect",args => setPeersConnected(true))
        p.on("stream", (remoteStream)=>{setRemoteStream(remoteStream)})
        p.on("error",()=>{p.destroy(); navigate("/main"); socket.off("call_response")})
        p.on("close",()=>{p.destroy(); navigate("/main"); socket.off("call_response")})
    }

    useEffect(()=>{ console.log("remote Stream"+remoteStream,stream)},[remoteStream,stream])






    useEffect(()=>{
        if(newTyper && newTyper !== user._id){
            setTyping([newTyper,...typing])
            setNewTyper("")

        }
    },[newTyper])


    useEffect(()=>{
        if(finishedTyper){
        let  _typing = [...typing]
        _typing = _typing.filter(typer => typer != finishedTyper)
        setTyping(_typing)
        setFinishedTyper("")
        }
    },[finishedTyper])

 

    const connect = ()=>{
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        sock.on("new_notification",args => setNewNotification(args))
        sock.on("notification",args => setNotifications(args))
        sock.on("newOnlineContact", args => setNewOnlineContact(args))
        sock.on("newOfflineContact", args => setNewOfflineContact(args))
        sock.on("conn_error",()=>{toast.error("connection error")})
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
               <NotificationToast t={t} newNotification={newNotification} navigate={navigate} location={location}/>
              ))
              setNewNotification([])
        }
    },[newNotification])


    useEffect(()=>{
        if(newOnlineContact && !onlineContacts.includes(newOnlineContact)){
            onlineContacts.push(newOnlineContact)
            setNewOnlineContact("")
        }
    },[newOnlineContact])

    useEffect(()=>{
        if(newOfflineContact){
            setOnlineContacts(onlineContacts.filter(contact => contact !== newOfflineContact))
        }
    },[newOfflineContact])










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
            setCurrentConversation("")
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
        if(socket){
            if(isTyping){
                return socket.emit("typing",{conversationId:currentConversation})
            }
            socket.emit("finished typing",{conversationId:currentConversation})

        }
       
    }


  


    
    return(
        <SocketContext.Provider value={{joinConversation, makeCall, connect, messages, onlineGroupUsers, sendMessage, onlineContacts, leaveConversation,disconnect, sendTyping, typing, notifications, groupKey, stream, remoteStream,peersConnected}}>
            {children}
        </SocketContext.Provider>
    )

}

export default SocketContextProvider