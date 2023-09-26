import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import SearchBar from "../conversations/overview/searchBar";
import ContactList from "../conversations/create/contactList";

const CurrentContacts = () => {
  const { userContacts } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [searchResult, setSearchResults] = useState(userContacts);
  useEffect(() => {
    setSearchResults(userContacts);
  }, [userContacts]);

  useEffect(() => {
    if (value.length > 0) {
      const results = userContacts.filter((user) =>
        user.username
          .toLowerCase()
          .includes(
            value.toLocaleLowerCase() ||
              user._id.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults(userContacts);
    }
  }, [value]);

  return (
    <div>
      <SearchBar
        value={value}
        setValue={setValue}
        placeholder={"search for a contact"}
      />
      <ContactList
        select={null}
        selected={null}
        contacts={searchResult}
        shouldSelect={false}
      />
    </div>
  );
};

export default CurrentContacts;
