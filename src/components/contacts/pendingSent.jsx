import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Contact from './contacts';
import SearchBar from '../conversations/overview/searchBar';

const PendingContactsSent = () => {
    const {pendingSent} = useContext(UserContext)
    const [searchResult,setSearchResults] = useState(pendingSent)
    const [value,setValue] = useState("")

    useEffect(()=>{
        setSearchResults(pendingSent)
    },[pendingSent])

    useEffect(()=>{
        if(value.length>0){
            const results = pendingSent.filter(user=> user.username.toLowerCase().includes(value.toLocaleLowerCase() || user._id.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
            setSearchResults(results)
         }
         else{
             setSearchResults(pendingSent)
         }
    },[value])

    return ( 
      
            <div>
            <SearchBar value={value} setValue={setValue} placeholder={"search for a contact"}/>
            <div className='w-full h-full lg:grid grid-cols-3 flex gap-4 flex-col items-center'>
            {
                searchResult.map(user => 
                    <Contact key={user._id} image={user.profilePic?user.profilePic.url:"../userIcon.svg"} username={user.username} _id={user._id}/>
                )
            }
            </div>
            </div>
      
     );
}
 
export default PendingContactsSent;