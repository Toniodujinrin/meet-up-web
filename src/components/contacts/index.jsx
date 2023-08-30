import React, { useState } from 'react';
import CurrentContacts from './currentContacts';
import PendingContactsSent from './pendingSent';
import PendingContactsReceived from './pendingReceived';
import AddUsers from './addContacts';
import BackArrow from '../backArrow';
import ButtonMain from '../buttonMain';

const ContactsComp = () => {
    const [currentPage,setCurrentPage] = useState("current")
    const [dropDownShowing,setDropDownShowing] = useState(false)
    
    return ( 
        <div className='w-full h-full p-4'>
            <div className='w-full flex flex-row items-center justify-between' >
            {
                    currentPage === "add"?
                    <div className=' flex flex-row gap-2 items-center'>
                    <img onClick={()=>{setCurrentPage("current"); setDropDownShowing(false)}} src="../chevron.svg" className='w-[25px] h-[25px] rotate-180' alt="" />
                    <div className='text-white text-[36px]'>Add Users</div>
                    </div>
                    :
                    <>
                    <div className='text-white text-[36px] mb-4 flex flex-row items-center gap-4'> 
                    <BackArrow/>
                     <div>Contacts</div>
                    <img onClick={()=>setDropDownShowing(!dropDownShowing)} className={`w-[30px] h-[30px]  transition-[5000] ${dropDownShowing?"":`rotate-90`} `} src="../chevron.svg" alt="" />
                    </div>
                    <ButtonMain onClick={()=>{setCurrentPage("add"); setDropDownShowing(false)}} text={"Add"}/>
                    
                    </>
            }
            </div>
            <ul className={` ${!dropDownShowing && `hidden` } bg-midGray w-[200px] rounded-lg border-mainGray  border z-30 absolute  text-white `}>
                <li onClick={()=>{setCurrentPage("current"); setDropDownShowing(false)}} className=' border-b cursor-pointer flex flex-row items-center justify-between border-mainGray p-2'><p>Current</p><img className='w-[20px] h-[20px]' src="../groupIconWhite.svg" alt="" /></li>
                <li onClick={()=>{setCurrentPage("pending"); setDropDownShowing(false)}} className='border-b border-mainGray flex flex-row items-center justify-between cursor-pointer p-2' ><p>Pending</p><img className='w-[20px] h-[20px]' src="../pendingIcon.svg" alt="" /></li>
                <li onClick={()=>{setCurrentPage("requests"); setDropDownShowing(false)}} className='flex flex-row items-center justify-between cursor-pointer p-2'><p>Requests</p><img className='w-[20px] h-[20px]' src="../requestIcon.svg" alt="" /></li>
            </ul>

            {
                currentPage === "current" &&
                <CurrentContacts/>
            }

            {
                currentPage === "pending"&&
                <PendingContactsSent/>
            }

            {
                currentPage === "requests"&&
                <PendingContactsReceived/>
            }
            {
                currentPage === "add"&&
                <AddUsers/>
            }
        </div>
     );
}
 
export default ContactsComp;