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
    <div>
      <SearchBar
        value={value}
        setValue={setValue}
        placeholder={"search for a user by their email"}
        handleSearch={searchUsers}
      />

      <div className="w-full h-full  flex  items-center justify-center">
        {userSearchLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="flex flex-col w-full h-full ">
            <ContactList
              select={null}
              selected={null}
              contacts={searchedUsers}
              shouldSelect={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUsers;
