import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Contact from './contacts';
import SearchBar from '../conversations/overview/searchBar';

const CurrentContacts = () => {
    const {userContacts} = useContext(UserContext)
    const [value,setValue] = useState("")
    return ( 
      
            <div>
            <SearchBar value={value} setValue={setValue} placeholder={"search for a contact"}/>
            <div className='w-full h-full lg:grid grid-cols-3 flex flex-col gap-4 items-center'>
            {
                userContacts.map(user => 
                    <Contact key={user._id} username={user.username} image={user.profilePic?user.profilePic.url:"../userIcon.svg"} _id={user._id}/>
                )
            }
            </div>
            </div>
      
     );
}
 
export default CurrentContacts;