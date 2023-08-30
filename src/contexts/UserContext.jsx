import { createContext, useContext, useState } from "react";
import { post, get, put } from "../api/config";
import jwtDecode from "jwt-decode";
import { TokenContext } from "./TokenContext";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./socketContext";
import { useQueryClient } from "react-query";
export const UserContext = createContext()


const UserContextProvider = ({children})=>{
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {checkForToken} = useContext(TokenContext)
    const {connect, disconnect} = useContext(SocketContext)
    const [user,setUser] = useState({})
    const [authenticationProcessLoading, setAuthenticationProcessLoading]= useState(false)
    const [userConversations, setUserConversations] = useState([])
    const [userContacts, setUserContacts] = useState([])
    const [pendingSent, setPendingSent] = useState([])
    const [searchedUsers, setSearchedUsers] = useState([])
    const [pendingReceived, setPendingReceived] = useState([])
    const [userSearchLoading, setUserSearchLoading] = useState(false)
    const [updateProcessLoading, setUpdateProcessLoading] = useState(false)
    const [profilePicLoading,setProfilePicLoading] = useState(false)

    const authenticate = async (payload)=>{
        try {
            setAuthenticationProcessLoading(true)
            const res = await post ("auth",payload)
            const token = res.headers.authorization
            if(!token) return toast.error("could not log in, try again later")
            window.localStorage.setItem("token",token)
            const decodedToken = jwtDecode(token) 
            window.localStorage.setItem("user",JSON.stringify(decodedToken))
            if(!decodedToken.emailVerified) return navigate("/verifyEmail",{replace:true})
            if(!decodedToken.accountVerified) return navigate("/verifyAccount",{replace:true})
            else{
                connect()
                navigate("/main",{replace:true})
            }
        } catch (error) {
            if(error.response && error.response.data) return toast.error(error.response.data)
            toast.error("could not log in, please try later")
        }
        finally{
            setAuthenticationProcessLoading(false)
        }
    }

    const logout = async ()=>{
        disconnect()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        navigate("/login",{replace:true})
    }

    const getSelf = async ()=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        const {data} = await get("users/self")
        if(data) return setUser(data)
    }

    const getConversations = async ()=>{
        if(!checkForToken()) return navigate("/login", {replace:true})
        const {data} = await get("users/conversations")
        if(data)return setUserConversations(data)
    }

    const getContacts = async()=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        const {data} = await get("users/contacts")
        if(data)return setUserContacts(data)
    }

    const getPendingSent = async()=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        const {data} = await get("users/pending/sent")
        if(data) return setPendingSent(data)
    }

    const getPendingReceived = async()=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        const {data} = await get("users/pending/received")
        if(data) return setPendingReceived(data)
    }

    const searchUsers = async(searchString)=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        try {
            setUserSearchLoading(true)
            const {data} = await get(`users/searchUser/${searchString}`)
            setSearchedUsers(data)
        } catch (error) {
            toast.error("could not perform search")
        }
        finally{
            setUserSearchLoading(false)
        }
    }

    const sendRequest = async(id)=>{
        if(!checkForToken()) return navigate("/login", {replace:true})
        try {
            await post(`users/add/${id}`)
            queryClient.invalidateQueries(["contacts","pendingSent","pendingReceived"])
            toast.success("contact request sent")
        } catch (error) {
            toast.error("could not send contact request")
        }
    }

    const acceptRequest = async(id)=>{
        if(!checkForToken()) return navigate("/login", {replace:true})
        try {
            await post(`users/accept/${id}`)
            queryClient.invalidateQueries(["contacts","pendingSent","pendingReceived"])
            toast.success("contact request accepted")
        } catch (error) {
            toast.error("could not accept contact request")
        }
    }

    const updateUser = async (payload)=>{

        if(!checkForToken()) return navigate("/login", {replace:true})
        try {
            setUpdateProcessLoading(true)
            await put("users",payload)
            queryClient.invalidateQueries(["user"])
            toast.success("profile updated")
        } catch (error) {
            toast.error("could not update profile")
        }
        finally{
            setUpdateProcessLoading(false)
        }
    }

    const uploadProfilePic = async (payload)=>{
        if(!checkForToken()) return navigate("/login", {replace:true})
        try {
            setProfilePicLoading(true)
            await post("users/uploadImage",payload)
            queryClient.invalidateQueries(["user"])
            toast.success("profile updated")
        } catch (error) {
            toast.error("could not upload profile picture")
        }
        finally{
            setProfilePicLoading(false)
        }
        
    }

    

    
    

    return(
        <UserContext.Provider value={{uploadProfilePic,profilePicLoading, updateProcessLoading,updateUser,acceptRequest, sendRequest, searchUsers, searchedUsers, userSearchLoading, authenticate, getPendingReceived, getPendingSent, pendingReceived, pendingSent, authenticationProcessLoading, getSelf,user, getConversations, userConversations, userContacts, getContacts,logout, setUserConversations }}>
            {children}
        </UserContext.Provider>
    )

 
}


export default UserContextProvider
