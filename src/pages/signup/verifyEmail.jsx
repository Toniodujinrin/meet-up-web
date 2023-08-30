import React, { useState, useContext } from 'react';
import InputGroup from '../../components/inputGroup';
import { verifyEmailSchema } from '../../schemas';
import { SignUpContext } from '../../contexts/SignUpContext';
const VerifyEmail= () => {
    const {signUpProcessLoading,verifyEmail, resendCode, resendOtpLoading} = useContext(SignUpContext)
    const [otp, setOtp]= useState("")
    const [errors, setErrors]= useState({otp:""})

  const handleSubmit = (e)=>{
    e.preventDefault()
    const validatorObject = {otp:""}
    const {error} = verifyEmailSchema.validate({otp},{ abortEarly: false })
    if(error){
      for(let item of error.details){
        if(!validatorObject[item.path[0]])
        validatorObject[item.path[0]] = item.message 
      }
    }
    setErrors(validatorObject)
    if(!validatorObject.otp){
         verifyEmail({otp})
    }
  }


 
    return ( 
      <div  className={` mainGradient w-screen h-screen  flex flex-col p-4 items-center justify-center `}>
        <h1 className='text-[42px] text-white font-bold' >Verify Email</h1>
        <p className='text-mainGray text-center w-[80%] mb-[50px]'>A code has been sent to your email address. Type it in here</p>
        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col items-center gap-[50px] mb-[50px] lg:w-[25%] w-[80%] ' action="">
          <InputGroup icon={"../otpIcon.svg"} type={"string"} placeholder={"Code"} value={otp} setValue={setOtp} error={errors.otp}/>
         <button  className='bg-tekhelet text-white h-[50px] rounded-xl flex items-center justify-center w-full '>
          {
            signUpProcessLoading?
             <div className='dot-flashing'></div>:
             <p>Continue</p>
          }
         </button>
        </form>
        <div className='text-white'><span>Did'nt get the code ?</span> <span onClick={resendCode} className={`text-tekhelet ml-2 ${resendOtpLoading && `hidden`} cursor-pointer `}>Resend </span></div>

      </div>
     );
}
 
export default VerifyEmail;