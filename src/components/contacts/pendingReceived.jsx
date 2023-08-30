import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Contact from './contacts';
import SearchBar from '../conversations/overview/searchBar';

const PendingContactsReceived = () => {
    const {pendingReceived} = useContext(UserContext)
    const [value,setValue] = useState("")
    const [searchResult,setSearchResults] = useState(pendingReceived)

    useEffect(()=>{
        setSearchResults(pendingReceived)
    },[pendingReceived])

    useEffect(()=>{
        if(value.length>0){
            const results = pendingReceived.filter(user=> user.username.toLowerCase().includes(value.toLocaleLowerCase() || user._id.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
            setSearchResults(results)
         }
         else{
             setSearchResults(pendingReceived)
         }
    },[value])
    return ( 
      
            <div>
            <SearchBar value={value} setValue={setValue} placeholder={"search for a contact"}/>
            <div className='w-full h-full lg:grid grid-cols-3 flex flex-col gap-4 items-center'>
            {
                searchResult.map(user => 
                    <Contact key={user._id} username={user.username} image={user.profilePic?user.profilePic.url:"userIcon.svg"} _id={user._id}/>
                )
            }
            </div>
            </div>
      
     );
}
 
export default PendingContactsReceived;