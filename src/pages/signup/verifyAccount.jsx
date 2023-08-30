import React, { useState, useContext } from 'react';
import InputGroup from '../../components/inputGroup';
import { verifyAccountSchema } from '../../schemas';
import { SignUpContext } from '../../contexts/SignUpContext';
import { useNavigate } from 'react-router-dom';
const VerifyAccount = () => {
    const {signUpProcessLoading, verifyAccount} = useContext(SignUpContext)
    const navigate = useNavigate()
    const [username, setusername]= useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio]= useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors]= useState({username:"",firstName:"",lastName:"", bio:"",phone:""})
    
  const handleSubmit = (e)=>{
    e.preventDefault()
    const noErrors = {username:"",firstName:"",lastName:"", bio:"",phone:""}
    const validatorObject = {username:"",firstName:"",lastName:"", bio:"",phone:""}
    const {error} = verifyAccountSchema.validate({username,firstName,lastName,bio,phone},{ abortEarly: false })
    if(error){
      for(let item of error.details){
        if(!validatorObject[item.path[0]])
        validatorObject[item.path[0]] = item.message 
      }
    }
    setErrors(validatorObject)
    if(JSON.stringify(noErrors)== JSON.stringify(validatorObject)){
       verifyAccount({username, firstName, lastName, bio, phone})
    }
    }


 
    return ( 
      <div  className={` mainGradient w-screen h-screen  flex flex-col p-4 items-center justify-center `}>
        <h1 className='text-[42px] text-white font-bold' >Verify Account</h1>
        <p className='text-mainGray mb-[50px]'>Verify your account by filling in your details</p>
        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col items-center gap-[50px] mb-[50px]' action="">
         <div className='lg:grid flex flex-col grid-cols-2 gap-6 '>
         <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"First Name"} value={firstName} setValue={setFirstName} error={errors.firstName}/>
         <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"Last Name"} value={lastName} setValue={setLastName} error={errors.lastName}/>
         <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"Username"} value={username} setValue={setusername} error={errors.username}/>
         <InputGroup icon={"../phoneIcon.svg"} type={"string"} placeholder={"Phone Number"} value={phone} setValue={setPhone} error={errors.phone}/>
         <InputGroup icon={"../bioIcon.svg"} type={"string"} placeholder={"Bio"} value={bio} setValue={setBio} error={errors.bio}/>
         </div>
         
         <button  className='bg-tekhelet text-white h-[50px] rounded-xl flex items-center justify-center w-[300px] '>
          {
            signUpProcessLoading?
             <div className='dot-flashing'></div>:
             <p>Continue</p>
          }
         </button>
         </form>
        <div className='text-white'><span>Have an account ?</span> <span onClick={()=>navigate("/login",{replace:true})} className='text-tekhelet ml-2'>Sign in</span></div>

      </div>
     );
}
 
export default VerifyAccount;