import React, { useState, useContext } from 'react';
import InputGroup from '../../components/inputGroup';
import { signUpSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import { SignUpContext } from '../../contexts/SignUpContext';
const Signup = () => {
  const navigate = useNavigate()
  const {signUpProcessLoading, signUp}= useContext(SignUpContext) 
    const [loading,setLoading] = useState(false)
    const [email, setEmail]= useState("")
    const [password, setPassoword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors]= useState({password:"",email:"", confirmPassword:""})

  const handleSubmit = (e)=>{
    e.preventDefault()
    const noErrors = {password:"",email:"", confirmPassword:""}
    const validatorObject = {password:"",email:"", confirmPassword:""}
    const {error} = signUpSchema.validate({email,password},{ abortEarly: false })
    if(confirmPassword !== password) validatorObject.confirmPassword = "Confirm Password must match password"
    if(error){
      for(let item of error.details){
        if(!validatorObject[item.path[0]])
        validatorObject[item.path[0]] = item.message 
      }
    }
    setErrors(validatorObject)
    if(JSON.stringify(noErrors)== JSON.stringify(validatorObject)){
      signUp({password,email})
    }
  }
  
  return ( 
    <main className='mainGradient w-screen h-screen flex flex-row items-center'>
      <div  className={` lg:w-[50%] w-full h-full flex flex-col p-4 items-center justify-center`}>
        <h1 className='text-[42px] text-white font-bold' >Create account</h1>
        <p className='text-mainGray mb-[50px]'>Create an account and meet up with friends</p>
        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex lg:w-[50%] w-[80%] flex-col items-center gap-[50px] mb-[50px]' action="">
         <div className='flex flex-col gap-4 w-full '>
         <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"Email"} value={email} setValue={setEmail} error={errors.email}/>
         <InputGroup icon={"../lockIcon.svg"} type={"password"} placeholder={"Password"} value={password} setValue={setPassoword} error={errors.password}/>
         <InputGroup icon={"../confirmPasswordIcon.svg"} type={"password"} placeholder={"Confirm Password"} value={confirmPassword} setValue={setConfirmPassword} error={errors.confirmPassword}/>
         </div>
         <button  className='bg-tekhelet text-white h-[50px] rounded-xl flex items-center justify-center w-full '>
          {
            signUpProcessLoading?
             <div className='dot-flashing'></div>:
             <p>Continue</p>
          }
         </button>
         </form>
        <div className='text-white'><span>Have an account ?</span> <span onClick={()=> navigate("/login")} className='text-tekhelet ml-2 cursor-pointer'> Log in </span></div>

      </div>
      <div className='w-[50%] hidden h-full lg:flex justify-center items-center '>
        <img className='lg:w-[50%] ' src="../undraw.svg"  alt="" />
        </div>
      </main>
     );
}
 
export default Signup;