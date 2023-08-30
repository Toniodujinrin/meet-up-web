import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Contact from './contacts';
import SearchBar from '../conversations/overview/searchBar';

const AddUsers = () => {
    const { searchUsers, searchedUsers, userSearchLoading} = useContext(UserContext)
    const [value,setValue] = useState("")

    useEffect(()=>{
       if(value.length >0){
        searchUsers(value)
       }
    },[value])


    return ( 
        
      
            <div>
            <SearchBar 
            value={value} 
            setValue={setValue} 
            placeholder={"search for a contact"}
            />

            <div className='w-full h-full  flex  items-center justify-center'>
            {
                userSearchLoading?

                <div className='loader'></div>
                :
                <div className='flex flex-col gap-4 lg:grid grid-cols-3 w-full h-full '>
                    {
                    searchedUsers.map(user => 
                        <Contact 
                        key={user._id} 
                        username={user.username}  
                        image={user.profilePic?user.profilePic.url:"../userIcon.svg"}
                         _id={user._id}
                         />
                    )
                }
                </div>
            }
            </div>
            </div>
      
     );
}
 
export default AddUsers;