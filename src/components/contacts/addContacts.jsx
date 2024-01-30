import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ContactList from "../conversations/create/contactList";
import SearchBar from "../conversations/overview/searchBar";

const AddUsers = () => {
  const { searchUsers, searchedUsers, userSearchLoading } =
    useContext(UserContext);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 0) {
      searchUsers(value);
    }
  }, [value]);

  return (
    <div className="w-full h-full">
      <SearchBar
        value={value}
        setValue={setValue}
        placeholder={"search for a user by their email"}
        handleSearch={searchUsers}
      />

      <div
        className={`w-full h-full  flex flex-col  ${
          userSearchLoading && ` items-center justify-center`
        }`}
      >
        {userSearchLoading ? (
          <div className="loader"></div>
        ) : (
          <ContactList
            select={null}
            selected={null}
            contacts={searchedUsers}
            shouldSelect={false}
          />
        )}
      </div>
    </div>
  );
};

export default AddUsers;
