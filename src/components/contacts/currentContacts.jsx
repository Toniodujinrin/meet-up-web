import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SearchBar from '../conversations/overview/searchBar';
import ContactList from '../conversations/create/contactList';

const CurrentContacts = () => {
    const {userContacts} = useContext(UserContext)
    const [value,setValue] = useState("")
    return ( 
      
            <div>
            <SearchBar value={value} setValue={setValue} placeholder={"search for a contact"}/>
            <ContactList select={null} selected={null} contacts={userContacts} shouldSelect={false}/>
            </div>
      
     );
}
 
export default CurrentContacts;