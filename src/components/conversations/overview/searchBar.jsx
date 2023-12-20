import React from "react";

const SearchBar = ({ value, setValue, placeholder, handleSearch }) => {
  return (
    <div className="bg-midGray border-mediumGray border h-[50px] gap-3 my-5 flex p-3 items-center rounded-xl w-full">
      <img className="w-[20px] h-[20px]" src="../../searchIcon.svg" alt="" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent focus:outline-none text-white placeholder:text-white"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (handleSearch) {
            if (e.key == "Enter") {
              handleSearch(value);
            }
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
