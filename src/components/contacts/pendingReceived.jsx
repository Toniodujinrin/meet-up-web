import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import ContactList from "../conversations/create/contactList";
import SearchBar from "../conversations/overview/searchBar";

const PendingContactsReceived = () => {
  const { pendingReceived } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [searchResult, setSearchResults] = useState(pendingReceived);

  useEffect(() => {
    setSearchResults(pendingReceived);
  }, [pendingReceived]);

  useEffect(() => {
    if (value.length > 0) {
      const results = pendingReceived.filter((user) =>
        user.username
          .toLowerCase()
          .includes(
            value.toLocaleLowerCase() ||
              user._id.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults(pendingReceived);
    }
  }, [value]);
  return (
    <div>
      <SearchBar
        value={value}
        setValue={setValue}
        placeholder={"search for a contact"}
      />
      <div>
        <ContactList
          select={null}
          selected={null}
          contacts={searchResult}
          shouldSelect={false}
        />
      </div>
    </div>
  );
};

export default PendingContactsReceived;
