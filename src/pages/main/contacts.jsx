import React, {useContext, useEffect, useState} from 'react';
import Overview from '../../components/conversations/overview';
import { UserContext } from '../../contexts/UserContext';
import ContactsComp from '../../components/contacts';
import {useQueries} from 'react-query';
import LoadingPage from '../../components/loadingPage';

const Contacts = () => {
    const {getSelf, getConversations, getContacts, getPendingSent, getPendingReceived} = useContext(UserContext)
    const [q1,q2,q3, q4,q5]  = useQueries([{queryKey:["user"], queryFn:getSelf},{queryKey:["conversations"], queryFn:getConversations},{queryKey:["contacts"], queryFn:getContacts},{queryKey:["pendingSent"], queryFn:getPendingSent},{queryKey:["pendingReceived"], queryFn:getPendingReceived}])
    return ( 
        <>
        {
            q1.isLoading||q2.isLoading||q3.isLoading || q4.isLoading ||q5.isLoading?
            <LoadingPage/>
            :
            q1.isError || q2.isError ||q3.isError ||q4.isError ||q5.isError?
            <div className='w-screen h-screen bg-black'></div>:
        
        <div className='flex w-screen h-screen justify-between'>
            <div className='lg:w-[40%] lg:flex hidden  w-full border-r border-midGray '>
                <Overview/>
            </div>
            <div className='lg:w-[60%] w-full h-full bg-black'>
                <ContactsComp/>
            </div>
        </div>
      
        }
        </>
     );
}
 
export default Contacts;