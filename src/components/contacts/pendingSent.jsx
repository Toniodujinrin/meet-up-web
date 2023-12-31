import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ContactList from "../conversations/create/contactList";
import SearchBar from "../conversations/overview/searchBar";

const PendingContactsSent = () => {
  const { pendingSent } = useContext(UserContext);
  const [searchResult, setSearchResults] = useState(pendingSent);
  const [value, setValue] = useState("");

  useEffect(() => {
    setSearchResults(pendingSent);
  }, [pendingSent]);

  useEffect(() => {
    if (value.length > 0) {
      const results = pendingSent.filter((user) =>
        user.username
          .toLowerCase()
          .includes(
            value.toLocaleLowerCase() ||
              user._id.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults(pendingSent);
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

export default PendingContactsSent;
