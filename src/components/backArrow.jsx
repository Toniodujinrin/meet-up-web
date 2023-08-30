import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackArrow  = () => {
    const navigate = useNavigate()
    return ( 
    
        <img onClick={()=>navigate("/main")} src="../chevron.svg" className='w-[30px] h-[30px] cursor-pointer rotate-180 lg:hidden' alt="" />

    );
}
 
export default BackArrow ;