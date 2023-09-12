import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ButtonMain from '../../components/buttonMain';
import { motion } from 'framer-motion';



const info = [
    {
        firstHeader:"Enjoy your privacy",
        secondHeader:"End to End encryption",
        image:"../secureImage.svg",
        icon:"../lockIconPurple.svg",
        description:"Meetup uses advanced encryption techniques to ensure messages are secure from your from to the receiver."
    },
    {
        firstHeader:"Anywhere, on any device",
        secondHeader:"Synced",
        image:"../syncImage.svg",
        icon:"./syncIcon.svg",
        description:"you can access all messages on your account from anywhere on the interent, just log in and read your messages"
    },
    {
        firstHeader:"lighning quick",
        secondHeader:"Blazingly Fast",
        image:"../fastImage.svg",
        icon:"./fastIcon.svg",
        description:"Meet-up lets you have conversations in real time with other users!"
    },
]

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
           
            
        <motion.div initial={{opacity:0, scale:0.8}} transition={{duration:0.8}} animate={{opacity:1, scale:1}} className='flex flex-col p-4 my-[100px]   justify-center items-start   gap-y-4 '>
            
             <h1 className='text-white   text-[34px]'>
             The only messanger you will ever need
            </h1>
            <p className='text-mainGray'> Send messages to anyone around the world securely and fast </p>
            <button onClick={()=>navigate("/signup")} className='w-[200px] bg-tekhelet rounded-[20px] h-[50px] text-white text-[18px] hover:scale-110 transition-[2000ms]'>
                Get Started
            </button>
            
           
            </motion.div>


            <h1 className='text-tekhelet text-[16px]'>FEATURES</h1>
            <h1 className='text-white text-[32px] mb-[50px]'>Why use Meetup?</h1>

            <div className='lg:w-[50%] w-full'>
            {
                info.map( (inf, index) => 
                    <section data-aos="fade-up"  className={`w-full mb-[70px] p-4 l flex  ${index%2? "flex-row":"flex-row-reverse"}  items-center gap-[30px]`}>
                    <div className='lg:w-[50%] flex flex-col gap-2 w-full'>
                    <div className=' bg-midGray rounded-full w-[50px] aspect-square flex items-center justify-center'>
                    <img  src={inf.icon} className='w-[30px] aspect-square' alt="" />
                    </div>
                    <h1 className='text-tekhelet font-semibold '>{inf.firstHeader}</h1>
                    <h1 className='text-white   text-[30px]'>{inf.secondHeader}</h1>
                    <p className='text-mainGray'>{inf.description}</p>
                    </div>
                    <img src={inf.image} className='w-[300px] hidden lg:flex ' alt="" />
                </section>
                    
                    )
      
            }

    
            </div>

           

            
        </div>
</div>

       
           
        
      
     );
}
 
export default Home;