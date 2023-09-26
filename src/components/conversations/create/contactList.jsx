import React, { useEffect, useState } from "react";
import Contact from "./contact";
import ContactWithoutSelect from "../../contacts/contacts";
const ContactList = ({ selected, select, contacts, shouldSelect = true }) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const list = [];
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabets) {
      const listOfContacts = [];
      contacts.forEach((contact) => {
        if (contact._id[0].toUpperCase() == letter)
          listOfContacts.push(contact);
      });
      if (listOfContacts.length) {
        list.push({ letter, listOfContacts });
      }
    }
    setContactList(list);
  }, [contacts]);

  return (
    <>
      {contactList.map((alphabet) => (
        <div key={alphabet.letter} className="flex flex-col my-4 items-start">
          <h1 className="text-white text-[21px]">{alphabet.letter}</h1>
          <div className="w-full lg:grid grid-cols-3 flex flex-col  mt-4 gap-4">
            {shouldSelect
              ? alphabet.listOfContacts.map((contact) => (
                  <Contact
                    key={contact._id}
                    image={
                      contact.profilePic
                        ? contact.profilePic.url
                        : "../userIcon.svg"
                    }
                    username={contact.username}
                    _id={contact._id}
                    selected={selected}
                    select={select}
                  />
                ))
              : alphabet.listOfContacts.map(
                  (contact) => (
                    <ContactWithoutSelect
                      key={contact._id}
                      username={contact.username}
                      image={
                        contact.profilePic
                          ? contact.profilePic.url
                          : "../userIcon.svg"
                      }
                      _id={contact._id}
                    />
                  )

                  // <Contact key={contact._id} image={contact.profilePic? contact.profilePic.url:"../userIcon.svg"} username={contact.username} _id = {contact._id} selected={selected} select={select}/>
                )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
