import { createContext, useContext,  useState} from "react";
import { post } from "../api/config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "./TokenContext";

export const SignUpContext = createContext()


const SignUpContextProvider = ({children})=>{
    const navigator = useNavigate()
    const [signUpProcessLoading, setSignUpProcessLoaading] = useState(false)
    const [resendOtpLoading,setResendOtpLoading] = useState(false)
    const {checkForToken} = useContext(TokenContext)

    const signUp = async (payload)=>{
        try {
            setSignUpProcessLoaading(true)
            const res = await post("users",payload)
            const token = res.headers.authorization
            window.localStorage.setItem("token", token)
            toast.success("success")
            navigator("/verifyEmail",{replace:true})
        } catch (error) {
            if(error.response && error.response.data) return toast.error(error.response.data)
            toast.error("could not sign up")
        }
        finally{setSignUpProcessLoaading(false)}
    }

    const verifyEmail = async (payload)=>{
        if(!checkForToken()){
            toast.error("could not verify email")
            return navigator("/login",{replace:true})
        } 
        try{
            setSignUpProcessLoaading(true)
            const res = await post("users/verifyEmail",payload)
            const token = res.headers.authorization
            window.localStorage.setItem("token", token)
            toast.success("email verified")
            navigator("/verifyAccount",{replace:true})
        }
        catch(error){
            if(error.response && error.response.data){
             toast.error(error.response.data)
            }
            else toast.error("could not verify email")
        }
        finally{setSignUpProcessLoaading(false)}
    }

    const verifyAccount = async (payload)=>{
        if(!checkForToken()){
            toast.error("could not verify account")
            return navigator("/login",{replace:true})
        } 
        try{
        setSignUpProcessLoaading(true)
        const res = await post("users/verifyAccount",payload)
        const token = res.headers.authorization
        window.localStorage.setItem("token", token)
        toast.success("account verified")
        navigator('/login',{replace:true})
        }
        catch(error){
            if(error.response && error.response.data) toast.error(error.response.data)
            else toast.error("could not verify account")
        }
        finally{
            setSignUpProcessLoaading(false)
        }
    }

    const resendCode = async()=>{
        if(!checkForToken()){
            toast.error("could not verify account")
            return navigator("/login",{replace:true})
        }
        const toastId = toast.loading('Sending new OTP');
        try{
            setResendOtpLoading(true)
            await post("users/resendOtp")
            toast.success("new code sent")
        }
        catch(error){
            if(error.response && error.response.data) toast.error(error.response.data)
            else toast.error("could not send new code")
        }
        finally{
            setResendOtpLoading(false)
            toast.dismiss(toastId)
        }
    }
  
    return(
        <SignUpContext.Provider value={{verifyAccount,verifyEmail,signUp,resendCode, signUpProcessLoading, resendOtpLoading}}>
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContextProvider