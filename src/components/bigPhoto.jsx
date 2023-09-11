import React from 'react';
const BigPhoto = ({profilePic, setWebcamShowing, changeImage = true}) => {
    return (
        <>
             <div className={`lg:w-[300px] w-[200px] ${profilePic.includes("svg") && `p-2`} bg-black border-4 border-midGray aspect-square rounded-full`}>
            
            <img className={`w-full h-full rounded-full`} src={profilePic} alt="" />
            </div>
            {
                changeImage &&
<div onClick={()=>setWebcamShowing(true)} className='relative w-[50px] cursor-pointer flex items-center justify-center top-[-50px] lg:top-[-60px] rounded-full z-30 left-[-20px] h-[50px] bg-tekhelet'>
<img src="../camera.svg" className='w-[30px] h-[30px]' alt="" />
</div>
            }
           
        </>
      );
}
 
export default BigPhoto;