import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import InputGroup from "../../inputGroup";
import { useNavigate } from "react-router-dom";
import { ConversationContext } from "../../../contexts/conversationContext";
import BackArrow from "../../backArrow";
import ButtonMain from "../../buttonMain";
import ContactList from "./contactList";

const Create = () => {
  const navigate = useNavigate();
  const { userContacts } = useContext(UserContext);
  const { createConversation } = useContext(ConversationContext);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");

  const handleCreate = () => {
    let payload = {
      users: selected,
    };
    if (selected.length == 1) {
      payload.type = "single";
    } else {
      payload.type = "group";
      payload.name = name;
    }
    createConversation(payload);
  };

  const select = (_id) => {
    if (selected.includes(_id)) {
      let _selected = [...selected];
      _selected = _selected.filter((item) => item !== _id);
      setSelected(_selected);
    } else setSelected([...selected, _id]);
  };

  return (
    <div className="w-full overflow-y-scroll h-screen   p-4">
      <div className="flex flex-row justify-between mb-4">
        <div className="flex gap-3 items-center">
          <BackArrow />
          <h1 className="text-white font-semibold text-[26px]">New</h1>
        </div>
        <div className="gap-3 flex flex-row items-center">
          <button
            className="w-[40px] aspect-square flex items-center justify-center bg-tekhelet rounded-full"
            onClick={() => {
              navigate("/contacts");
            }}
          >
            <img
              className="w-[25px] h-[25px]"
              src="../addUserIcon.svg"
              alt=""
            />
          </button>
          {selected.length !== 0 && (
            <ButtonMain
              onClick={handleCreate}
              disabled={
                selected.length == 0 ||
                (selected.length > 1 && name.length === 0)
              }
              text={"Create"}
            />
          )}
        </div>
      </div>
      {selected.length > 1 && (
        <InputGroup
          placeholder={"Conversation Name"}
          icon={"../groupIcon.svg"}
          value={name}
          setValue={setName}
        />
      )}

      <ContactList
        select={select}
        contacts={userContacts}
        selected={selected}
      />
    </div>
  );
};

export default Create;
