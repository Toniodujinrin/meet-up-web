import React from 'react';
const InputBox = ({value, setValue, handleSendMessage, handleTypingStart, handleTypingStop}) => {
    return ( 
        <div className='w-full bg-darkGray border-t border-midGray flex gap-3 justify-center items-center h-[100px]'>
            <textarea value={value} onKeyUp={handleTypingStop} onKeyDown={handleTypingStart} onChange={(e)=>setValue(e.currentTarget.value)} type="text" placeholder='New message...' className=' placeholder:text-mainGray resize-none text-white focus:outline-none rounded-xl p-3 w-[70%] h-[50px] bg-midGray' />
            <button disabled={value.length==0} onClick={()=>handleSendMessage()}><img src="../sendIcon.svg" className='w-[30px] h-[30px]' alt="" /></button>
        </div>
     );
}
 
export default InputBox;