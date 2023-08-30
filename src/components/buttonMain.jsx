import React from 'react';

const ButtonMain = ({text, disabled, onClick, loading}) => {

    return ( 
        <button onClick={onClick} disabled={disabled} className='py-2 w-fit px-4 border-2 border-tekhelet rounded-[5px]  font-semibold text-tekhelet'>{text}</button>
     );
}
 
export default ButtonMain;