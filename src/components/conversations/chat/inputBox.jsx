import React from "react";
const InputBox = ({
  value,
  setValue,
  handleSendMessage,
  handleTypingStart,
  handleTypingStop,
}) => {
  return (
    <div className="w-full  border-mediumGray flex gap-3 justify-center items-center h-[100px]">
      <textarea
        value={value}
        onKeyUp={handleTypingStop}
        onKeyDown={handleTypingStart}
        onChange={(e) => setValue(e.currentTarget.value)}
        type="text"
        placeholder="New message..."
        className=" placeholder:text-white resize-none text-white focus:outline-none rounded-[25px] p-3 pl-4 w-[70%] h-[50px] bg-mediumGray"
      />
      <button
        className="h-[45px] bg-tekhelet rounded-full aspect-square flex items-center justify-center"
        disabled={value.length == 0}
        onClick={() => handleSendMessage()}
      >
        <img
          src="../../sendIcon.svg"
          className="w-[35px] aspect-square"
          alt=""
        />
      </button>
    </div>
  );
};

export default InputBox;
