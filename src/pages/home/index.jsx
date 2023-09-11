import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ButtonMain from '../../components/buttonMain';
import { motion } from 'framer-motion';

const Home = () => {
 
    const navigate = useNavigate()
 

    return ( 
        <div className=' scroll-smooth'>
         <nav className={`border-b-2  w-screen  bg-black z-30 fixed  border-midGray h-[70px] flex flex-row items-center justify-between p-3`}>
            <img className='w-[40px] h-[40px]' src="../../logo.svg" alt="" />
            <div className='flex flex-row items-center gap-4'>
            <ButtonMain text={"Get Started"} onClick={()=>navigate("/signup")}/>
            <ButtonMain text={"Login"} onClick={()=>navigate("/login")}/>
            </div>
        </nav>
        <div className='w-screen overflow-hidden pt-[70px] flex flex-col items-center bg-black  min-h-screen'>
           
            
            <motion.div initial={{opacity:0, scale:0.8}} transition={{duration:0.8}} animate={{opacity:1, scale:1}} className='flex flex-col h-[100vh] justify-center items-center  gap-y-4 mt-[-50px]'>
            
             <h1 className='text-white text-center  text-[34px]'>
             The only messanger you will ever need
            </h1>
            <button onClick={()=>navigate("/signup")} className='w-[200px] bg-tekhelet rounded-[20px] h-[50px] text-white text-[18px] hover:scale-110 transition-[2000ms]'>
                Get Started
            </button>
            
            <motion.img   animate={{opacity:1,y:[0,15,0]}}  transition={{repeat:Infinity, duration:2}} src="../arrowDown.svg" className='w-[30px] h-[30px] mt-4' alt="" />
            </motion.div>


            <section data-aos="fade-up"  className='w-full mb-[200px] p-4 flex flex-col items-center gap-4'>
                <img  src="../lockIconPurple.svg" className='w-[100px] h-[100px]' alt="" />
                <h1 className='text-white text-center  text-[34px]'>Secure messaging through with End to End encryption</h1>
                <p className='text-white text-center'>Meetup uses advanced encryption techniques to ensure messages are secure from your from to the receiver </p>
            </section>

            <section data-aos="fade-up" className='w-full mb-[200px]  p-4 flex flex-col items-center gap-4'>
                <img  src="../syncIcon.svg" className='w-[100px] h-[100px]' alt="" />
                <h1 className='text-white text-center  text-[34px]'>Messages are synced accross all devices</h1>
                <p className='text-white text-center'>you can access all messages on your account from anywhere</p>
            </section>

            <section data-aos="fade-up "  className='w-full mb-[150px]  p-4 flex flex-col items-center gap-4'>
                <img  src="../fastIcon.svg" className='w-[100px] h-[100px]' alt="" />
                <h1 className='text-white text-center  text-[34px]'>Blazingly Fast</h1>
                <p className='text-white text-center'>get your messages quick!</p>
            </section>

           

            
        </div>
</div>

       
           
        
      
     );
}
 
export default Home;