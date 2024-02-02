import React, { useEffect, useState } from "react";
import ContactBoxWithSelect from "../../contacts/contact-box-with-select";
import ContactWithoutSelect from "../../contacts/contact-box-without-select";
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
        <div
          key={alphabet.letter}
          className="flex flex-col w-full my-4 items-start"
        >
          <h1 className="text-white text-[21px]">{alphabet.letter}</h1>
          <div className="w-full flex-wrap flex   mt-4 gap-4">
            {shouldSelect
              ? alphabet.listOfContacts.map((contact) => (
                  <ContactBoxWithSelect
                    key={contact._id}
                    image={contact.profilePic}
                    defaultColor={contact.defaultProfileColor}
                    username={contact.username}
                    _id={contact._id}
                    selected={selected}
                    select={select}
                  />
                ))
              : alphabet.listOfContacts.map((contact) => (
                  <ContactWithoutSelect
                    defaultColor={contact.defaultProfileColor}
                    key={contact._id}
                    username={contact.username}
                    image={contact.profilePic}
                    _id={contact._id}
                  />
                ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
