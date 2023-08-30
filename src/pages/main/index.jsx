import React, {useContext, useEffect, useState} from 'react';
import Overview from '../../components/conversations/overview';
import { UserContext } from '../../contexts/UserContext';
import {useQueries} from 'react-query';
import LoadingPage from '../../components/loadingPage';

const Main = () => {
    const {getSelf, getConversations, getContacts} = useContext(UserContext)
    const [q1,q2]  = useQueries([{queryKey:["user"], queryFn:getSelf},{queryKey:["conversations"], queryFn:getConversations},{queryKey:["contacts"], queryFn:getContacts}])
    return ( 
        <>
        {
            q1.isLoading||q2.isLoading?
            <LoadingPage/>
            :
            q1.isError || q2.isError?
            <div className='w-screen h-screen bg-black'></div>:
        
        <div className='flex w-screen h-screen justify-between'>
            <div className='lg:w-[40%] w-full border-r border-midGray '>
                <Overview/>
            </div>
            <div id="main-paper" className='lg:w-[60%] lg:flex hidden bg-repeat bg-black  '>
               
            </div>
        </div>
      
        }
        </>
     );
}
 
export default Main;