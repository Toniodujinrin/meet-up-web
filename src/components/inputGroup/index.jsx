import React from 'react';

const InputGroup = ({icon,placeholder,value, setValue, type,error}) => {
    return ( 
        <div className='w-full'>
        <div className={`border-[0.1px] ${error?`border-red-600`:`border-mainGray`} w-full p-3 gap-3 rounded-xl flex flex-row items-center`}>
        <img className='w-[20px] h-[20px]' src={icon} alt="" />
         <input type={type} placeholder={placeholder} className=' placeholder-white w-full bg-transparent border-none text-white focus:outline-none' value={value} onChange={(e)=>{setValue(e.currentTarget.value)}} />
        </div>
        <small className=' text-red-600'>{error}</small>
        </div>

     );
}
 
export default InputGroup;