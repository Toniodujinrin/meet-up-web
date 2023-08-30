import React, { useEffect } from 'react';
import { useState , useContext} from 'react';
import InputGroup from '../inputGroup';
import { UserContext } from '../../contexts/UserContext';
import { verifyAccountSchema } from '../../schemas';

const Details = ({setWebcamShowing}) => {
    const {user, updateUser, updateProcessLoading} = useContext(UserContext)
    const [username, setusername]= useState(user.username)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [bio, setBio]= useState(user.bio)
    const [phone, setPhone] = useState(user.phone)
   
    const [errors, setErrors]= useState({username:"",firstName:"",lastName:"", bio:"",phone:""})
    const [disabled, setDisabled] = useState(true)
 
    useEffect(()=>{
        const _user = {...user}
        delete _user.lastSeen
        delete _user.registration
        delete _user._id
        delete _user.profilePic
        const payload = {bio,firstName,lastName,phone, username}
        if(JSON.stringify(_user) == JSON.stringify(payload)){
            setDisabled(true)
        }
        else setDisabled(false)
    }
   ,[username,firstName,lastName,bio,phone])

    const handleUpdate = (e)=>{
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
           updateUser({bio,firstName,lastName,phone,username})
        }
    }


    return ( 
        <div className='w-full h-full flex flex-col lg:gap-8 gap-6 mt-4 items-center'>
        <div className=' lg:self-start flex flex-col items-end'>
        <div className={`lg:w-[300px] w-[200px] ${!user.profilePic && `p-2`} bg-black border-4 border-midGray aspect-square rounded-full`}>
            
        <img className={`w-full h-full ${user.profilePic  && `rounded-full`}`} src={user.profilePic?user.profilePic.url:"../userIcon.svg"} alt="" />
        </div>
        <div onClick={()=>setWebcamShowing(true)} className='relative w-[50px] cursor-pointer flex items-center justify-center top-[-50px] lg:top-[-60px] rounded-full z-30 left-[-20px] h-[50px] bg-tekhelet'>
            <img src="../camera.svg" className='w-[30px] h-[30px]' alt="" />
        </div>
        </div>

        <form onSubmit={(e)=>handleUpdate(e)}  className='flex flex-col w-full items-center gap-[50px] mb-[50px]' action="">
        <div className='lg:grid flex flex-col grid-cols-2 w-full gap-6 '>
        <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"First Name"} value={firstName} setValue={setFirstName} error={errors.firstName}/>
        <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"Last Name"} value={lastName} setValue={setLastName} error={errors.lastName}/>
        <InputGroup icon={"../userIcon.svg"} type={"string"} placeholder={"Username"} value={username} setValue={setusername} error={errors.username}/>
        <InputGroup icon={"../phoneIcon.svg"} type={"string"} placeholder={"Phone Number"} value={phone} setValue={setPhone} error={errors.phone}/>
        <InputGroup icon={"../bioIcon.svg"} type={"string"} placeholder={"Bio"} value={bio} setValue={setBio} error={errors.bio}/>
        </div>
        
        <button disabled={disabled}  className={`${disabled? `bg-midGray`:`bg-tekhelet`} text-white h-[50px] lg:self-start rounded-xl flex items-center justify-center w-[300px] mb-4 `}>
         {
           updateProcessLoading?
            <div className='dot-flashing'></div>:
            <p>Update</p>
         }
        </button>
        </form>
        </div>
     );
}
 
export default Details;