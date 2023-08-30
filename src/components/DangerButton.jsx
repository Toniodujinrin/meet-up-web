import React from 'react';

const DangerButton = ({text, onClick, loading}) => {
    return ( 
        <button onClick={onClick} className='w-[200px] py-2 text-red-600 border-2 border-red-600 rounded-[5px]'>
          {
            loading?
            <div className='loader-red'></div>
            :
            <p>{text}</p>
    }
         
            
        </button>
     );
}
 
export default DangerButton;